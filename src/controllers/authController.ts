import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Types } from 'mongoose';
import User from '../models/userModel.ts';
import catchAsync from '../utils/catchAsync.ts';
import AppError from '../utils/appError.ts';

interface ExtendedRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

const getToken = (id: Types.ObjectId): string =>
  jwt.sign({ id }, process.env.SECRET_KEY!, {
    expiresIn: process.env.EXPIRES_IN,
  });

export const signup = catchAsync(async (req: Request, res: Response) => {
  const user = await User.create(req.body);

  const token = getToken(user._id!);

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

    if (!registeredUserPassword)
      return next(new AppError('This user is not registered.', 400));

    const match = bcrypt.compare(password, registeredUserPassword.password);

    if (!match)
      return next(new AppError('Oops! Entered password is wrong.', 400));

    const token = getToken(registeredUserPassword._id);

    return res.status(200).json({
      error: true,
      message: 'You have logged in successfully.',
      token,
    });
  },
);

export const protect = catchAsync(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const token =
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
        ? req.headers.authorization.split('Bearer ')[1].trim()
        : '';

    if (!token) return next(new AppError('You are not logged in.', 401));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(token, process.env.SECRET_KEY!, async (err, decoded: any) => {
      if (err) return next(new AppError('Invalid token.', 401));

      const { id } = decoded;

      const user = await User.findById(id);

      if (!user) return next(new AppError(`User doesn't exist.`, 404));
      req.user = user;
      next();
    });
  },
);

// eslint-disable-next-line no-unused-expressions
export const restrictTo = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user.type !== 'admin')
    return next(
      new AppError('You are not authorized to access this route.', 403),
    );

  next();
};
