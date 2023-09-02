import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import quizSlice from "./slices/quizslice";

// config the store
const makeStore = () =>
  configureStore({
    reducer: {
      quiz: quizSlice,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
