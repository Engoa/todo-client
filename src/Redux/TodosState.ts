import { ITodo } from "../types/Todo";

// The state of the todos
export class TodosState {
  todos: ITodo[] = [];
}

// Enum for the different types of actions - Enums cannot be changed ever!
export enum TodosActionTypes {
  FETCH_TODOS = "FETCH_TODOS",
  ADD_TODO = "ADD_TODO",
  REMOVE_TODO = "REMOVE_TODO",
  TOGGLE_TODO = "TOGGLE_TODO",
}

// todos actions to set the state during 'dispatch'
export interface TodosActions {
  type: TodosActionTypes;
  payload: any;
}

// Action Creator - not a must, but saves time and errors
export const fetchAllTodos = (todos: ITodo[]): TodosActions => ({
  type: TodosActionTypes.FETCH_TODOS,
  payload: todos,
});

export const addTodo = (todos: ITodo[]): TodosActions => ({
  type: TodosActionTypes.ADD_TODO,
  payload: todos,
});

export const removeTodo = (todos: ITodo[]): TodosActions => ({
  type: TodosActionTypes.REMOVE_TODO,
  payload: todos,
});

export const toggleTodo = (todos: ITodo[]): TodosActions => ({
  type: TodosActionTypes.TOGGLE_TODO,
  payload: todos,
});

// The Reducer - the reducer is a function that takes the previous state and an action, and returns the next state
// At first, the class isn't an object, we need to turn it into an object but giving the Reducer a default value by calling the class (new TodosState())
// Reducer is a pure function, we CANNOT change the original STATE, so we copy it via rest ... and return the new state
export const todosReducer = (currentState = new TodosState(), action: TodosActions): TodosState => {
  const newState = { ...currentState };

  switch (action.type) {
    case TodosActionTypes.FETCH_TODOS:
      newState.todos = action.payload;
      break;

    case TodosActionTypes.ADD_TODO:
      newState.todos.push(action.payload);
      break;

    case TodosActionTypes.REMOVE_TODO:
      const indexToRemove = newState.todos.findIndex((todo) => todo._id === action.payload._id);
      newState.todos.splice(indexToRemove, 1);
      break;

    case TodosActionTypes.TOGGLE_TODO:
      const todoToUpdate = newState.todos.find((todo) => todo._id === action.payload._id);
      todoToUpdate.completed = !todoToUpdate.completed;
      break;

    default:
      return currentState;
  }

  return newState;
};

// To use Redux store in the component, we need to import the store and the reducer
// store.dispatch(fetchAllTodos(res));
// console.log(store.getState().todosState.todos);
