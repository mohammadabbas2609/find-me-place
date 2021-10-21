import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducers } from "./reducers";
import { __FIND_ME_A_PLACE_USER } from "./constants/localStorage";

type userFromLocal = {
  name: string;
  email: string;
  _id: string;
};

const userPresent = localStorage.getItem(__FIND_ME_A_PLACE_USER);
const user: userFromLocal = userPresent ? JSON.parse(userPresent) : null;

const initialState = {
  loginUser: {
    loading: false,
    error: null,
    user: user,
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
