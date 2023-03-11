import {applyMiddleware, combineReducers, createStore} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

import DateReducer from '../Reducer/DateReducer/DateReducer';
import {persistStore, persistReducer} from 'redux-persist';

const rootreducer = combineReducers({
  dateDetails: DateReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(
  persistConfig,
  rootreducer,
  applyMiddleware(),
);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return {store, persistor};
};
