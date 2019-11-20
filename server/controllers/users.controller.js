import User from '../models/user.model';
import { users } from '../models/data';
import Redflag from '../models/redflag.model';
import { redflags } from '../models/data';
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
      loginUser(req,res){
        const schema =  Joi.object({
          email: Joi.string().min(6).required().email(),
          password: Joi.string().min(5).required()
        });
        const result = schema.validate(req.body);
        if(result.error){
          res.status(400).send(result.error.details[0].message);
          return;
        }
        const loggedUser = users.find((user) => user.email === req.body.email);
        const isPasswordCorrect=()=>{
          if(req.body.password === loggedUser.password) return true;
        }
        if (loggedUser && isPasswordCorrect()) {
          const genToken = jwt.sign({ email: loggedUser.email},'jwtPrivateKey');
          return res.status(200).send({
            status: 200,
            message: 'User is successfully logged in',
            token: genToken,
            data: {
              id : loggedUser.id,
              firstname : loggedUser.firstname,
              lastname : loggedUser.lastname,
              email : loggedUser.email,
              PhoneNumber : loggedUser.PhoneNumber,
              username : loggedUser.username,
            },
          });
        }
        return res.status(404).send({
          status: 404,
          message: 'incorrect email or password',
        });
      }
      fetchAllRedFlags(req,res){
        return res.status(200).send({
        status: 200,
        data: redflags,
        });
      }
      getSpecificRedflag(req, res){
        const redflag = redflags.find((item) => item.id.toString() === req.params.id);
        if (!redflag) {
          return res.status(404).send({
            success: 404,
            message: 'The red-flag does not exist, please check well the entered id',
          });
        }
        return res.status(200).send({
          status: 200,
         data: redflags,
        });
      }
      createRedflag(req,res){
        const schema =  Joi.object({
          title: Joi.string().min(4).required(),
          type: Joi.string().min(4).required(),
          comment: Joi.string().min(10).required(),
          location: Joi.string().min(10).required(),
          status: Joi.string().min(3).required(),
          images: Joi.array().required(),
          videos: Joi.array().required()
          });
          const result = schema.validate(req.body);
          if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
          }
    const redflag = new Redflag(
      redflags.length + 1,
      req.body.createdOn,
      users.find((user) => user.email === 'rogermuhire@gmail.com').id,
      req.body.title,
      req.body.type,
      req.body.location,
      req.body.status,
      req.body.images,
      req.body.videos,
      req.body.comment,
    );
    redflags.push(redflag);
    return res.status(201).send({
      status: 201,
      data: {
        id: redflag.id,
        message: 'Created redflag record'
      },
    });
  }
      
}
const usersController = new UsersController();
export default usersController;