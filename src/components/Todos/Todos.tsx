import React, { FC } from "react";
import { TodoService } from "../../services/todo.service";
import { useLoaderContext } from "../../store/loader";
import { useTodosContext } from "../../store/todos";
import FetchError from "../FetchError/FetchError";
import Todo from "./Todo";
import "./Todos.scss";

const Todos: FC = (): JSX.Element => {
  const { todos, setTodos } = useTodosContext();
  const { setLoading } = useLoaderContext();
  const [fetchError, setFetchError] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!todos.length) fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      await TodoService.getTodos().then(setTodos);
    } catch (err) {
      setFetchError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return <main className={!fetchError ? "todos__wrapper" : "error--wrapper"}>{!fetchError ? <Todo /> : <FetchError />}</main>;
};

export default Todos;
