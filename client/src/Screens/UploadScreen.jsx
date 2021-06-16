import React, { useState, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { createNewPost } from "../actions/postActions";
import { CREATE_POST_RESET } from "../constants/postConstants";

const UploadScreen = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [uploading, setUploading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createPost = useSelector((state) => state.createPost);
  const { loading, success, error } = createPost;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
    if (success) {
      dispatch({ type: CREATE_POST_RESET });
      history.push("/home");
    }
  }, [history, userInfo, success, dispatch]);

  //thumbnail upload
  const uploadImageHandler = async (e) => {
    const file = e.target.files[0]; // e.target.files gives an array of uploaded files as we can upload multiple files but we are uploading only single so
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
      setThumbnail(res.data); // data coming back is the file path
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNewPost(title, description, thumbnail));
  };

  return (
    <div>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <h1>New Post</h1>
          {error && <Alert>{error}</Alert>}
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
          {loading && <Loader />}
        </Form>
      </FormContainer>
    </div>
  );
};

export default UploadScreen;
