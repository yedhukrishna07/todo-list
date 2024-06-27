const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());


let todos = []; 
app.get('/todos', (req, res) => {
    res.json(todos);
  });

  
  app.post('/todos', (req, res) => {
    const { title } = req.body; 
    if (!title) {
      return res.status(400).send('Missing required field: title');
    }
    const newTodo = { id: Date.now(), title, completed: false };
    todos.push(newTodo); 
    res.status(201).json(newTodo);
  });

  app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const todo = todos.find(todo => todo.id === id); 
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    res.json(todo); 
  });
  

  app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === id); 
    if (todoIndex === -1) {
      return res.status(404).send('Todo not found');
    }
    todos[todoIndex] = { id, title: title || todos[todoIndex].title, completed: completed !== undefined ? completed : todos[todoIndex].completed }; // Update the todo object
    res.json(todos[todoIndex]); 
  });
  

  app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      return res.status(404).send('Todo not found'); 
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(204); 
  });
  

  const port = process.env.PORT || 3007; 

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  
  