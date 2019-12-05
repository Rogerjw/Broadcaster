
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import generateToken from '../helpers/generateToken';

dotenv.config();
class UsersController {
  async createUser(req, res) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new User(
      '',
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      password,
      req.body.PhoneNumber,
      req.body.username,
    );

    const userDb = await User.addUser(user);
    const addedUser = userDb.rows[0];
    const genToken = generateToken(addedUser.email);
    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      token: genToken,
      data: addedUser,
    });
  }

  loginUser(req, res) {
    const genToken = generateToken(req.body.email);
    return res.status(200).json({
      status: 200,
      message: 'User is successfully logged in',
      token: genToken,
      data: req.body.email,
    });
  }
}
export default new UsersController();
