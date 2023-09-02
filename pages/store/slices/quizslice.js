import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchquizData = createAsyncThunk("fetchData", async () => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=15");
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();
    console.log("Received data:", data);
    return data;
    // Do something with the data
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Throw the error to trigger the rejected action
  }
});

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    loading: false,
    quiz: [],
    error: null,
  },
  extraReducers: {
    [fetchquizData.pending]: (state) => {
      state.loading = true;
    },
    [fetchquizData.fulfilled]: (state, action) => {
      state.loading = false;
      state.quiz = action.payload;
      console.log(action);
    },
    [fetchquizData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default quizSlice.reducer;
