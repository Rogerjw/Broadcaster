import jwt from 'jsonwebtoken';
import { users } from '../models/data';

const verifyToken = (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return res.status(401).send({
      status: 401,
      message: 'Please sign in first.',
    });
  }

  try {
    const verified = jwt.verify(token, 'jwtPrivateKey');
    const validUser = users.find((user) => user.email === verified.email);
    if (!validUser) {
      return res.status(400).send({
        status: 400,
        message: 'Invalid token!'
      });
    }
    req.user = validUser;
    next();
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: error.message
    });
  }
  return 0;
};
export default verifyToken;