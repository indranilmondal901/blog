import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { AuthReducer } from "./Reducer/authReducer";
import { BlogReducer } from "./Reducer/blogReducer";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Blog: BlogReducer
});

const store = configureStore({ reducer: rootReducer });
export default store;