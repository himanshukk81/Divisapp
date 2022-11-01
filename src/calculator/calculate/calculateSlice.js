import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: uuid(),
        text: action.payload,
      };


      return [...state, todo];
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;

      const todo = state.find((todo) => todo.id === id);
      todo.text = text;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = calculatorSlice.actions;

export default calculatorSlice.reducer;
