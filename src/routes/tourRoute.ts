import express from 'express';
import { checkBody, createTour } from '../controllers/tourController.ts';

const tourRouter = express.Router();

tourRouter.route('/').post(checkBody, createTour);

export default tourRouter;
