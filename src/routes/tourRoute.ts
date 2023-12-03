import express from 'express';
import {
  checkBody,
  createTour,
  getTours,
  getTour,
  updateTour,
  deleteTour,
  checkId,
  topTours,
} from '../controllers/tourController.ts';
import { protect } from '../controllers/authController.ts';

const tourRouter = express.Router();

// tourRouter.param('id', checkId);

tourRouter.route('/').post(checkBody, createTour).get(protect, getTours);

tourRouter.route('/topFiveTours').get(topTours, getTours);

tourRouter
  .route('/:id')
  .get(getTour)
  .put(checkBody, updateTour)
  .delete(deleteTour);

export default tourRouter;
