import React from 'react';
import store from "./reducers"
import { Provider } from 'react-redux';
import MainScreen from './screens/main.screen';

const App = () => {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};

export default App;
