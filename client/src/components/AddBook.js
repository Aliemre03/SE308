import React from "react";

export default function AddBook() {
  return (
    <div>
      <div className="container w-50 mt-5 border border-secondary">
        <form style={{ padding: "20px 20px 10px 20px" }}>
          <div className="form-floating mb-2">
            <input
              type="text"
              name="bookName"
              className="form-control"
              id="floatingInput"
              placeholder="Bookname"
            />
            <label for="floatingInput">Book Name</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="text"
              name="author"
              className="form-control"
              id="floatingInput"
              placeholder="Author"
            />
            <label for="floatingInput">Author</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="number"
              name="quantity"
              className="form-control"
              id="floatingInput"
              placeholder="Quantity"
            />
            <label for="floatingInput">Quantity</label>
          </div>

          <div className="form-floating mb-2">
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
            >
              <option selected>Genre</option>
              <option value="Fantastic">Fantastic</option>
              <option value="Science-Fiction">Science-Fiction</option>
              <option value="History">History</option>
            </select>
            <label for="floatingSelect">Select book genre</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="text"
              name="language"
              className="form-control"
              id="floatingInput"
              placeholder="Language"
            />
            <label for="floatingInput">Language</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="text"
              name="publisher"
              className="form-control"
              id="floatingInput"
              placeholder="Publisher"
            />
            <label for="floatingInput">Publisher</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="number"
              name="publishYear"
              className="form-control"
              id="floatingInput"
              placeholder="PublishYear"
            />
            <label for="floatingInput">Publish Year</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="number"
              name="pageCount"
              className="form-control"
              id="floatingInput"
              placeholder="Pagecount"
            />
            <label for="floatingInput">Page Count</label>
          </div>
          <button type="button" className="btn btn-primary mb-2">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}
