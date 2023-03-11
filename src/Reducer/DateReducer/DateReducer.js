import {template} from '@babel/core';
import date_types from './date_types';
const initialState = {
  items: [],
};
const DateReducer = (state = initialState, action) => {
  switch (action.type) {
    case date_types.ADDITEMS:
      return {
        ...state,
        items: state.items.concat(action.myObj),
      };

    default:
      return state;
  }
};

export default DateReducer;
