import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";

const TodoResults = () => {
  // Fix an ability to calculate completed tasks
  const completedTodo = useSelector((state) =>
    state.todos.filter((todo) => todo.completed === true)
  );

  return <div className="todo-results">Done:{completedTodo.length}</div>;
};

export default TodoResults;
