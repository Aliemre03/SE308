const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
  borrowerName: {
    type: String,
    required: true,
  },
  bookId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "BookModel",
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Borrower", borrowerSchema);
