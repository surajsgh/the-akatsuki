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
import { protect, restrictTo } from '../controllers/authController.ts';

const tourRouter = express.Router();

// tourRouter.param('id', checkId);

tourRouter.use(protect);

tourRouter.route('/').post(checkBody, createTour).get(getTours);

tourRouter.route('/topFiveTours').get(topTours, getTours);

tourRouter
  .route('/:id')
  .get(getTour)
  .put(checkBody, updateTour)
  .delete(restrictTo, deleteTour);

export default tourRouter;
