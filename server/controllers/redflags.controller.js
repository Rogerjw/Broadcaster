
import { users } from '../models/data';
import Redflag from '../models/redflag.model';
import { redflags } from '../models/data';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken'

class RedflagsController{
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
         data: redflag
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
      users.find((user) => user.email === jwt.verify(req.header('token'),'jwtPrivateKey').email).id,
      req.body.title,
      req.body.type,
      req.body.location,
      req.body.status,
      req.body.images,
      req.body.videos,
      req.body.comment);
      redflags.push(redflag);
      return res.status(201).send({
      status: 201,
      data: {
        id: redflag.id,
        message: 'Created redflag record'
      },
      });
      }
      editLocation(req, res){
      const  user = users.find((user) => user.email === jwt.verify(req.header('token'),'jwtPrivateKey').email);
      if (user.type === 'citizen') {
      const redflag = redflags.find((item) => item.id.toString() === req.params.id);
      if (redflag) {
        if (redflag.status != 'draft') {
          return res.status(401).json({
            status: 401,
            data: {
              message: 'you are not allowed to edit a red-flag which is under-investigation'
            },
          });
        }

        redflag.location = req.body.location;
        return res.status(200).json({
          status: 200,
          data: {
            id: redflag.id,
            message: 'Updated red-flag record’s location',
          },
        });
      }
      return res.status(404).json({
        status: 404,
        data: {
          message: 'red-flag not found'
        },
      });
      }
      return res.status(401).json({
        status: 401,
        data: {
          message: 'you must be a citizen to edit the location'
        },
      });
    
      }
      editComment(req, res){
        const  user = users.find((user) => user.email === jwt.verify(req.header('token'),'jwtPrivateKey').email);
        if (user.type === 'citizen') {
        const redflag = redflags.find((item) => item.id.toString() === req.params.id);
        if (redflag) {
          if (redflag.status != 'draft') {
            return res.status(401).json({
              status: 401,
              data: {
                message: 'you are not allowed to edit a red-flag which is under-investigation'
              },
            });
          }
          redflag.title = req.body.title;
          redflag.type = req.body.type;
          redflag.comment = req.body.comment;
          redflag.location = req.body.location;
          return res.status(200).json({
            status: 200,
            data: {
              id: redflag.id,
              message: 'Updated red-flag record’s comment',
            },
          });
        }
        return res.status(404).json({
          status: 404,
          data: {
            message: 'red-flag not found'
          },
        });
        }
        return res.status(401).json({
          status: 401,
          data: {
            message: 'you must be a citizen to edit the comment'
          },
        });
      
      }
      deleteRedflag(req, res){
        const  user = users.find((user) => user.email === jwt.verify(req.header('token'),'jwtPrivateKey').email);
        if (user.type === 'citizen') {
        const redflag = redflags.find((item) => item.id.toString() === req.params.id);
        if (redflag) {
          if (redflag.status != 'draft') {
            return res.status(401).json({
              status: 401,
              data: {
                message: 'you are not allowed to delete a red-flag which is under-investigation'
              },
            });
          }
          redflags.splice(redflag,1);
          return res.status(200).json({
            status: 200,
            data: {
              id: redflag.id,
              message: 'red-flag record has been deleted',
              data: redflags
            },
          });
        }
        return res.status(404).json({
          status: 404,
          data: {
            message: 'red-flag not found'
          },
        });
        }
        return res.status(401).json({
          status: 401,
          data: {
            message: 'you must be a citizen to delete a redflag record'
          },
        });
    

      };
}
const redflagsController = new RedflagsController();
export default redflagsController;