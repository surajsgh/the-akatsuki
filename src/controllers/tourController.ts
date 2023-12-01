import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import Tour from '../models/tourModel.ts';

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
  const { hotels, tourGuide, places, price } = req.body;

  if (price && (!+price || +price < 0)) {
    return res
      .status(400)
      .json({ error: true, message: 'Price must be a positive number.' });
  }

  if (
    (hotels && !Array.isArray(hotels)) ||
    (tourGuide && !Array.isArray(tourGuide)) ||
    (places && !Array.isArray(places))
  ) {
    return res.status(400).json({
      error: true,
      message: 'Hotels, Tour guides and places, All fields must be an array',
    });
  }

  if (
    (hotels && !hotels.length) ||
    (tourGuide && !tourGuide.length) ||
    (places && !places.length)
  ) {
    return res.status(400).json({
      error: true,
      message: 'All fields are required.',
    });
  }

  next();
};

export const checkId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  val: string,
) => {
  try {
    const {
      Types: { ObjectId },
    } = mongoose;

    const validObjectId =
      ObjectId.isValid(val) && new ObjectId(val).toString() === val;

    if (!validObjectId) {
      return res.status(400).json({
        error: true,
        message: 'Invalid ObjectId',
      });
    }

    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json({ error: true, message: error.message });
  }
};

export const topTours = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.query.limit = '5';
  req.query.sort = '-createdAt, price';
  req.query.fields = 'name, price, description, duration, createdAt';
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

export const getTours = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = Tour.find(req.query);

    if (req.query.sort) {
      const queryBy = req.query.sort.toString().split(',').join(' ');
      query = query.sort(queryBy);
    } else {
      query = query.sort('-createdAt');
    }

    if (req.query.fields) {
      const queryBy = req.query.fields.toString().split(',').join(' ');
      query = query.select(`${queryBy}`);
    } else {
      query = query.select('-__v');
    }

    const page = Number(req.query.page) * 1 || 1;
    const limit = Number(req.query.limit) * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const tours = await query;
    return res.status(200).json({ error: false, tours });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json({ error: true, message: error.message });
  }
};

export const getTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findById(req.params.id);
    return res.status(200).json({ error: false, tour });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json({ error: true, message: error.message });
  }
};

export const updateTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res
      .status(200)
      .json({ error: false, tour, message: 'Tour updated successfully.' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json({ error: true, message: error.message });
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ error: false, tour, message: 'Tour deleted successfully.' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json({ error: true, message: error.message });
  }
};
