import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import { useDispatch } from "react-redux";
import { postLike } from "../actions/postActions";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const likePostHandler = () => {
    dispatch(postLike(post._id));
  };
  return (
    <div>
      <Card className="my-3 p-3 rounded each-post">
        <Card.Img src={post.thumbnail} alt={post.title} variant="top" />

        <Card.Body>
          <Card.Title>
            <strong>{post.title}</strong>
          </Card.Title>

          <Card.Text>{post.description}</Card.Text>
          <Card.Text>Uploaded {moment(post.createdAt).calendar()}</Card.Text>
          <Card.Text>By: {post.user.name}</Card.Text>
          <Card.Text>
            <i className="fas fa-thumbs-up btn" onClick={likePostHandler}></i>{" "}
            {post.likeCount}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Post;

//style={{ width: '75%' }}
