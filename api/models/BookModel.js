const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  bookType: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("BookStore", bookSchema);
