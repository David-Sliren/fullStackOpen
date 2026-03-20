const express = require("express");
const morgan = require("morgan");

// Constantes
let { phoneBook } = require("./constants/default.js");

// Utilidades
const { randomId } = require("./utils/randoms.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("tiny"));

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("Hello Word");
});

app.get("/api/persons", (req, res) => {
  res.json(phoneBook);
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${phoneBook.length} people <br/> ${new Date()} </p>`,
  );
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);

  phoneBook = phoneBook.filter((d) => d.id !== numberId);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const { body } = req;

  if (body.name === "")
    return res.status(404).json({ error: "You must enter a name" });

  if (body.number === "")
    return res.status(404).json({ error: "You must enter a phone number" });

  const isRepeat = phoneBook.some((d) => d.name === body.name);

  if (isRepeat) {
    return res.status(404).json({ error: "name must be unique" });
  }

  const newPhone = { id: randomId(phoneBook.length), ...body };

  phoneBook.push(newPhone);

  res.json(newPhone);
});

app.use((req, res) => {
  res.status(404).json({ error: `Path '${req.path}' not found` });
});

app.listen(PORT, console.log(`server in port ${PORT}`));
