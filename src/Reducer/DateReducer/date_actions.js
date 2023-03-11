import date_types from './date_types';

export const addItems = myObj => ({
  type: date_types.ADDITEMS,
  myObj,
});
