// calling  dependencies
const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

const Toy = require("./models/toy");

app.use((bodyParser.urlencoded({ extended: true })));
app.use((bodyParser.json));

app.use(
  session({
    secret: "secret-key",
    resave: "false",
    saveUninitiated: true,
  })
);

// mongoose connection
mongoose
  .connect(
    "mongodb+srv://mbabazieken:kashera2023@cluster0.x3cma6f.mongodb.net/daystar?authSource=admin&replicaSet=atlas-a2s6df-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
  )
  .then(async () => {
    console.log("Connected to MongoDB");

    // Create a new toy
    const newToy = new Toy({
      name: "Bella",
      price: 25000,
      inStock: false,
    });

    // Save the toy to the database
    const savedToy = await newToy.save();
    console.log("Toy saved:", savedToy);
  })
  .catch((err) => {
    console.error("Error:", err);
  });

// routes
app.get("/", (req, res) => {
  res.send("my progress");
});

app.get("/toys", async (req, res) => {
  try {
    const toys = await Toy.find();
    res.json(toys);
  } catch (err) {
    res.status(500).send("Error retrieving toys" + err);
  }
});

app.get("/toys/:id", async (req, res) => {
  try {
    const toy = await Toy.findById(req.body.Id);
    if (toy) {
      res.json(toy);
    } else {
      res.status(404).send("toy not found");
    }
  } catch (err) {
    res.status(500).send("Error finding toy" + err);
  }
});

app.post("/toys", async(req,res) => {
  const {name,price,inStock} = req.body;
  const newToy = new Toy({
    name,
    price,
    inStock,
  });
  try {
    const newToy = await new Toy.save();
    res.status(201).json()('toy saved');
  } catch (error) {
    res.status(500).send('Error saving toy' + err);
  }
})

// port
const PORT = 3500;
app.listen(PORT, () => {
  console.log(`progress is running at http://localhost${PORT}`);
});
