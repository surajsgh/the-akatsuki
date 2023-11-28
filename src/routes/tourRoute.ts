import express from 'express';
import {
  checkBody,
  createTour,
  getTours,
  getTour,
} from '../controllers/tourController.ts';

const tourRouter = express.Router();

tourRouter.route('/').post(checkBody, createTour).get(getTours);

tourRouter.route('/:id').get(getTour);

export default tourRouter;
