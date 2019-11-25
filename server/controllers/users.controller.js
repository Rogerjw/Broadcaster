import User from '../models/user.model';
import { users } from '../models/data';
import jwt from 'jsonwebtoken';

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
          username : user.username
        }
       })
      };
    loginUser(req,res){
          const genToken = jwt.sign({ email: req.body.email},'jwtPrivateKey');
          return res.status(200).send({
            status: 200,
            message: 'User is successfully logged in',
            token: genToken,
            data: {
              id : req.body.id,
              firstname : req.body.firstname,
              lastname : req.body.lastname,
              email : req.body.email,
              PhoneNumber : req.body.PhoneNumber,
              username : req.body.username,
            },
          });
      }
     
      
}
const usersController = new UsersController();
export default usersController;