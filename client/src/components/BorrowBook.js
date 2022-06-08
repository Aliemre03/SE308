import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function BorrowBook() {
  const [name, setName] = useState("");

  const { id } = useParams();
  let navigate = useNavigate();

  const borrowBook = async () => {
    await axios
      .post("/borrow/" + id, { name: name })
      .then((res) => console.log(res));
    navigate("../", { replace: true });
  };

  return (
    <div>
      <div className="container w-50 mt-5 border border-secondary">
        <form style={{ padding: "20px 20px 10px 20px" }}>
          <div className="form-floating mb-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="form-control"
              id="floatingInput"
              placeholder="Name"
            />
            <label for="floatingInput">Name</label>
          </div>
          <button
            type="button"
            onClick={() => borrowBook()}
            className="btn btn-primary mb-2"
          >
            Borrow
          </button>
        </form>
      </div>
    </div>
  );
}
