import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useTypedSelector from "../hooks/useTypedSelector";
import { login } from "../state/actions/userAction";
import { useHistory } from "react-router";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();

  const { error, loading, user } = useTypedSelector(state => state.loginUser);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container className="mt-5">
      {error && <Message variant="danger" message={error} />}
      {loading && <Loader />}
      <h3 className="mb-3 py-2 auth-heading">Login</h3>
      <Form onSubmit={handleSubmit}>
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
        Dont have an account ? <Link to="/register">Register</Link>
      </p>
      <p>
        Forgot Password ? <Link to="/forgotpassword">Reset password</Link>
      </p>
    </Container>
  );
};

export default LoginScreen;
