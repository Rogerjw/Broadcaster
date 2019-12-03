import express from 'express';
import redflagController from '../controllers/redflags.controller';
import   { verifyToken } from '../middlewares/authentication.middleware';
import { findRedflag } from '../middlewares/authentication.middleware';
import { validateRedflagRequest } from '../middlewares/authentication.middleware';
import   { findUserType } from '../middlewares/authentication.middleware';
import { ValidateRedflagChange } from '../middlewares/authentication.middleware';
import errorHandler from '../helpers/errorHandler.helpers';
const router = express.Router();

router.get('/api/v2/redflags',verifyToken,errorHandler,redflagController.fetchAllRedFlags);
router.get('/api/v2/redflags/:id',verifyToken,findRedflag,errorHandler,redflagController.getSpecificRedflag);
router.post('/api/v2/redflags',verifyToken,findUserType,validateRedflagRequest,errorHandler,errorHandler,redflagController.createRedflag);
router.patch('/api/v2/redflags/:id/location',verifyToken,findUserType,findRedflag,ValidateRedflagChange,errorHandler,redflagController.editLocation);
router.patch('/api/v2/redflags/:id/comment',verifyToken,findUserType,findRedflag,ValidateRedflagChange,errorHandler,redflagController.editComment);
router.delete('/api/v2/redflags/:id',verifyToken,findUserType,findRedflag,ValidateRedflagChange,errorHandler,redflagController.deleteRedflag);
export default router;