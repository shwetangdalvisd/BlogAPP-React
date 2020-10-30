import { createStore, applyMiddleware } from "redux";
// import api from '../middleware/api'
import { composeWithDevTools } from 'redux-devtools-extension';
import authreducer from "./authreducer";

const configureStore = () => {
  const store = createStore(
    authreducer,
    composeWithDevTools(applyMiddleware())
  );

  return store;
};

export default configureStore()