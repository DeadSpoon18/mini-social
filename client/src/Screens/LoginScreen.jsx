import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = state;

  useEffect(() => {
    if (userInfo) {
      history.push("/home");
    }
  }, [userInfo, history]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="py-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Sign In
          </Button>
          {loading && <Loader />}
        </Form>
        <Row className="py-3">
          <Col>
            New User? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default LoginScreen;
