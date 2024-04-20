import {createSlice, nanoid} from '@reduxjs/toolkit';
import TodoStore from './TodoStore';
import { TodoItemType } from '@/types/genericTypes';

const initialState = TodoStore;

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setLoading: (state, action: {payload: boolean; type: string}) => {
      state.fetchingTodos = action.payload;
    },
    addTodos: (state, action: {payload: TodoItemType[]; type: string}) => {
      state.todos = action.payload;
    },
    createTodo: (state, action: {payload: {title: string}; type: string}) => {
      state.todos = state.todos.concat([
        {title: action.payload.title, id: nanoid()},
      ]);
    },
    updateTodo: (state, action: {payload: TodoItemType; type: string}) => {
      state.todos = state.todos.map((todoItem: TodoItemType) => {
        if (todoItem.id === action.payload.id) {
          todoItem.title = action.payload.title;
          return todoItem;
        }
        return todoItem;
      });
      state.todos.concat([action.payload]);
    },
    deleteTodo: (state, action: {payload: {id: string}; type: string}) => {
      state.todos = state.todos.filter(
        (todoItem: TodoItemType) => todoItem.id !== action.payload.id,
      );
    },
  },
});

const {addTodos, createTodo, updateTodo, deleteTodo, setLoading} =
  todoSlice.actions;

export const TodoAction = {
  addTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  setLoading,
};

export default todoSlice.reducer;
