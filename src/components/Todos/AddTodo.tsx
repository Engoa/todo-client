import React, { FC } from "react";
import { TextField, Button } from "@mui/material";
import { useTodosContext } from "../../store/todos";
import { useUserContext } from "../../store/user";
import { ITodo } from "../../types/Todo";

const AddTodo: FC = (): JSX.Element => {
  const { user } = useUserContext();
  const { todos, todoForm, addTodo, handleChange } = useTodosContext();

  interface IHandleTitle {
    userName: string;
  }

  const HandleTitle: FC<IHandleTitle> = React.memo<IHandleTitle>(({ userName }) => {
    const incompleteTodos = todos.filter((todo: ITodo) => !todo.completed);

    if (!incompleteTodos.length) {
      return (
        <span>
          Yay! <span className="title--headings">{userName}</span>, you have no tasks left to do! 🤓
        </span>
      );
    } else if (incompleteTodos.length === 1) {
      return (
        <span>
          Hi <span className="title--headings">{userName}</span>, you have <span className="title--headings">{incompleteTodos.length}</span> task left
          to do 😊
        </span>
      );
    } else {
      return (
        <span>
          Hi <span className="title--headings">{userName}</span>, you have <span className="title--headings">{incompleteTodos.length}</span> tasks
          left to do 😊
        </span>
      );
    }
  });
  return (
    <div className="todos__add">
      <p className="todos__user--title">
        <HandleTitle userName={user.firstName} />
      </p>
      <div className="todos__add__inputs">
        <div className="input--wrapper">
          <TextField
            label="The title of your task"
            onChange={handleChange("title")}
            type="text"
            value={todoForm.title}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div className="input--wrapper">
          <TextField
            label="Describe your task"
            onChange={handleChange("text")}
            type="text"
            id="todo-text"
            value={todoForm.text}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
      <div className="input--wrapper">
        <Button variant="contained" onClick={() => addTodo(todoForm)} disabled={!todoForm.text || !todoForm.title ? true : false}>
          Add Todo
        </Button>
      </div>
    </div>
  );
};

export default AddTodo;
