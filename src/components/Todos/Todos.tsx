import React, { FC } from "react";
import { TodoService } from "../../services/todo.service";
import { useLoaderContext } from "../../store/loader";
import { useTodosContext } from "../../store/todos";
import Error from "../Error/Error";
import Todo from "./Todo";
import "./Todos.scss";

const Todos: FC = (): JSX.Element => {
  const { todos, setTodos } = useTodosContext();
  const { setLoading } = useLoaderContext();
  const [error, setError] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!todos.length) fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      await TodoService.getTodos().then(setTodos);
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return <main className={!error ? "todos__wrapper" : "error--wrapper"}>{!error ? <Todo /> : <Error />}</main>;
};

export default Todos;
