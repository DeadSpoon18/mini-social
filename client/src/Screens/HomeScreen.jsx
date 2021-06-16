import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listPosts } from "../actions/postActions";
import { getAllUsers } from "../actions/userActions";
import Loader from "../components/Loader";
import Post from "../components/Post";
import UserList from "../components/UserList";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const { posts, loading, error } = postList;

  const userList = useSelector((state) => state.userList);
  const { users, loading: userLoading } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userFollow = useSelector((state) => state.userFollow);
  const { success } = userFollow;

  const likePost = useSelector((state) => state.likePost);
  const { success: likeSuccess } = likePost;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(getAllUsers());
      dispatch(listPosts());
    }
    if (success) {
      alert("Followed");
    }
  }, [dispatch, userInfo, history, success, likeSuccess]);

  return (
    <div>
      <h1>Latest Posts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <div className="sidebar">
            {posts.length === 0 && <h6 className="follow-post-heading">Follow people to see post</h6>}
            <div className="main">
              {posts.map((post) => {
                return <Post post={post} key={post._id}/>;
              })}
            </div>
            <div className="userList">
              <h2>Follow To See Post</h2>
              {!userLoading &&
                users &&
                users.map((user) => {
                  return <UserList user={user} key={user._id}/>;
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
