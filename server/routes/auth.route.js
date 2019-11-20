import express from 'express';
import UsersController from '../controllers/users.controller';
const router = express.Router();

router.post('/api/v1/auth/signup',UsersController.createUser);
  
export default router;