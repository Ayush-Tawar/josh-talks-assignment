import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import quizslice from "./slices/quizslice";

// config the store
const makeStore = () =>
  configureStore({
    reducer: {
      quiz: quizslice,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
