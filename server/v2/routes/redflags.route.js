import express from 'express';
import redflagController from '../controllers/redflags.controller';
import {
  verifyToken, findRedflag, validateRedflagRequest, findUserType, ValidateRedflagChange,
} from '../middlewares/authentication.middleware';


import errorhandler from '../helpers/errorhandler';

const router = express.Router();
router.get('/api/v2/redflags', errorhandler(verifyToken), errorhandler(redflagController.fetchAllRedFlags));
router.get('/api/v2/redflags/:id', errorhandler(verifyToken), errorhandler(findRedflag), errorhandler(redflagController.getSpecificRedflag));
router.post('/api/v2/redflags', errorhandler(verifyToken), errorhandler(findUserType), validateRedflagRequest, errorhandler(redflagController.createRedflag));
router.patch('/api/v2/redflags/:id/location', errorhandler(verifyToken), errorhandler(findUserType), errorhandler(findRedflag), ValidateRedflagChange, errorhandler(redflagController.editLocation));
router.patch('/api/v2/redflags/:id/comment', errorhandler(verifyToken), errorhandler(findUserType), errorhandler(findRedflag), ValidateRedflagChange, errorhandler(redflagController.editComment));
router.delete('/api/v2/redflags/:id', errorhandler(verifyToken), errorhandler(findUserType), errorhandler(findRedflag), ValidateRedflagChange, errorhandler(redflagController.deleteRedflag));
export default router;
