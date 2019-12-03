import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const KEY = process.env.KEY ;
class UsersController{ 
     async createUser(req, res){
        const user = new User(
          req.body.id,
          req.body.firstname,
          req.body.lastname,
          req.body.email,
          req.body.password,
          req.body.PhoneNumber,
          req.body.username
        );
      const addedUser = await User.addUser(user);
       const genToken = jwt.sign({ email: user.email},KEY);
       return res.status(201).json({
        status: 201,
        message: 'User created successfully',
        token:genToken,
         data: user
      });
    }
    loginUser(req,res){
          const genToken = jwt.sign({ email: req.body.email},KEY);
          return res.status(200).json({
            status: 200,
            message: 'User is successfully logged in',
            token: genToken,
            data: req.body.email
          });
      }
     
      
}
const usersController = new UsersController();
export default usersController;