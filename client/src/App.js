import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import AddBook from "./components/AddBook";
import Books from "./components/Books";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({
    bookName: "",
    author: "",
    quantity: "",
    bookType: "",
    language: "",
    publisher: "",
    publishYear: "",
    pageCount: "",
  });

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("/books")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setBooks(jsonRes));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const addBook = (e) => {
    e.preventDefault();
    const newBook = {
      bookName: book.bookName,
      author: book.author,
      quantity: book.quantity,
      bookType: book.bookType,
      language: book.language,
      publisher: book.publisher,
      publishYear: book.publishYear,
      pageCount: book.pageCount,
    };

    axios.post("/newbook", newBook);
    alert(`The Book ${book.bookName} is added`);
    setBook({
      bookName: "",
      author: "",
      quantity: "",
      bookType: "",
      language: "",
      publisher: "",
      publishYear: "",
      pageCount: "",
    });
  };

  const deleteBook = (id) => {
    axios.delete("/delete/" + id);
    alert(`The book with id ${id} is deleted`);
  };

  const lendBook = (id) => {
    axios.put("/lend/" + id);
    alert(`The book with id ${id} is lended`);
  };

  const backBook = (id) => {
    axios.put("/back/" + id);
    alert(`The book with id ${id} is back`);
  };

  const search = async (e) => {
    e.preventDefault();
    const searchedBooks = await axios.get("/search/" + searchText);

    if (searchedBooks.data.length > 0) {
      setBooks(searchedBooks.data);
    } else {
      alert(`No such book`);
    }
  };

  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Book Management
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Books
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="addbook">
                    Add Book
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Genre
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Fantastic
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Science-Fiction
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        History
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  onClick={(e) => search(e)}
                  className="btn btn-outline-success"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            exact
            path="/"
            element={
              <Books
                books={books}
                lendBook={lendBook}
                deleteBook={deleteBook}
                backBook={backBook}
              />
            }
          ></Route>

          <Route
            path="/addbook"
            element={
              <AddBook
                book={book}
                handleChange={handleChange}
                addBook={addBook}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
