import express from 'express';
import redflagController from '../controllers/redflags.controller';
const router = express.Router();

router.get('/api/v1/redflags',redflagController.fetchAllRedFlags);
router.get('/api/v1/redflags/:id',redflagController.getSpecificRedflag);
router.post('/api/v1/redflags',redflagController.createRedflag);
router.patch('/api/v1/redflags/:id/location',redflagController.editLocation);
router.patch('/api/v1/redflags/:id/comment',redflagController.editComment);
export default router;