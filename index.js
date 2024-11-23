import express from 'express';
import { prisma } from './db.js';

const app = express();
app.use(express.json());

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Get single todo
app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// Create todo
app.post('/todos', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const todo = await prisma.todo.create({
      data: { title }
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Update todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { title, completed } = req.body;
    const todo = await prisma.todo.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed })
      }
    });
    res.json(todo);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete todo
app.delete('/todos/:id', async (req, res) => {
  try {
    await prisma.todo.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

const port = 3000;
app.listen(port, async () => {
  console.log(`Todo API running at http://localhost:${port}`);
});