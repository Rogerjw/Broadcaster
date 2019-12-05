import express from 'express';
import UsersController from '../controllers/users.controller';
import { validateExistingAccount } from '../middlewares/authentication.middleware';
import { validateNewUser } from '../middlewares/authentication.middleware';
import errorhandler from '../helpers/errorhandler';
const router = express.Router();

router.post('/api/v2/auth/signup',errorhandler(validateNewUser),errorhandler(UsersController.createUser));
router.post('/api/v2/auth/signin',errorhandler(validateExistingAccount),errorhandler(UsersController.loginUser));
  
export default router;