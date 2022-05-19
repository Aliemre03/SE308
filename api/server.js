const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const BookStore = require("./models/BookModel");

const app = express();

app.use(bodyParser.json());
app.use(cors());

//DB connection
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.8cyyl.mongodb.net/se308?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("Database connected"))
  .catch((err) => console.log(err));

//get books
app.get("/books", async (req, res) => {
  BookStore.find().then((books) => res.json(books));
});

//adding new book
app.post("/newbook", async (req, res) => {
  try {
    const newBook = new BookStore({
      bookName: req.body.bookName,
      author: req.body.author,
      quantity: req.body.quantity,
      bookType: req.body.bookType,
      language: req.body.language,
      publisher: req.body.publisher,
      publishYear: req.body.publishYear,
      pageCount: req.body.pageCount,
    });
    const book = await newBook.save();
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
  }
});

//delete book
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  BookStore.findByIdAndDelete({ _id: id }, (err) => {
    if (err) {
      console.log("book couldnt deleted");
    }
  });
});

//lend book
app.put("/lend/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await BookStore.findOneAndUpdate({ _id: id }, { $inc: { quantity: -1 } });
  } catch (err) {
    console.log(err);
  }
});

//back book
app.put("/back/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await BookStore.findOneAndUpdate({ _id: id }, { $inc: { quantity: 1 } });
  } catch (err) {
    console.log(err);
  }
});

app.get("/search/:text", async (req, res) => {
  const text = req.params.text;
  console.log(text);
  BookStore.find({
    $or: [
      { bookName: text },
      { author: text },
      { bookType: text },
      { publisher: text },
      { language: text },
    ],
  }).then((books) => res.json(books));
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(5000, () => {
  console.log("Server is running");
});
