import express from 'express';
import redflagController from '../controllers/redflags.controller';
import  verifyToken from '../middlewares/token.middleware';
const router = express.Router();

router.get('/api/v1/redflags',verifyToken,redflagController.fetchAllRedFlags);
router.get('/api/v1/redflags/:id',verifyToken,redflagController.getSpecificRedflag);
router.post('/api/v1/redflags',verifyToken,redflagController.createRedflag);
router.patch('/api/v1/redflags/:id/location',verifyToken,redflagController.editLocation);
router.patch('/api/v1/redflags/:id/comment',verifyToken,redflagController.editComment);
router.delete('/api/v1/redflags/:id',verifyToken,redflagController.deleteRedflag);
export default router;