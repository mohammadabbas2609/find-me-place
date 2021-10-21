import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import Message from "../components/Message";
import useTypedSelector from "../hooks/useTypedSelector";
import { resetPassword } from "../state/actions/userAction";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const { resetToken } = useParams<{ resetToken: string }>();

  const { loading, error, message } = useTypedSelector(
    state => state.resetPassword
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(resetPassword(password, resetToken));
  };

  return (
    <Container className="mt-4">
      {loading && <Loader />}
      {message && <Message variant="info" message={message} />}
      {error && <Message variant="danger" message={error} />}
      <h3 className="mb-3 py-2 auth-heading">Reset password</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter your new password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={loading ? true : false}
        >
          Reset Password
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPasswordScreen;
