import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userFollowReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducer";
import {
  createPostReducer,
  listMyPostsReducer,
  postDeleteReducer,
  postDetailReducer,
  postLikeReducer,
  postListReducer,
  postUpdateReducer,
} from "./reducers/postReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  createPost: createPostReducer,
  postList: postListReducer,
  userList: userListReducer,
  userFollow: userFollowReducer,
  myPostsList: listMyPostsReducer,
  postUpdate: postUpdateReducer,
  postDetails: postDetailReducer,
  postDelete: postDeleteReducer,
  likePost: postLikeReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
