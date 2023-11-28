import { Request, Response } from 'express';
import Test from '../models/testModel.ts';

// eslint-disable-next-line import/prefer-default-export
export const test = async (req: Request, res: Response): Promise<unknown> => {
  try {
    await Test.create({ name: 'test' });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
  return res.status(200).json({ message: 'Record created successfully.' });
};
