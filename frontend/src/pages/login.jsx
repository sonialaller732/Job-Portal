import React, { useState } from "react";
import axios from "axios";

import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../component/header";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/login",
        formData
      );

      // Save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      // Decode token payload
      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
      localStorage.setItem("type", payload.type);

      // Redirect based on role
      if (payload.type === "Employer") {
        navigate("/joblist");
      } else {
        navigate("/userjoblist");
      }
    } catch (err) {
      setMessage("Invalid Credentials");
    }
  };

  return (
    <Container>
      <Header />

      <Row className="justify-content-center mt-5">
        <Col md={4}>
          <Card
            style={{
              borderRadius: "15px",
              background: "linear-gradient(180deg, orange, lightblue)",
              color: "white",
            }}
            className="p-4 shadow-lg"
          >
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
              </Form.Group>

              <p style={{ color: "white" }}>{message}</p>

              <a href="/signup" style={{ color: "white", fontWeight: "bold" }}>
                Signup
              </a>
              <br /> <br />

              <Button variant="primary" type="submit">
                LOGIN
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
