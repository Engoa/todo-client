import { ITodo } from "../types/Todo";
import { ApiService } from "./api.service";

export class TodoService {
  static api = ApiService("");

  static getTodos(): Promise<ITodo[]> {
    return this.api.get("/todos").then((res) => res.data);
  }
  static addTodo(todo: ITodo): Promise<ITodo> {
    return this.api.post("/todos", todo).then((res) => res.data);
  }
  static deleteTodo(id: ITodo["_id"]): Promise<ITodo> {
    return this.api.delete(`/todos/${id}`).then((res) => res.data);
  }
  static updateTodo(id: ITodo["_id"], todo: Partial<ITodo>): Promise<ITodo> {
    return this.api.patch(`/todos/${id}`, todo).then((res) => res.data);
  }
  static updateAllTodos(todo: Partial<ITodo>): Promise<ITodo> {
    return this.api.patch(`/todos`, todo).then((res) => res.data);
  }
}
