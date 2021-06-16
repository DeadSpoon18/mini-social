import React, { useEffect } from "react";
import Loader from "../components/Loader";
import { Alert, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listMyPosts } from "../actions/postActions";
import ProfilePost from "../components/ProfilePost";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const myPostsList = useSelector((state) => state.myPostsList);
  const { myPosts, loading, error } = myPostsList;

  const postDelete = useSelector((state) => state.postDelete);
  const { success, loading: loadingDelete, error: errorDelete } = postDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(listMyPosts());
    }
  }, [dispatch, history, userInfo, success]);
  return (
    <div>
      <div>
        <h1>My Posts</h1>
        {errorDelete && <Alert variant="danger">{errorDelete}</Alert>}
        {loadingDelete && <Loader />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            {myPosts.length === 0 && <h6>No post added</h6>}
            <Row>
              {myPosts.map((post) => {
                return (
                  <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
                    <ProfilePost post={post} />
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
