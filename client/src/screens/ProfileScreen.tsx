import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import useTypedSelector from "../hooks/useTypedSelector";
import { getProfile, updateProfile } from "../state/actions/userAction";
import { Image } from "cloudinary-react";
import useConvertFile from "../hooks/useConvertFile";

const ProfileScreen = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setFile, fileAsData } = useConvertFile();
  const dispatch = useDispatch();

  const { user, error, loading } = useTypedSelector(state => state.getProfile);
  const {
    user: updatedUser,
    error: updatedError,
    loading: updatedLoading,
  } = useTypedSelector(state => state.updateProfile);
  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    } else if (user) {
      setName(user.name);
      setEmail(user.email);
    } else if (updatedUser) {
      setName(updatedUser.name);
      setEmail(updatedUser.email);
    }
  }, [user, dispatch, updatedUser]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fileAsData && password) {
      dispatch(updateProfile(name, email, password, fileAsData));
    } else if (fileAsData && password === "") {
      dispatch(updateProfile(name, email, undefined, fileAsData));
    } else if (password && fileAsData === null) {
      dispatch(updateProfile(name, email, password, undefined));
    } else if (password === "" && fileAsData === null) {
      dispatch(updateProfile(name, email, undefined, undefined));
    }
  };

  const handleChange = (event: any) => {
    if (fileAsData) {
      setFile(null);
    }
    setFile(event.target.files[0]);
  };

  return (
    <Container>
      <Row className="my-5">
        <Col lg={4} md={5} sm={6} xs={12}>
          {loading || (updatedLoading && <Loader />)}
          {error && <Message variant="danger" message={error} />}
          {updatedError && <Message variant="danger" message={updatedError} />}
          <h3 className="text-center">Profile</h3>
          {user && user.photo && (
            <Image
              publicId={user.photo}
              cloudName="abbas-cloud-space"
              secure
              className="profile-photo"
              crop="scale"
            />
          )}
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
            <Form.Group className="mb-3" controlId="formBasicFile">
              <Form.Label>Upload profile photo</Form.Label>
              <Form.Control type="file" onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Change Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                onChange={event => setPassword(event.target.value)}
                value={password}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>
        </Col>
        <Col lg={8} md={7} sm={6} xs={12}>
          <h3 className="text-center">My Houses</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
