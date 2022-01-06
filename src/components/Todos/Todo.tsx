import React, { FC, SyntheticEvent, useRef } from "react";
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, TextField, Typography } from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import { TodoService } from "../../services/todo.service";
import { Button } from "@mui/material";
import { useUserContext } from "../../store/user";
import dayjs from "dayjs";
import "./Todos.scss";

const Todo: FC = (): JSX.Element => {
  const [todoForm, setTodoForm] = React.useState({
    text: "",
    title: "",
    completed: false,
  });
  const [todos, setTodos] = React.useState<any[]>([]);
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    try {
      setLoading(true);
      TodoService.getTodos().then((res) => {
        setTodos(res);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  }, []);

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement> & any) => {
    setTodoForm({ ...todoForm, [key]: event.target.value.trim() });
  };

  const addTodo = async () => {
    if (!todoForm.text.trim() || !todoForm.title.trim()) return;
    try {
      const res = await TodoService.addTodo(todoForm);
      setTodos([...todos, res]);
    } catch (err: any) {
      console.log(err);
    }
  };
  const deleteTodo = async (e: SyntheticEvent | any) => {
    e.stopPropagation();
    const selectedTodoID = e.currentTarget.dataset.id;
    try {
      setTodos(todos.filter((todo) => todo._id !== selectedTodoID));
      await TodoService.deleteTodo(selectedTodoID);
    } catch (err: any) {
      console.log(err);
    }
  };
  const updateTodo = async (e: SyntheticEvent | any) => {
    e.stopPropagation();
    const selectedTodoID = e.currentTarget.dataset.id;
    const selectedTodo = todos.find((todo) => todo._id === selectedTodoID);
    if (!selectedTodo) return;
    try {
      const updatedTodo = {
        ...selectedTodo,
        completed: !selectedTodo.completed,
      };
      setTodos(todos.map((todo) => (todo._id === selectedTodoID ? updatedTodo : todo)));
      await TodoService.updateTodo(selectedTodoID, updatedTodo);
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
            <TextField label="The title of your task" onChange={handleChange("title")} type="text" />
          </div>
          <div className="input--wrapper">
            <TextField label="Describe your task" onChange={handleChange("text")} type="text" id="todo-text" />
          </div>
        </div>
        <div className="input--wrapper">
          <Button variant="contained" onClick={addTodo} disabled={!todoForm.text || !todoForm.title ? true : false}>
            Add Todo
          </Button>
        </div>
      </div>
      {todos?.map((todo) => {
        return (
          <Accordion key={todo._id} className={todo.completed ? "completed" : ""}>
            <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1a-content" id="panel1a-header">
              <div className="todos__details">
                <div className="todos__details--title">
                  <Typography>{todo.title}</Typography>
                </div>
                <div className="todos__details--dates">
                  <div className="todos__details__delete todos__details__update" onClick={updateTodo} data-id={todo._id}>
                    <DoneIcon />
                  </div>
                  <div className="todos__details__delete" onClick={deleteTodo} data-id={todo._id}>
                    <ClearIcon />
                  </div>
                  <div className="todos__details--date">
                    <Typography>
                      <span>Created at: </span>
                      <span>{dayjs(todo.createdAt).format("DD/MM/YYYY")}</span>
                    </Typography>
                  </div>
                  <div className="todos__details--date">
                    <Typography>
                      <span>Last updated: </span>
                      <span>{dayjs(todo.updatedAt).format("DD/MM/YYYY")}</span>
                    </Typography>
                  </div>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{todo.text}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
      {loading && (
        <div className="spinner--wrapper">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Todo;
