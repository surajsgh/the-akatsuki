import express from 'express';
import createUser from '../controllers/userController.ts';

const userRouter = express.Router();

userRouter.route('/').post(createUser);

export default userRouter;
