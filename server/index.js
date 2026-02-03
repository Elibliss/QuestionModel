import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import { User } from './models/User.js';
import { Program } from './models/Program.js';
import { Question } from './models/Question.js';
import { Company } from './models/Company.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

    // Sync models (create tables if they don't exist)
    // In production, use migrations instead of sync({ alter: true })
    await sequelize.sync();
    console.log('Models synced');

    // Seed initial data if empty
    const programCount = await Program.count();
    if (programCount === 0) {
      await Program.bulkCreate([
        { name: 'Health & Wellness', isOpen: true },
        { name: 'Technology Trends', isOpen: true },
        { name: 'Career Advice', isOpen: false }
      ]);
      console.log('Seeded initial programs');
    }

    // Seed Demo Company
    const companyCount = await Company.count();
    if (companyCount === 0) {
      await Company.create({
        name: 'TechCorp',
        slug: 'techcorp',
        primaryColor: '#ea580c', // Orange-600
        secondaryColor: '#9a3412', // Orange-800
        isPro: true,
        subscriptionStatus: 'active'
      });
      console.log('Seeded demo company: TechCorp (slug: techcorp)');
    }

  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log("Please ensure you have PostgreSQL running and the connection string in .env is correct");
  }
};

connectDB();

// --- Routes ---

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
