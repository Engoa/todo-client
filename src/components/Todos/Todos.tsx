import React, { FC } from "react";
import Todo from "./Todo";
import "./Todos.scss";

const Todos: FC = (): JSX.Element => {
  return (
    <main className="todos__wrapper">
      <Todo />
    </main>
  );
};

export default Todos;
