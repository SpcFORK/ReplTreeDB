import { TreeDB } from "./ReplTreeDB.js";
import express, { json } from 'express';

// Create an instance of TreeDB
const treeDB = new TreeDB();

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(json());

// Route to set a value in the tree
app.post('/set', async (req, res) => {
  const { path, value } = req.body;
  await treeDB.set(path, value);
  res.sendStatus(200);
});

// Route to get a value from the tree
app.get('/get/:path', async (req, res) => {
  const value = await treeDB.get(req.params.path);
  if (value === null) {
    res.sendStatus(404);
  } else {
    res.json(value);
  }
});

// Route to delete a value from the tree
app.delete('/delete/:path', async (req, res) => {
  await treeDB.delete(req.params.path);
  res.sendStatus(200);
});

// Route to list paths in the tree
app.get('/list', async (req, res) => {
  const prefix = req.query.prefix || '';
  const paths = await treeDB.list(prefix);
  res.json(paths);
});

// Route to update a value in the tree
app.put('/update/:path', async (req, res) => {
  const { path } = req.params;
  const { updateFn } = req.body;
  await treeDB.update(path, updateFn);
  res.sendStatus(200);
});

// Load the initial state of the tree from the database
treeDB.load()
  .then(() => {
    // Start the server
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((error) => {
    console.error('Failed to load tree from the database:', error);
  });
