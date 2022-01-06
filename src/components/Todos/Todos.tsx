import React from "react";
import { TodoService } from "../../services/todo.service";
import Todo from "./Todo";
import "./Todos.scss";

const Todos = () => {
  return (
    <main className="todos__wrapper">
      <Todo />
    </main>
  );
};

export default Todos;
