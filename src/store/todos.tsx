import React, { createContext, SyntheticEvent, useContext } from "react";
import { TodoService } from "../services/todo.service";
import { ITodo } from "../types/Todo";
import { useSnackBarContext } from "./snackbar";

export type TodoContent = {
  todos: ITodo[];
  todoForm: ITodo;
  setTodos: (todos: ITodo[]) => void;
  addTodo: (todoForm: ITodo) => void;
  deleteTodo: (selectedTodoID: string, e: SyntheticEvent) => void;
  finishTodo: (selectedTodoID: string, e: SyntheticEvent) => void;
  handleChange: (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

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

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoForm({ ...todoForm, [key]: event.target.value });
  };

  const addTodo = async (todoForm: ITodo) => {
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
    }
  };
  const deleteTodo = async (selectedTodoID: string, e: SyntheticEvent) => {
    e.stopPropagation();
    try {
      await TodoService.deleteTodo(selectedTodoID);
      setTodos(todos.filter((todo) => todo._id !== selectedTodoID));
      toggleSnackBar("Task deleted successfully");
    } catch (err: any) {
      toggleSnackBar("An error occured while deleting task");
      console.log(err);
    }
  };
  const finishTodo = async (selectedTodoID: string, e: SyntheticEvent) => {
    e.stopPropagation();
    const selectedTodo = todos.find((todo) => todo._id === selectedTodoID);
    if (!selectedTodo) return;
    try {
      const updatedTodo = {
        ...selectedTodo,
        completed: !selectedTodo.completed,
      };
      await TodoService.updateTodo(selectedTodoID, { completed: !selectedTodo.completed });
      setTodos(todos.map((todo) => (todo._id === selectedTodoID ? updatedTodo : todo)));
      toggleSnackBar("Task updated successfully");
    } catch (err: any) {
      toggleSnackBar("An error occured while updating task");
      console.log(err);
    }
  };

  return (
    <TodosContext.Provider value={{ todos, todoForm, setTodos, addTodo, finishTodo, deleteTodo, handleChange }}>{children}</TodosContext.Provider>
  );
};
