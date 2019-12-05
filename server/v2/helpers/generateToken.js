import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { KEY } = process.env;
const generateToken = (email) => jwt.sign({ email },
  KEY);
export default generateToken;
