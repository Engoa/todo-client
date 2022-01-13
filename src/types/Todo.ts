import { SyntheticEvent } from "react";

export type ITodo = {
  text: string;
  title: string;
  completed: boolean;
  updatedAt?: string;
  createdAt?: string;
  _id?: string;
};

export type TodoContent = {
  todos: ITodo[];
  todoForm: ITodo;
  setTodos: (todos: ITodo[]) => void;
  addTodo: (todoForm: ITodo) => void;
  deleteTodo: (selectedTodoID: string, e: SyntheticEvent) => void;
  finishTodo: (selectedTodoID: string, e: SyntheticEvent) => void;
  handleChange: (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};
