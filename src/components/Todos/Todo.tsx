import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography } from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { TodoService } from "../../services/todo.service";
import { Button } from "@mui/material";
import { useUserContext } from "../../store/user";
import dayjs from "dayjs";
import "./Todos.scss";

const Todo = () => {
  const [todoForm, setTodoForm] = React.useState({
    text: "",
    title: "",
    completed: false,
  });
  const [todos, setTodos] = React.useState<any[]>([]);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const { user, setUser } = useUserContext();

  React.useEffect(() => {
    TodoService.getTodos()
      .then((res) => {
        setTodos(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement> & any) => {
    setTodoForm({ ...todoForm, [key]: event.target.value.trim() });
  };

  const addTodo = async () => {
    if (!todoForm.text || !todoForm.title) return;
    try {
      const res = await TodoService.addTodo(todoForm);
      setTodos({ ...todos, ...res });
      console.log(res);
    } catch (err: any) {
      console.log(err);
    }
  };
  const deleteTodo = async (e: any) => {
    e.stopPropagation();
    const selectedTodoID = e.currentTarget.dataset.id;

    try {
      const res = await TodoService.deleteTodo(selectedTodoID);
      setTodos({ ...todos, ...res });
      console.log(res);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="todos__add">
        <div className="todos__user--title">
          <p>
            Hi <span>{user.firstName},</span> you have <span>{todos.length}</span> {todos.length > 1 ? "tasks" : "task"} left to do 😊
          </p>
        </div>
        <div className="todos__add__inputs">
          <div className="input--wrapper">
            <TextField label="Task title" onChange={handleChange("title")} type="text" />
          </div>
          <div className="input--wrapper">
            <TextField label="Describe your task" onChange={handleChange("text")} type="text" id="todo-text" />
          </div>
        </div>
        <div className="input--wrapper">
          <Button onClick={addTodo}>Add Todo</Button>
        </div>
      </div>
      {todos?.map((todo, index) => {
        return (
          <Accordion key={todo.text + index}>
            <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1a-content" id="panel1a-header">
              <div className="todos__details">
                <div className="todos__details--title">
                  <Typography>{todo.title}</Typography>
                </div>
                <div className="todos__details--dates">
                  <div className="todos__details__delete" onClick={deleteTodo} data-id={todo._id}>
                    <ClearIcon />
                  </div>
                  <div className="todos__details--date">
                    <Typography>
                      <span>Created at: </span>
                      <span>{dayjs(todo.createdAt).format("DD/MM/YYYY")}</span>
                    </Typography>
                  </div>
                  {todo.updatedAt !== todo.createdAt ? (
                    <div className="todos__details--date">
                      <Typography>
                        <span>Last updated: </span>
                        <span>{dayjs(todo.updatedAt).format("DD/MM/YYYY")}</span>
                      </Typography>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{todo.text} </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default Todo;
