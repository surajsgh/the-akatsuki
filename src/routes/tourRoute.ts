import express from 'express';
import {
  checkBody,
  createTour,
  getTours,
  getTour,
  updateTour,
} from '../controllers/tourController.ts';

const tourRouter = express.Router();

tourRouter.route('/').post(checkBody, createTour).get(getTours);

tourRouter.route('/:id').get(getTour).put(checkBody, updateTour);

export default tourRouter;
