import express from 'express';
import { signup, login } from '../controllers/authController.ts';

const authRouter = express.Router();

authRouter.route('/').post(signup).get(login);

export default authRouter;
