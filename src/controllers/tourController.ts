import { NextFunction, Request, Response } from 'express';
import Tour from '../models/tourModel.ts';

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
  const { hotels, tourGuide, places, price } = req.body;

  if (!+price || +price < 0) {
    return res
      .status(400)
      .json({ error: true, message: 'Price must be a positive number.' });
  }

  if (
    !Array.isArray(hotels) ||
    !Array.isArray(tourGuide) ||
    !Array.isArray(places)
  ) {
    return res.status(400).json({
      error: true,
      message: 'Hotels, Tour guides and places, All fields must be an array',
    });
  }

  if (!hotels.length || !tourGuide.length || !places.length) {
    return res.status(400).json({
      error: true,
      message: 'All fields are required.',
    });
  }

  next();
};

export const createTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.create(req.body);
    return res
      .status(201)
      .json({ error: false, message: 'Tour created successfully', tour });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json({ error: true, message: error.message });
  }
};
