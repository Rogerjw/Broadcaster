import express from 'express';
import UsersController from '../controllers/users.controller';
const router = express.Router();

router.get('/api/v1/redflags',UsersController.fetchAllRedFlags);

export default router;