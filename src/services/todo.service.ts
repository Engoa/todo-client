import { ITodo } from "../types/Todo";
import { ApiService } from "./api.service";

export class TodoService {
  static api = ApiService("");

  static getTodos(): Promise<ITodo> {
    return this.api.get("/todos").then((res) => res.data);
  }
  static addTodo(todo: ITodo): Promise<ITodo> {
    return this.api.post("/todos", todo).then((res) => res.data);
  }
  static deleteTodo(id: ITodo): Promise<ITodo> {
    return this.api.delete(`/todos/${id}`).then((res) => res.data);
  }
  static updateTodo(id: ITodo): Promise<ITodo> {
    return this.api.patch("/todos", id).then((res) => res.data);
  }
}
