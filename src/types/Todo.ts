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
  searchTerm: string;
  searchResults: ITodo[];
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSearchResults: React.Dispatch<React.SetStateAction<ITodo[]>>;
  setTodos: (todos: ITodo[]) => void;
  addTodo: (todoForm: ITodo, e: SyntheticEvent) => void;
  deleteTodo: (selectedTodoID: string, e: SyntheticEvent, arr: ITodo[]) => void;
  finishTodo: (selectedTodoID: string, e: SyntheticEvent, arr: ITodo[]) => void;
  handleChange: (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
