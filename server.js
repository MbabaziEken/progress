// calling  dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Toy  = require('./models/toy')

// mongoose connection
mongoose.connect('mongodb+srv://mbabazieken:kashera2023@cluster0.x3cma6f.mongodb.net/daystar?authSource=admin&replicaSet=atlas-a2s6df-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
.then(() => {
    console.log('Connected to MongoDB');

 // Create a new toy
 const newToy = new Toy({
    name: 'Teddy Bear',
    price: 50000,
    inStock: true
  });

  // Save the toy to the database
  return newToy.save();
})
.then(toy => {
  console.log('Toy saved:', toy);
})
.catch(err => {
  console.error('Error:', err);
});

// routes
app.get('/', (req , res) => {
    res.send('my progress')
});

// port
const PORT = 3500;
app.listen(PORT, () => {
    console.log(`progress is running at http://localhost${PORT}`)
});