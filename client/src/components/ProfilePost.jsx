import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { postDelete } from "../actions/postActions";

const ProfilePost = ({ post }) => {
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(postDelete(id));
    }
  };

  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <Card.Img src={post.thumbnail} alt={post.name} variant="top" />

        <Card.Body>
          <Card.Title>
            <strong>{post.title}</strong>
          </Card.Title>

          <Card.Text>{post.description}</Card.Text>
        </Card.Body>
      </Card>
      <Button
        variant="danger"
        className="btn-sm"
        onClick={() => deleteHandler(post._id)}
      >
        <i className="fas fa-trash"></i>
      </Button>
      <Link to={`/update/${post._id}`} className="btn btn-sm btn-dark">
        <i className="fas fa-edit"></i>
      </Link>
    </div>
  );
};

export default ProfilePost;
