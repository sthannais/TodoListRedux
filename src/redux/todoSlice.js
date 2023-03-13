import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodoAsync = createAsyncThunk("todo/getTodosAsync", async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos"
  );
  if (response.ok) {
    const todos = await response.json();
    return { todos };
  }
});

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const response = await fetch(
      "https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: payload.title }),
      }
    );

    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todo/completeTodoAsync",
  async (payload) => {
    const response = await fetch(
      `https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${payload.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: payload.completed }),
      }
    );
    if (response.ok) {
      const todo = await response.json();
      return { id: todo.id, completed: todo.completed };
    }
  }
);

export const deleteCompleteAsync = createAsyncThunk(
  "todo/completeTodoAsync",
  async (id) => {
    const response = await fetch(
      `https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      return { id };
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodoAsync.pending]: (state, action) => {
      console.log("fetching data...");
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      console.log("fetched data success...");
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
