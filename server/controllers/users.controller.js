import User from '../models/user.model';
import { users } from '../models/data';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';

class UsersController{
   
    createUser (req, res){
      const schema =  Joi.object({
        id: Joi.number().min(16).required(),
        firstname: Joi.string().min(4).required(),
        lastname: Joi.string().min(4).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(3).required(),
        PhoneNumber: Joi.number().min(10).required(),
        username: Joi.string().min(3).required()
        });
        const result = schema.validate(req.body);
        if(result.error){
          res.status(400).send(result.error.details[0].message);
          return;
        }
        const user = new User(
          req.body.id,
          req.body.firstname,
          req.body.lastname,
          req.body.email,
          req.body.password,
          req.body.PhoneNumber,
          req.body.username
        );
       users.push(user);
       const genToken = jwt.sign({ email: user.email},'jwtPrivateKey');
       return res.status(201).send({
        status: 201,
        message: 'User created successfully',
        token:genToken,
         data: {
          id : user.id,
          firstname : user.firstname,
          lastname : user.lastname,
          email : user.email,
          password : user.password,
          PhoneNumber : user.PhoneNumber,
          username : user.username,
        }
       })
      };
}
const usersController = new UsersController();
export default usersController;