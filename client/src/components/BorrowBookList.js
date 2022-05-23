import axios from "axios";
import React, { useEffect, useState } from "react";

export default function BorrowBookList() {
  const [borrowBookList, setBorrowBookList] = useState([]);
  useEffect(() => {
    const get = async () => {
      const borrows = await axios.get("/borrowedBookList");
      setBorrowBookList(borrows.data);
    };
    get();
  }, []);

  const backBook = async (id, bookId) => {
    console.log("id: ", id);
    console.log("bookid: ", bookId);
    await axios.delete("/return/" + id, { data: { bookId: bookId } });
  };

  return (
    <div className="container mt-5">
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Book Name</th>
            <th scope="col">Borrower Name</th>
            <th scope="col">Date</th>
            <th scope="col" colSpan="1">
              Process
            </th>
          </tr>
        </thead>

        <tbody>
          {borrowBookList.map((borrow, index) => {
            return (
              <tr scope="col" key={index}>
                <td scope="col">{borrow.bookId}</td>
                <td>{borrow?.book[0]?.bookName || "Book has deleted"}</td>
                <td>{borrow.borrowerName}</td>
                <td>{borrow.date}</td>
                <td>
                  <button
                    onClick={() => backBook(borrow._id, borrow.bookId)}
                    className="btn btn-primary"
                  >
                    BACK
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
