import { Router } from 'express';
import {
  createMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
} from '../controllers/media.controller';

const router = Router();

router.post('/', createMedia);
router.get('/', getMedia);
router.get('/:id', getMediaById);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

export default router;