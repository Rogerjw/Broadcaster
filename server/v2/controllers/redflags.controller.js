
import Redflag from '../models/redflag.model';
import dotenv from 'dotenv';

dotenv.config();
class RedflagsController{

      async fetchAllRedFlags(req, res){
        const redflagsDb = await Redflag.getAllRedflag();
        return res.status(200).json({
        status: 200,
        data: redflagsDb.rows,
        });
        
      }
     async getSpecificRedflag(req, res){
        return res.status(200).json({
          status: 200,
         data: req.redflag
        });  
      }
      async createRedflag(req,res){   
          const redflag = new Redflag(
            '',
            new Date(),
            req.user.id,
            req.body.title,
            req.body.type,
            req.body.location,
            req.body.status,
            req.body.images,
            req.body.videos,
            req.body.comment);
            const redflagDb = await Redflag.addRedflag(redflag);
            const addedredflag = redflagDb.rows[0];
            return res.status(201).json({
            status: 201,
            data: {
              id: addedredflag.id,
              message: 'Created redflag record'
            },
            });
      }
      async editLocation(req, res){
        
          const redflagloc = await Redflag.editOneLocation(req.body.location,req.redflag.id);
          const edittedRedflag = redflagloc.rows[0];
          return res.status(200).json({
            status: 200,
            data: {
              id: edittedRedflag.id,
              message: 'Updated red-flag record’s location',
            },
          });
        
      }
      async editComment(req, res){
        const redflagCom = await Redflag.editOneComment(req.body.comment,req.redflag.id);
          return res.status(200).json({
            status: 200,
            data: {
              id: redflagCom.rows[0].id,
              message: 'Updated red-flag record’s comment',
            },
          });
      }
      async deleteRedflag(req, res){
        
          const redflagdel = await Redflag.deleteOneRedflag(req.redflag.id);
          return res.status(200).json({
            status: 200,
            data: {
              id: redflagdel.rows[0].id,
              message: 'red-flag record has been deleted',
            },
          });
         
      };
}
export default new RedflagsController();