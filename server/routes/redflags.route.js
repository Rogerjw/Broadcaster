import express from 'express';
import UsersController from '../controllers/users.controller';
const router = express.Router();

router.get('/api/v1/redflags',UsersController.fetchAllRedFlags);
router.get('/api/v1/redflags/:id',UsersController.getSpecificRedflag);
router.post('/api/v1/redflags',UsersController.createRedflag);
export default router;