import { combineReducers } from 'redux';
import { chartDataReducer } from "./chartDataReducer";
import { storageReducer } from "./storageReducer";

const rootReducer = combineReducers({
  chartDataReducer,
  storageReducer,
});

export default rootReducer;