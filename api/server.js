const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const BookStore = require("./models/BookModel");
const Borrower = require("./models/Borrower");

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

//get book
app.get("/book/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const book = BookStore.findById(id).then((book) => res.json(book));
  } catch (err) {
    console.log(err);
  }
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

//update book
app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const oldBook = await BookStore.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          bookName: req.body.bookName,
          author: req.body.author,
          quantity: req.body.quantity,
          bookType: req.body.bookType,
          language: req.body.language,
          publisher: req.body.publisher,
          publishYear: req.body.publishYear,
          pageCount: req.body.pageCount,
        },
      }
    );
  } catch (err) {
    console.log("update error" + err);
  }
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
//borrow book
app.post("/borrow/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const newBorrow = new Borrower({
      borrowerName: req.body.name,
      bookId: bookId,
      date: new Date(),
    });

    const borrow = await newBorrow.save();

    // decrease quantity
    await BookStore.findOneAndUpdate(
      { _id: bookId },
      { $inc: { quantity: -1 } }
    );

    res.status(200).json(borrow);
  } catch (err) {
    console.log(err);
  }
});
// borrowed book list
app.get("/borrowedBookList", async (req, res) => {
  try {
    const borrowList = await Borrower.aggregate([
      {
        $lookup: {
          from: "bookstores",
          localField: "bookId",
          foreignField: "_id",
          as: "book",
        },
      },
    ]);
    res.json(borrowList);
  } catch (err) {
    console.log(err);
  }
});

//return borrowed book
app.delete("/return/:id", async (req, res) => {
  const id = req.params.id;
  const bookId = req.body.bookId;

  //delete borrower
  await Borrower.findByIdAndDelete({ _id: id });
  //increace quantity
  await BookStore.findOneAndUpdate({ _id: bookId }, { $inc: { quantity: 1 } });
});

//searching
app.get("/search/:text", async (req, res) => {
  const text = req.params.text;
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
