import { Router } from 'express';
import { body } from 'express-validator';
import handleInputErrors from './modules/handle-input-errors';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate
} from './handlers/update';

const router = Router();

/**
 * PRODUCT
 */

router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put(
  '/product/:id',
  body('name').isLength({ min: 5, max: 255 }).isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  '/product',
  body('name').isLength({ min: 5, max: 255 }).isString(),
  handleInputErrors,
  createProduct
);
router.delete('/product/:id', deleteProduct);

/**
 * UPDATE
 */

router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put(
  '/update/:id',
  [
    body('title').optional().isLength({ min: 5 }),
    body('body').optional().isLength({ min: 5 }),
    body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional(),
    body('asset').optional()
  ],
  handleInputErrors,
  updateUpdate
);
router.post(
  '/update',
  [
    body('title').isLength({ min: 5 }),
    body('body').isLength({ min: 5 }),
    body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional(),
    body('asset').optional()
  ],
  handleInputErrors,
  createUpdate
);
router.delete('/update/:id', deleteUpdate);

/**
 * UPDATE_POINT
 */

router.get('/updatepoint', (req, res, next) => {});
router.get('/updatepoint/:id', (req, res, next) => {});
router.put(
  '/updatepoint/:id',
  [
    body('name').optional().isLength({ min: 5 }),
    body('description').optional().isLength({ min: 5 })
  ],
  handleInputErrors,
  () => {}
);
router.post(
  '/updatepoint',
  [
    body('name').isLength({ min: 5 }),
    body('description').isLength({ min: 5 }),
    body('id').exists()
  ],
  handleInputErrors,
  () => {}
);
router.delete('/updatepoint/:id', (req, res, next) => {});

export default router;
