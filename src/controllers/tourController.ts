import { NextFunction, Request, Response } from 'express';
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
    const tours = await Tour.find();
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
