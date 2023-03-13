import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "redux/todoSlice";
import "./styles.css";

function TodoForm() {
  const [userInput, setUserInput] = useState("");

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setUserInput(e.currentTarget.value);
    console.log(userInput, "name");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() !== "") {
      dispatch(addTodoAsync({ title: userInput }));
      console.log("trae un hi", userInput);
      setUserInput("");
    }
  };

  console.log(userInput, "input"); // Agregamos un console.log aquí

  return (
    <div className="input" style={{ margin: 20 }}>
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          value={userInput}
          onChange={handleOnChange}
          style={{ border: "1px solid black", padding: "5px" }}
        />
        <button>Enter</button>
      </form>
    </div>
  );
}

export default TodoForm;
