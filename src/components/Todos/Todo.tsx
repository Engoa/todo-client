import React, { FC } from "react";
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, TextField, Tooltip, Typography, Zoom } from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useUserContext } from "../../store/user";
import dayjs from "dayjs";
import { useTodosContext } from "../../store/todos";
import { ITodo } from "../../types/Todo";
import "./Todos.scss";

const Todo: FC = (): JSX.Element => {
  const { user } = useUserContext();
  const { todos, todoForm, addTodo, finishTodo, deleteTodo, handleChange } = useTodosContext();

  interface IHandleTitle {
    userName: string;
    todoLength: number;
  }

  const HandleTitle: FC<IHandleTitle> = React.memo<IHandleTitle>(({ userName, todoLength }) => {
    if (!todos.length) {
      return (
        <span>
          Yay! <span className="title--headings">{userName}</span>, you have no tasks left to do! 🤓
        </span>
      );
    } else if (todos.length === 1) {
      return (
        <span>
          Hi <span className="title--headings">{userName}</span>, you have <span className="title--headings">{todoLength}</span> task left to do 😊
        </span>
      );
    } else {
      return (
        <span>
          Hi <span className="title--headings">{userName}</span>, you have <span className="title--headings">{todoLength}</span> tasks left to do 😊
        </span>
      );
    }
  });

  return (
    <>
      <>
        <div className="todos__add">
          <p className="todos__user--title">
            <HandleTitle todoLength={todos.length} userName={user.firstName} />
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
        {
          <React.Fragment>
            {!todos.length
              ? null
              : todos?.map((todo: ITodo) => {
                  return (
                    <Accordion key={todo._id} className={todo.completed ? "completed" : "todo"}>
                      <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1a-content" id="panel1a-header">
                        <div className="todos__details">
                          <div className="todos__details--title">
                            <Typography>{todo.title}</Typography>
                          </div>
                          <div className="todos__details--dates">
                            <div className="todos__actions">
                              <div className="todos__actions__update action" onClick={() => finishTodo(todo._id)}>
                                <Tooltip title="Finish" TransitionComponent={Zoom} placement="left" arrow>
                                  <DoneIcon />
                                </Tooltip>
                              </div>
                              <div className="todos__actions__delete action" onClick={() => deleteTodo(todo._id)}>
                                <Tooltip title="Delete" TransitionComponent={Zoom} placement="top" arrow>
                                  <ClearIcon />
                                </Tooltip>
                              </div>
                              <div className="todos__actions__edit action">
                                <Tooltip title="Edit" TransitionComponent={Zoom} placement="right" arrow>
                                  <EditIcon />
                                </Tooltip>
                              </div>
                            </div>
                            <div className="todos__details--date">
                              <Typography>
                                <span>Created: </span>
                                <span>{dayjs(todo.createdAt).format("DD/MM/YYYY")}</span>
                              </Typography>
                            </div>
                            <div className="todos__details--date">
                              <Typography>
                                <span>Updated: </span>
                                <span>{dayjs(todo.updatedAt).format("DD/MM/YYYY")}</span>
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p>{todo.text}</p>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
          </React.Fragment>
        }
      </>
    </>
  );
};

export default Todo;
