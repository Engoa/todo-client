import { combineReducers, createStore } from "redux";
import { todosReducer } from "./TodosState";

const reducers = combineReducers({
  todosState: todosReducer,
  // userState: userReducer,
});

const store = createStore(reducers);

// The actual store, here we can use the store to dispatch actions

export default store;

// To use Redux store in the component, we need to import the store and the reducer
// store.dispatch(fetchAllTodos(res));
// console.log(store.getState().todosState.todos);
