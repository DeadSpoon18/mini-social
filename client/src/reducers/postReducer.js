import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_RESET,
  CREATE_POST_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_RESET,
  POST_DETAILS_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_MY_FAIL,
  POST_LIST_MY_REQUEST,
  POST_LIST_MY_RESET,
  POST_LIST_MY_SUCCESS,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_RESET,
  POST_UPDATE_SUCCESS,
} from "../constants/postConstants";

export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true };
    case CREATE_POST_SUCCESS:
      return { loading: false, success: true, newPost: action.payload };
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true };
    case POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listMyPostsReducer = (state = { myPosts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case POST_LIST_MY_SUCCESS:
      return {
        loading: false,
        myPosts: action.payload,
      };
    case POST_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case POST_LIST_MY_RESET:
      return { myPosts: [] };
    default:
      return state;
  }
};

export const postUpdateReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_UPDATE_REQUEST:
      return { loading: true };
    case POST_UPDATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_UPDATE_RESET:
      return { post: {} };
    default:
      return state;
  }
};

export const postDetailReducer = (
  state = { postDetailed: {} },
  action
) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { loading: true, ...state };
    case POST_DETAILS_SUCCESS:
      return { loading: false, postDetailed: action.payload };
    case POST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case POST_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIKE_REQUEST:
      return { loading: true };
    case POST_LIKE_SUCCESS:
      return { loading: false, success: true };
    case POST_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};