import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import authService from "./services/authService";
import blogService from "./services/blogService";
import categoryService from "./services/categoryService";

export const store = configureStore({
  reducer: {
    authReducer,

    [authService.reducerPath]: authService.reducer,
    [blogService.reducerPath]: blogService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authService.middleware)
      .concat(blogService.middleware)
      .concat(categoryService.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
