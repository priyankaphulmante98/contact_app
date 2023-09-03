import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";

import { contactreducer } from "./contact/contact.reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  contact: contactreducer,
});

const createComposer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk))
);
