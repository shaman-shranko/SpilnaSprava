import { composeWithDevTools } from 'redux-devtools-extension';

import appReducer from './app.reducer';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
const rootReducer = combineReducers({

  app: appReducer,

})
const middleware = [thunk];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;