import express from 'express';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { test } from '../controllers/testController';

const testRouter = express.Router();

testRouter.route('/').post(test);

export default testRouter;
