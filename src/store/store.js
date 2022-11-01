import { configureStore } from '@reduxjs/toolkit';
import { calculatorSlice } from '../calculator/calculate/calculateSlice';

export default configureStore({
  reducer: {
    calculator:calculatorSlice,
  },
});