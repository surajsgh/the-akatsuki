import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/userModel.ts';
import catchAsync from '../utils/catchAsync.ts';
import AppError from '../utils/appError.ts';

export const signup = catchAsync(async (req: Request, res: Response) => {
  const user = await User.create(req.body);

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY!, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return res
    .status(200)
    .json({ error: true, message: 'User created successfully', user, token });
});

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError('Please enter a email and password', 400));

    const registeredUserPassword = await User.findOne({ email });

    console.log(registeredUserPassword);

    if (!registeredUserPassword)
      return next(new AppError('This user is not registered.', 400));

    const match = bcrypt.compare(password, registeredUserPassword.password);

    if (!match)
      return next(new AppError('Oops! Entered password is wrong.', 400));

    const token = jwt.sign(
      { id: registeredUserPassword._id },
      process.env.SECRET_KEY!,
      {
        expiresIn: process.env.EXPIRES_IN,
      },
    );

    return res.status(200).json({
      error: true,
      message: 'You have logged in successfully.',
      token,
    });
  },
);
