// require("dotenv").config();
const process = require("node:process");
const express = require("express");
const morgan = require("morgan");

// database
const Ponebook = require("./models/phonebook.js");

// Constantes
let { phoneBook } = require("./constants/default.js");

// Utilidades
const { randomId } = require("./utils/randoms.js");
const Phonebook = require("./models/phonebook.js");
const { error } = require("node:console");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("tiny"));

app.use(express.static("dist"));

app.get("/api/persons", (req, res) => {
  Phonebook.find({}).then((result) => res.json(result));
});

app.get("/info", (req, res, next) => {
  res.send(
    `<p>Phonebook has info for ${Phonebook.length - 1} people <br/> ${new Date()} </p>`,
  );
});

app.post("/api/persons", (req, res, next) => {
  const { body } = req;

  const newPhone = new Phonebook({ name: body.name, number: body.number });

  newPhone
    .save()
    .then((r) => res.json(r))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;

  Phonebook.findById(id)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;

  Phonebook.findByIdAndDelete(id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

app.use((req, res) => {
  res.status(404).json({ error: `Path '${req.path}' not found` });
});

app.use((error, req, res, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    res.status(400).json({ error: "malformatted id" });
    return;
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
});

app.listen(PORT, console.log(`server in port ${PORT}`));
