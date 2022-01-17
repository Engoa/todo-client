import React, { createContext, SyntheticEvent, useContext } from "react";
import { TodoService } from "../services/todo.service";
import { ITodo, TodoContent } from "../types/Todo";
import { useSnackBarContext } from "./snackbar";

export const TodosContext = createContext<TodoContent>({} as TodoContent);
export const useTodosContext = () => useContext(TodosContext);

export const TodosProvider: React.FC = ({ children }): JSX.Element => {
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [todoForm, setTodoForm] = React.useState({
    text: "",
    title: "",
    completed: false,
  });
  const { toggleSnackBar } = useSnackBarContext();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<Array<ITodo>>([]);

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoForm({ ...todoForm, [key]: event.target.value });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchResults(todos.filter((todo) => todo.title.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const resetSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  const addTodo = async (todoForm: ITodo, e: SyntheticEvent) => {
    e.preventDefault();
    if (!todoForm.text || !todoForm.title) return;
    try {
      const res = await TodoService.addTodo(todoForm);
      setTodos([res, ...todos]);
      toggleSnackBar("Task added successfully");
    } catch (err: any) {
      toggleSnackBar("An error occured while adding task");
      console.log(err);
    } finally {
      setTodoForm({ text: "", title: "", completed: false });
      resetSearch();
    }
  };
  const deleteTodo = async (selectedTodoID: string, e: SyntheticEvent) => {
    e.stopPropagation();
    try {
      setTodos(todos.filter((todo) => todo._id !== selectedTodoID));
      setSearchResults(searchResults.filter((todo) => todo._id !== selectedTodoID));
      await TodoService.deleteTodo(selectedTodoID);
      toggleSnackBar("Task deleted successfully");
    } catch (err: any) {
      toggleSnackBar("An error occured while deleting task");
      console.log(err);
    }
  };
  const finishTodo = async (selectedTodoID: string, e: SyntheticEvent) => {
    e.stopPropagation();
    const selectedTodo = todos.find((todo) => todo._id === selectedTodoID);
    try {
      const updatedTodo = {
        ...selectedTodo,
        completed: !selectedTodo.completed,
        updatedAt: new Date().toISOString(),
      };
      setTodos(todos.map((todo) => (todo._id === selectedTodoID ? updatedTodo : todo)));
      setSearchResults(searchResults.map((todo) => (todo._id === selectedTodoID ? updatedTodo : todo)));
      await TodoService.updateTodo(selectedTodoID, { completed: !selectedTodo.completed });
      toggleSnackBar("Task completed successfully");
    } catch (err: any) {
      toggleSnackBar("An error occured while completing task");
      console.log(err);
    }
  };
  const finishAll = async () => {
    if (todos.every((todo) => todo.completed)) return;
    try {
      setTodos(todos.map((todo) => ({ ...todo, completed: true, updatedAt: new Date().toISOString() })));
      setSearchResults(todos.map((todo) => ({ ...todo, completed: true, updatedAt: new Date().toISOString() })));
      await TodoService.updateAllTodos({ completed: true });
      toggleSnackBar("All tasks completed successfully");
    } catch (err: any) {
      toggleSnackBar("An error occured while completing tasks");
      console.log(err);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        todoForm,
        searchTerm,
        searchResults,
        resetSearch,
        setSearchTerm,
        setTodos,
        addTodo,
        finishTodo,
        finishAll,
        deleteTodo,
        handleChange,
        handleSearch,
        setSearchResults,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
