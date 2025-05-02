import express from 'express';
import {
  getBeans,
  getBean,
  addBean,
  modifyBean,
  removeBean
} from '../controllers/beanController.js';

const router = express.Router();

router.get('/', getBeans);
router.get('/:id', getBean);
router.post('/', addBean);
router.put('/:id', modifyBean);
router.delete('/:id', removeBean);

export default router;
