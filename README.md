# TreeDB

TreeDB is a module that provides a simple key-value database with a hierarchical tree structure. It allows you to store and retrieve data using dot-separated paths.

## Usage

Here's an example of how to use TreeDB:

```javascript
const { TreeDB } = require("./ReplTreeDB.js");

const db = new TreeDB();

// Set a value
await db.set("path.to.value", "Hello, TreeDB!");

// Get a value
const value = await db.get("path.to.value");
console.log(value); // Output: Hello, TreeDB!

// Delete a value
await db.delete("path.to.value");

// List all paths matching a prefix
const matches = await db.list("path");
console.log(matches); // Output: ['path.to.value']

// Update a value using a custom update function
await db.update("path.to.value", currentValue => currentValue + " Updated");
```

Here's an example Express API:

```javascript
const { TreeDB } = require("./ReplTreeDB.js")
const express = require('express');

// Create an instance of TreeDB
const treeDB = new TreeDB();

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

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
```

## API

### `new TreeDB()`

Creates a new TreeDB instance.

#### Methods

- `set(path: string, value: any): Promise<void>`
  - Sets the value at the specified path.
- `get(path: string): Promise<any>`
  - Retrieves the value at the specified path.
- `delete(path: string): Promise<void>`
  - Deletes the value at the specified path.
- `list(prefix?: string): Promise<string[]>`
  - Lists all paths in the tree that match the specified prefix. If no prefix is provided, all paths are returned.
- `update(path: string, updateFn: (currentValue: any) => any): Promise<void>`
  - Retrieves the current value at the specified path, applies the provided update function to it, and sets the updated value.
- `load(): Promise<void>`
  - Loads the tree structure from the underlying database.

Note: All methods are asynchronous and return Promises.

## License

```java

    ,""""""""""""""""",^,"""""""""""",                  
  .l ?]]]]]]]]]]]]]]]].~.????????????.I                 
 ",!l]IIIIIIIIIIIIIIII,< ]]]]]]]]]]]] l                 
 l ]]]lllllllllllllIII:> ]]]]]]]]]]]] l                 
 l:iii>>>>>>>>>>>>>]]] ~ ]]]]]]]]]]]] l                 
 l`++++++++++++++++---.~ ]]]]]]]]]]]] l                 
 lIIIIIIIIIIIIIIIIIIII;~.??????----?? l                 
 lIlllllllllllllllllll:iI"""""",;:;''l;".               
 l;lllllllllllllllllll:l    '^,,Iii??]-i;".             
 `I,I:::::::::I,,,,,,,:`   ,;ii??]]]]]]]-i",            
   ,:iiiiiiiii:,          :IIii!!!!!!!?]]]I:"           
   l ]]]]]]]]] l           ^`````````l.]]]] i           
   l ]]]]]]]]] l                   .`l.]]]]?.I          
   l.?]]]]]]]] l         ,""""""""";!!?]]]]] l          
   `i ]]]]]]]] l        I.?????????-]]]]]]]I";          
    ;:I]]]]]]]l;""""""",! ]]]]]]]]]]]]]]]?!^;           
     I,i-]]]]]]-???????.~ ]]]]]]]]]]]]]?!,,^            
      ^IIi?-]]]]]]]]]]] ~ ]]]]]]]]]]??!,,^              
        ^I"I!!!!!!!!!!!">:!!!!!!!!!!,",^                
           ^```````````^ ^``````````^

> SPCFORK INTERACTIVE
> 2022 - 20XX

  "We we, y'all!"
  - tCOW/ICow

  Welcome to the SPCFORK INTERACTIVE! Embracing the spirit of innovation and collaboration, we're thrilled to have you here. We ask you to join us as we journey from 2022 to the uncharted future of 20XX and push the boundaries of innovation.

  We promote open discussion, idea exchange, and group problem-solving in this dynamic space. And if you're here, reading this, we dub you a real SPCFORK INTERACTIVE Member because you strive to grow learn and advance. You're just like us, and we are happy to have you in the informative, and bright future of the net!

  So let's start this adventure, prepared to build, motivate, and mold the future.
```

This module is licensed under the [MIT License](https://opensource.org/licenses/MIT).