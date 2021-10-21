import jwt from "jsonwebtoken";

const generateToken = (userId, email) => {
  const token = jwt.sign({ user: userId, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export default generateToken;
