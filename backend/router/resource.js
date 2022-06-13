import express from 'express';
const router = express.Router();
import {
  addGasBalance,
  getGasBalance,
//  burn
} from '../controller/resourceController.js';

// import { protect } from '../middleware/authMiddleware.js';

// router.route('/').post(protect, createContact);
// router.route('/').get(protect, getContacts);
// router.route('/:id').delete(protect, deleteContact).put(protect, updateContact);
// router.route('/delete').post(protect, deleteMultiContacts);

router.route('/:name').get(getGasBalance);
router.route('/add/:name').post(addGasBalance);


export default router;
