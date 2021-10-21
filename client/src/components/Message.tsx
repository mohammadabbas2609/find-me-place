import { Alert } from "react-bootstrap";

interface AlertProps {
  variant: string;
  message: string;
}

const Message: React.FC<AlertProps> = ({ variant, message }) => {
  return <Alert variant={variant}>{message}</Alert>;
};

export default Message;
