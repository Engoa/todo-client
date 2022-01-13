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
      setTodos(todos.filter((todo) => todo._id !== selectedTodoID));
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
    if (!selectedTodo) return;
    try {
      const updatedTodo = {
        ...selectedTodo,
        completed: !selectedTodo.completed,
      };
      setTodos(todos.map((todo) => (todo._id === selectedTodoID ? updatedTodo : todo)));
      await TodoService.updateTodo(selectedTodoID, { completed: !selectedTodo.completed });
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
