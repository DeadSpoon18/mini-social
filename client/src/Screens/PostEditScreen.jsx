import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import FormContainer from "../components/FormContainer";
import { Form, Button, Alert } from "react-bootstrap";
import { listPostDetails, updatePost } from "../actions/postActions";
import Loader from "../components/Loader";
import {
  POST_UPDATE_RESET,
} from "../constants/postConstants";

const PostEditScreen = ({ history, match }) => {
  const postId = match.params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [uploading, setUploading] = useState(false);

  const postDetails = useSelector((state) => state.postDetails);
  const { postDetailed, loading, error } = postDetails;

  const postUpdate = useSelector((state) => state.postUpdate);
  const { loading: updateLoading, error: updateError, success } = postUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch({ type: POST_UPDATE_RESET });
      history.push("/profile");
    } else
    if (!postDetailed.title || postDetailed._id !== postId) {
      dispatch(listPostDetails(postId));
    } else {
      setTitle(postDetailed.title);
      setDescription(postDetailed.description);
      setThumbnail(postDetailed.thumbnail);
    }
  }, [dispatch, postId, postDetailed, success, history]);

  //thumbnail upload
  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post("/api/upload", formData, config);
      setThumbnail(res.data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(postId, { title, description, thumbnail }));
  };

  return (
    <div>
      <FormContainer>
        <h1>Update Post</h1>
        {updateLoading && <Loader />}
        {updateError && <Alert variant="danger">{updateError}</Alert>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Alert>{error}</Alert>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.File
                id="image-file"
                label={thumbnail}
                custom
                onChange={uploadImageHandler}
              ></Form.File>
            </Form.Group>
            <Button type="submit" variant="primary">
              Post
            </Button>
            {uploading && <Loader />}
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default PostEditScreen;
