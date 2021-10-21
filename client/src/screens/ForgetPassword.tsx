import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import useTypedSelector from "../hooks/useTypedSelector";
import { forgotPassword } from "../state/actions/userAction";

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("");

  const dispatch = useDispatch();
  const { loading, error, message } = useTypedSelector(
    state => state.forgotPassword
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <Container className="mt-4">
      {loading && <Loader />}
      {message && <Message variant="info" message={message} />}
      {error && <Message variant="danger" message={error} />}
      <h3 className="mb-3 py-2 auth-heading">Forget password</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            onChange={event => setEmail(event.target.value)}
            value={email}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={loading ? true : false}
        >
          Send Reset Link
        </Button>
      </Form>
    </Container>
  );
};

export default ForgetPassword;
