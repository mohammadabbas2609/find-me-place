import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useTypedSelector from "../hooks/useTypedSelector";
import { register } from "../state/actions/userAction";
import { useHistory } from "react-router";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();

  const { error, loading, user } = useTypedSelector(state => state.register);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <Container className="mt-5">
      {error && <Message variant="danger" message={error} />}
      {loading && <Loader />}
      <h3 className="mb-3 py-2 auth-heading">Register</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={event => setName(event.target.value)}
            value={name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={event => setEmail(event.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p className="mt-2">
        Already have an account ? <Link to="/login">Login</Link>
      </p>
    </Container>
  );
};

export default RegisterScreen;
