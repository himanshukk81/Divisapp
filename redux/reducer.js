import * as Types from './types';


export const isLoading = (state = false, action) => {
  switch (action.type) {
    case Types.SET_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export const isSuccess = (state = false, action) => {
  switch (action.type) {
    case Types.IS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

