import express from 'express';
import redflagController from '../controllers/redflags.controller';
import   { verifyToken } from '../middlewares/authentication.middleware';
import { findRedflag } from '../middlewares/authentication.middleware';
import { validateRedflagRequest } from '../middlewares/authentication.middleware';
import   { findUserType } from '../middlewares/authentication.middleware';
import { ValidateRedflagChange } from '../middlewares/authentication.middleware';
import errorHandler from '../helpers/errorHandler.helpers';
const router = express.Router();

router.get('/api/v2/redflags',verifyToken,redflagController.fetchAllRedFlags);
router.get('/api/v2/redflags/:id',verifyToken,findRedflag,redflagController.getSpecificRedflag);
router.post('/api/v2/redflags',verifyToken,findUserType,validateRedflagRequest,redflagController.createRedflag);
router.patch('/api/v2/redflags/:id/location',verifyToken,findUserType,findRedflag,ValidateRedflagChange,redflagController.editLocation);
router.patch('/api/v2/redflags/:id/comment',verifyToken,findUserType,findRedflag,ValidateRedflagChange,redflagController.editComment);
router.delete('/api/v2/redflags/:id',verifyToken,findUserType,findRedflag,ValidateRedflagChange,redflagController.deleteRedflag);
export default router;