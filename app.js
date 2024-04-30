const express = require('express');
const bodyParser = require('body-parser');
const items = require('./fakeDb');

const app = express();
app.use(bodyParser.json());

// GET /items - Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items - Add an item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json({ added: newItem });
});

// GET /items/:name - Get a single item by name
app.get('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const foundItem = items.find(item => item.name === itemName);
  if (foundItem) {
    res.json(foundItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// PATCH /items/:name - Update a single item by name
app.patch('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const updatedItem = req.body;
  const foundIndex = items.findIndex(item => item.name === itemName);
  if (foundIndex !== -1) {
    items[foundIndex] = { ...items[foundIndex], ...updatedItem };
    res.json({ updated: items[foundIndex] });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE /items/:name - Delete a single item by name
app.delete('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const foundIndex = items.findIndex(item => item.name === itemName);
  if (foundIndex !== -1) {
    items.splice(foundIndex, 1);
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
