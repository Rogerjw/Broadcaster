

import Redflag from '../models/redflag.model';
import { redflags } from '../models/data';

import dotenv from 'dotenv';

dotenv.config();
const KEY = process.env.KEY ;
class RedflagsController{
  
      fetchAllRedFlags(req, res){
        return res.status(200).json({
        status: 200,
        data: redflags,
        });
      }
      getSpecificRedflag(req, res){
        return res.status(200).json({
          status: 200,
         data: req.redflag
        });  
      }
      async createRedflag(req,res){   
      const redflag = new Redflag(
      1,
      req.body.createdBy,
      req.user.id,
      req.body.title,
      req.body.type,
      req.body.location,
      req.body.status,
      req.body.images,
      req.body.videos,
      req.body.comment);
      const addedRedflag = await Redflag.addRedflag(redflag).rows[0];
      return res.status(201).json({
      status: 201,
      data: {
        id: addedRedflag.id,
        message: 'Created redflag record'
      },
      });
      }
      editLocation(req, res){
        req.redflag.location = req.body.location;
        return res.status(200).json({
          status: 200,
          data: {
            id: req.redflag.id,
            message: 'Updated red-flag record’s location',
          },
        });
      
      }
      editComment(req, res){
        req.redflag.title = req.body.title;
        req.redflag.type = req.body.type;
        req.redflag.comment = req.body.comment;
        req.redflag.location = req.body.location;
          return res.status(200).json({
            status: 200,
            data: {
              id: req.redflag.id,
              message: 'Updated red-flag record’s comment',
            },
          });
      }
      deleteRedflag(req, res){
        redflags.splice(req.redflag.id-1,1);
          return res.status(200).json({
            status: 200,
            data: {
              id: req.redflag.id,
              message: 'red-flag record has been deleted',
            },
          });
      };
}
const redflagsController = new RedflagsController();
export default redflagsController;