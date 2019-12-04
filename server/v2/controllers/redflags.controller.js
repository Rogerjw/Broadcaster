
import Redflag from '../models/redflag.model';
import dotenv from 'dotenv';

dotenv.config();
class RedflagsController{

      async fetchAllRedFlags(req, res){
        try{
          const redflagsDb = await Redflag.getAllRedflag();
        return res.status(200).json({
        status: 200,
        data: redflagsDb.rows,
        });
        }catch(error){
          return res.status(400).json(error.message);
        }
        
      }
     async getSpecificRedflag(req, res){
        return res.status(200).json({
          status: 200,
         data: req.redflag
        });  
      }
      async createRedflag(req,res){   
        try{
          const redflag = new Redflag(
            req.body.id,
            '12/12/12',
            req.user.id,
            req.body.title,
            req.body.type,
            req.body.location,
            req.body.status,
            req.body.images,
            req.body.videos,
            req.body.comment);
            const redflagDb = await Redflag.addRedflag(redflag);
            return res.status(201).json({
            status: 201,
            data: {
              id: redflag.id,
              message: 'Created redflag record'
            },
            });
        }catch(error){
          return res.status(400).json(error.message);
        }
      
      }
      async editLocation(req, res){
        try{
          const redflagloc = await Redflag.editOneLocation(req.body.location,req.redflag.id);
          return res.status(200).json({
            status: 200,
            data: {
              id: req.redflag.id,
              message: 'Updated red-flag record’s location',
            },
          });
        }catch(error){
          return res.status(400).json(error.message);
        }
        
      
      }
      async editComment(req, res){
        const redflagCom = await Redflag.editOneComment(req.body.comment,req.redflag.id);
          return res.status(200).json({
            status: 200,
            data: {
              id: req.redflag.id,
              message: 'Updated red-flag record’s comment',
            },
          });
      }
      async deleteRedflag(req, res){
        try{
          const redflagdel = await Redflag.deleteOneRedflag(req.redflag.id);
          return res.status(200).json({
            status: 200,
            data: {
              id: req.redflag.id,
              message: 'red-flag record has been deleted',
            },
          });
        }catch(error){
          return res.status(400).json(error.message);
        }
          
      };
}
const redflagsController = new RedflagsController();
export default redflagsController;