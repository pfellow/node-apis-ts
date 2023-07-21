import { validationResult } from 'express-validator';

const handleInputErrors = (req: any, res: any, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsMessage = errors.array().reduce((errorObj: any, err: any) => {
      errorObj[err.path] = err.msg;
      return errorObj;
    }, {});
    const error = new Error(JSON.stringify(errorsMessage));
    error.cause = 400;
    next(error);
  }
  next();
};

export default handleInputErrors;
