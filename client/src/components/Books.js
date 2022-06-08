import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function Books({ books, lendBook, deleteBook, backBook }) {
  return (
    <div className="container mt-5">
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Book Name</th>
            <th scope="col">Author</th>
            <th scope="col">Quantity</th>
            <th scope="col">Genre</th>
            <th scope="col">Language</th>
            <th scope="col">Publish</th>
            <th scope="col">Publish Year</th>
            <th scope="col">Page Count</th>
            <th scope="col" colSpan="3">
              Process
            </th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book, index) => {
            return (
              <tr scope="col" key={index}>
                <td scope="col">{book._id}</td>
                <td>{book.bookName}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
                <td>{book.bookType}</td>
                <td>{book.language}</td>
                <td>{book.publisher}</td>
                <td>{book.publishYear}</td>
                <td>{book.pageCount}</td>
                <td>
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="btn btn-danger"
                  >
                    DELETE
                  </button>
                </td>
                <td>
                  <Link to={`/borrow/${book._id}`}>
                    <button className="btn btn-warning">BORROW</button>
                  </Link>
                </td>
                <td>
                  <Link to={`update/${book._id}`}>
                    <button className="btn btn-info">UPDATE</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
