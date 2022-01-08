import React, { createContext, useContext } from "react";
import { TodoService } from "../services/todo.service";
import { ITodo } from "../types/Todo";

export type TodoContent = {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  addTodo: (todoForm: ITodo) => void;
  deleteTodo: (selectedTodoID: string) => void;
  finishTodo: (selectedTodoID: string) => void;
};

export const TodosContext = createContext<TodoContent>({} as TodoContent);
export const useTodosContext = () => useContext(TodosContext);

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = React.useState<ITodo[]>([]);

  const addTodo = async (todoForm: ITodo) => {
    if (!todoForm.text || !todoForm.title) return;
    try {
      const res = await TodoService.addTodo(todoForm);
      setTodos([res, ...todos]);
    } catch (err: any) {
      console.log(err);
    }
  };
  const deleteTodo = async (selectedTodoID: string) => {
    try {
      await TodoService.deleteTodo(selectedTodoID);
      setTodos(todos.filter((todo) => todo._id !== selectedTodoID));
    } catch (err: any) {
      console.log(err);
    }
  };
  const finishTodo = async (selectedTodoID: string) => {
    const selectedTodo = todos.find((todo) => todo._id === selectedTodoID);
    if (!selectedTodo) return;
    try {
      const updatedTodo = {
        ...selectedTodo,
        completed: !selectedTodo.completed,
      };
      await TodoService.updateTodo(selectedTodoID, { completed: !selectedTodo.completed });
      setTodos(todos.map((todo) => (todo._id === selectedTodoID ? updatedTodo : todo)));
    } catch (err: any) {
      console.log(err);
    }
  };

  return <TodosContext.Provider value={{ todos, setTodos, addTodo, finishTodo, deleteTodo }}>{children}</TodosContext.Provider>;
};
