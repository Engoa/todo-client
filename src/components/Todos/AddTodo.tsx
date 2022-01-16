import React, { FC, SyntheticEvent } from "react";
import { TextField, Button } from "@mui/material";
import { useTodosContext } from "../../store/todos";
import { useUserContext } from "../../store/user";
import { ITodo } from "../../types/Todo";
import SearchBar from "../SearchBar/SearchBar";

const AddTodo: FC = (): JSX.Element => {
  const { user } = useUserContext();
  const { todos, todoForm, addTodo, handleChange, finishAll } = useTodosContext();

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
    <>
      <div className="todos__add">
        <div className="todos__user--title">
          <HandleTitle userName={user.firstName} />
          <div className="todos__complete__all">
            <Button variant="contained" onClick={finishAll}>
              Complete All
            </Button>
          </div>
        </div>
        <form className="todos__add__inputs">
          <div className="input--wrapper">
            <TextField
              label="The title of your task"
              onChange={handleChange("title")}
              type="text"
              value={todoForm.title}
              autoComplete="off"
              spellCheck={false}
              ref={(input) => input && input.focus()}
            />
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
          <Button
            variant="contained"
            type="submit"
            onClick={(e: SyntheticEvent) => addTodo(todoForm, e)}
            disabled={!todoForm.text || !todoForm.title ? true : false}
          >
            Add Todo
          </Button>
        </form>
      </div>
      {todos.length ? <SearchBar /> : null}
    </>
  );
};

export default AddTodo;
