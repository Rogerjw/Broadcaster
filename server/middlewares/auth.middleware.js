import { users } from '../models/data';

export const ifEmailExist = (req, res, next) => {
  const ExistingUser = users.find((user) => user.email === req.body.email);
  if (ExistingUser) {
    return res.status(409).send({
      status: 409,
      message: 'Email already exists',
    });
  }
  next();
};
