import { combineReducers } from "redux";
import { userReducer, itemReducer } from "./reducers";

const reducers = combineReducers({
  user: userReducer,
  nft: itemReducer,
});

export default reducers;
