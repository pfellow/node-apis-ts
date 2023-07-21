import { Router } from 'express';
import { body } from 'express-validator';
import handleInputErrors from '../modules/handle-input-errors';
import { createNewUser, signin } from '../handlers/user';

const router: any = Router();

router.post(
  '/user',
  [
    body('username')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Invalid (too short?)'),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Invalid (too short?)')
  ],
  handleInputErrors,
  createNewUser
);
router.post(
  '/signin',
  [
    body('username')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Invalid (too short?)'),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Invalid (too short?)')
  ],
  handleInputErrors,
  signin
);

export default router;
