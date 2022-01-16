import React, { FC } from "react";
import { Accordion, AccordionDetails, AccordionSummary, IconButton, TextField, Tooltip, Typography, Zoom } from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
// import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { useTodosContext } from "../../store/todos";
import { ITodo } from "../../types/Todo";
import { tasksAnimations } from "../../animations/animations";
import AddTodo from "./AddTodo";
import "./Todos.scss";
interface TodoProps {
  results: ITodo[];
}

const Todo: FC<TodoProps> = ({ results }): JSX.Element => {
  const { todos, finishTodo, deleteTodo } = useTodosContext();
  const todosRef = React.useRef<Array<HTMLDivElement>>([]);
  todosRef.current = [];

  const addTodoRefs = (el: HTMLDivElement) => {
    if (el && !todosRef.current.includes(el)) {
      todosRef.current.push(el);
    }
  };

  React.useEffect(() => {
    tasksAnimations(todosRef);
  });

  return (
    <>
      <AddTodo />
      {
        <div className="todos--wrapper">
          {todos &&
            results.map((todo: ITodo) => {
              return (
                <Accordion key={todo._id} className={todo.completed ? "completed todo" : "todo"} ref={addTodoRefs}>
                  <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1a-content" id="panel1a-header">
                    <div className="todos__details">
                      <div className="todos__details--title">
                        <Typography>{todo.title}</Typography>
                      </div>
                      <div className="todos__details--dates">
                        <div className="todos__actions">
                          <div className="todos__actions__update action" onClick={(e) => finishTodo(todo._id, e)}>
                            <Tooltip title="Finish" TransitionComponent={Zoom} placement="left" arrow>
                              <IconButton size="small">
                                <DoneIcon />
                              </IconButton>
                            </Tooltip>
                          </div>
                          <div className="todos__actions__delete action" onClick={(e) => deleteTodo(todo._id, e)}>
                            <Tooltip title="Delete" TransitionComponent={Zoom} placement="top" arrow>
                              <IconButton size="small">
                                <ClearIcon />
                              </IconButton>
                            </Tooltip>
                          </div>
                          {/* <div className="todos__actions__edit action">
                            <Tooltip title="Edit" TransitionComponent={Zoom} placement="right" arrow>
                              <IconButton size="small">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </div> */}
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
        </div>
      }
    </>
  );
};

export default Todo;
