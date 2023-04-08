import {TodoItemType} from './genericTypes';

export type TodoStateType = {
  fetchingTodos: boolean;
  todos: Array<TodoItemType>;

  creatingTodo: boolean;
  createTodoSuccess: boolean;
  createTodoError: boolean;

  updatingTodo: boolean;
  updateTodoSuccess: boolean;
  updateTodoError: boolean;

  deletingTodo: boolean;
  deleteTodoSuccess: boolean;
  deleteTodoError: boolean;
};

export type StoreType = {
  todo: TodoStateType;
};

export type TodoData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
