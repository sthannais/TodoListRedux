import React, { useEffect } from "react";
import TodoListItem from "components/TodoListItem";
import { useSelector, useDispatch } from "react-redux";
import { getTodoAsync } from "redux/todoSlice";
import "./styles.css";

const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => {
    console.log(state.todos);
    return state.todos;
  });

  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);

  const handleDelete = (todoId) => {
    // Fix an ability to delete task
  };

  const toggleCheck = (todoId, isChecked) => {
    // Fix an ability to toggle task
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      <ul className="todo-list-content">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoListItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              label={todo.label}
              handleDelete={handleDelete}
              toggleCheck={toggleCheck}
            />
          ))
        ) : (
          <div className="no-todos">
            Looks like you&apos;re absolutely free today!
          </div>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
