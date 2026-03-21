import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import { User } from './models/User.js';
import { Program } from './models/Program.js';
import { Question } from './models/Question.js';
import { Company } from './models/Company.js';
import { Hashtag } from './models/Hashtag.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

function generateCode(len = 6) {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

// Connect to Database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected via Sequelize');
    
    // Define Relationships
    Company.hasMany(User, { foreignKey: 'companyId' });
    User.belongsTo(Company, { foreignKey: 'companyId' });

    Company.hasMany(Program, { foreignKey: 'companyId' });
    Program.belongsTo(Company, { foreignKey: 'companyId' });

    Company.hasMany(Question, { foreignKey: 'companyId' });
    Question.belongsTo(Company, { foreignKey: 'companyId' });
    
    Company.hasMany(Hashtag, { foreignKey: 'companyId' });
    Hashtag.belongsTo(Company, { foreignKey: 'companyId' });

    // Sync models (create tables if they don't exist)
    // In production, use migrations instead of sync({ alter: true })
    await sequelize.sync();
    console.log('Models synced');

    // Seed initial data if empty
    const companyCount = await Company.count();
    if (companyCount === 0) {
      const demo = await Company.create({
        name: 'TechCorp',
        email: 'contact@techcorp.com',
        contact: '+1-555-0100',
        slug: 'techcorp',
        primaryColor: '#ea580c',
        secondaryColor: '#9a3412',
        isPro: true,
        subscriptionStatus: 'active'
      });
      const code = generateCode();
      await Hashtag.create({ code, companyId: demo.id, isActive: true });
      await Program.bulkCreate([
        { name: 'Health & Wellness', isOpen: true, companyId: demo.id },
        { name: 'Technology Trends', isOpen: true, companyId: demo.id },
        { name: 'Career Advice', isOpen: false, companyId: demo.id }
      ]);
      console.log(`Seeded demo company: TechCorp (slug: techcorp), code: ${code}`);
    }

  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log("Please ensure you have PostgreSQL running and the connection string in .env is correct");
  }
};

connectDB();

// --- Routes ---

app.post('/api/companies/register', async (req, res) => {
  try {
    const { name, email, contact, primaryColor, secondaryColor, password } = req.body;
    if (!name || !email || !contact || !password) return res.status(400).json({ message: 'name, email, contact and password are required' });
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const passwordHash = await bcrypt.hash(password, 10);
    const company = await Company.create({
      name,
      email,
      contact,
      slug,
      passwordHash,
      primaryColor: primaryColor || '#2563eb',
      secondaryColor: secondaryColor || '#1e40af',
      isPro: false,
      subscriptionStatus: 'trial'
    });
    const code = generateCode();
    const hashtag = await Hashtag.create({ code, companyId: company.id, isActive: true });
    res.json({ company, hashtag });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Company Login
app.post('/api/companies/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password are required' });
    const company = await Company.findOne({ where: { email } });
    if (!company || !company.passwordHash) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, company.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify access code
app.post('/api/auth/verify-code', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: 'code is required' });
    const hashtag = await Hashtag.findOne({ where: { code, isActive: true }});
    if (!hashtag) return res.status(404).json({ message: 'Invalid or inactive code' });
    const company = await Company.findByPk(hashtag.companyId);
    res.json({ company, code: hashtag.code });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new hashtags for a company
app.post('/api/companies/:id/hashtags', async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    const code = generateCode();
    const hashtag = await Hashtag.create({ code, companyId: company.id, isActive: true });
    res.json(hashtag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle hashtag active
app.patch('/api/hashtags/:id', async (req, res) => {
  try {
    const { isActive } = req.body;
    const [updated] = await Hashtag.update({ isActive }, { where: { id: req.params.id }});
    if (!updated) return res.status(404).json({ message: 'Hashtag not found' });
    const updatedTag = await Hashtag.findByPk(req.params.id);
    res.json(updatedTag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Company Routes
app.get('/api/companies/:slug', async (req, res) => {
  try {
    const company = await Company.findOne({ where: { slug: req.params.slug } });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/companies', async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Auth (Simple verify or create)
app.post('/api/auth/google', async (req, res) => {
  const { email, name, picture, googleId, companyId } = req.body;
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, picture, googleId, companyId }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Programs
app.get('/api/programs', async (req, res) => {
  const { companyId } = req.query;
  const where = companyId ? { companyId } : { companyId: null };
  try {
    const programs = await Program.findAll({ where });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/programs', async (req, res) => {
  try {
    const program = await Program.create(req.body);
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/programs/:id', async (req, res) => {
  try {
    const [updated] = await Program.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProgram = await Program.findByPk(req.params.id);
      res.json(updatedProgram);
    } else {
      res.status(404).json({ message: "Program not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Questions
app.get('/api/questions', async (req, res) => {
  const { companyId } = req.query;
  const where = companyId ? { companyId } : { companyId: null };
  try {
    const questions = await Question.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/questions', async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/questions/:id/answer', async (req, res) => {
  const { answer } = req.body;
  try {
    const [updated] = await Question.update(
      { answer, answeredAt: new Date() },
      { where: { id: req.params.id } }
    );
    if (updated) {
        const updatedQuestion = await Question.findByPk(req.params.id);
        res.json(updatedQuestion);
    } else {
        res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
