const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));

let todos = [
    {
      id: 1,
      content: 'Buy Milk',
      is_completed: false,
      createdAt: '2025-03-11T06:26:36.890Z',
      updatedAt: '2025-03-11T06:26:36.890Z'
    },
    {
      id: 2,
      content: 'Buy groceries',
      is_completed: false,
      createdAt: '2025-03-11T06:26:42.774Z',
      updatedAt: '2025-03-11T06:26:42.774Z'
    },
    {
      id: 3,
      content: 'Buy Clothes',
      is_completed: false,
      createdAt: '2025-03-11T06:26:47.726Z',
      updatedAt: '2025-03-11T06:26:47.726Z'
    },
    {
      id: 4,
      content: 'Buy Shoes',
      is_completed: false,
      createdAt: '2025-03-11T06:27:07.196Z',
      updatedAt: '2025-03-11T06:27:07.196Z'
    }
  ];

let idCounter = 5;

app.get('/api/v0/lists', (req, res) => {
    
    const page = parseInt(req.query.page) || 1;
    const perPage = Math.min(Math.max(parseInt(req.query['per-page']) || 10, 1), 100);

    const startIndex = (page - 1) * perPage;
    const paginatedTodos = todos.slice(startIndex, startIndex + perPage);
    
    res.json({
        data: paginatedTodos,
        total_count: todos.length
    });
});

app.post('/api/v0/todos', (req, res) => {
    const { content, is_completed = false } = req.body;
    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }
    const newTodo = {
        id: idCounter++,
        content,
        is_completed,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    todos.push(newTodo);
    res.status(200).json({ message: "Todo created successfully", data: newTodo });
});

app.get('/api/v0/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
});

app.delete('/api/v0/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }
    todos.splice(todoIndex, 1);
    res.json({ message: "Todo deleted successfully" });
});

app.get('/api/v0/openapi.yaml', (req, res) => {
    res.sendFile(path.join(__dirname, "api", 'openapi.yaml'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/v0`);
});
