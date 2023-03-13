import React from "react";
import { useDispatch } from "react-redux";
import { toggleCompleteAsync, deleteTodo } from "redux/todoSlice";
import "./styles.css";

const TodoListItem = ({ id, completed, onDelete, label }) => {
  const dispatch = useDispatch();

  const handleCompleteClick = () => {
    dispatch(
      toggleCompleteAsync({
        id: id,
        completed: !completed,
      })
    );
  };

  const handleDeleteTodo = () => {
    dispatch(
      deleteTodo({
        id: id,
      })
    );
  };

  return (
    <div className="todo-list-item">
      <div
        tabIndex="0"
        role="checkbox"
        aria-checked={completed}
        className="todo-list-item-content"
        onClick={handleCompleteClick}
      >
        <input
          tabIndex="-1"
          type="checkbox"
          checked={completed}
          onChange={handleCompleteClick}
        />
        <span className={completed ? "todo-list-item-checked" : ""}>
          {label}
        </span>
      </div>
      <button
        type="button"
        className="todo-list-item-delete"
        onClick={handleDeleteTodo}
      >
        x
      </button>
    </div>
  );
};

export default TodoListItem;
