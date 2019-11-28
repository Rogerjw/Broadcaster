import User from '../models/user.model';
import { users } from '../models/data';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const KEY = process.env.KEY ;
class UsersController{ 
    createUser (req, res){
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
       const genToken = jwt.sign({ email: user.email},KEY);
       return res.status(201).send({
        status: 201,
        message: 'User created successfully',
        token:genToken,
         data: user
      });
    }
    loginUser(req,res){
          const genToken = jwt.sign({ email: req.body.email},KEY);
          return res.status(200).send({
            status: 200,
            message: 'User is successfully logged in',
            token: genToken,
            data: req.body.email
          });
      }
     
      
}
const usersController = new UsersController();
export default usersController;