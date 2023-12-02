import { Request, Response, NextFunction } from 'express';

import User from '../models/userModel.ts';
import catchAsync from '../utils/catchAsync.ts';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  return res
    .status(200)
    .json({ error: true, message: 'User created successfully', user });
});

export default createUser;
