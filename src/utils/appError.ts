export default class AppError extends Error {
  private statusCode: number;
  private status: string;

  constructor(message: string, statusCode: number) {
    console.log('Test');

    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'Failure' : 'Error';

    // console.log('This -->>', this);
    Error.captureStackTrace(this, this.constructor);
  }
}
