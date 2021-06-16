import axios from "axios";
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_MY_FAIL,
  POST_LIST_MY_REQUEST,
  POST_LIST_MY_SUCCESS,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
} from "../constants/postConstants";

export const createNewPost =
  (title, description, thumbnail) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_POST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const res = await axios.post(
        "/api/post",
        { title, description, thumbnail },
        config
      );
      dispatch({ type: CREATE_POST_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: CREATE_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(`/api/post`, config);
    dispatch({ type: POST_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIST_MY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get("/api/post/myPosts", config);
    dispatch({ type: POST_LIST_MY_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePost =
  (productId, post) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_UPDATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const res = await axios.put(`/api/post/${productId}`, post, config);
      dispatch({ type: POST_UPDATE_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: POST_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listPostDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(`/api/post/${id}`, config);
    dispatch({ type: POST_DETAILS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const postDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/post/${id}`, config);
    dispatch({ type: POST_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postLike = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIKE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`/api/post/${id}/likePost`, config);
    dispatch({ type: POST_LIKE_SUCCESS });
  } catch (error) {
    dispatch({
      type: POST_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};