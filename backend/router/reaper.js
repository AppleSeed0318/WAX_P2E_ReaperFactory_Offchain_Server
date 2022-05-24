import express from 'express';
const router = express.Router();
import {
  getStakeList,
  createStake,
  removeStake,
  claimStake
//  burn
} from '../controller/reaperController.js';

// import { protect } from '../middleware/authMiddleware.js';

// router.route('/').post(protect, createContact);
// router.route('/').get(protect, getContacts);
// router.route('/:id').delete(protect, deleteContact).put(protect, updateContact);
// router.route('/delete').post(protect, deleteMultiContacts);

router.route('/stake').post(createStake);
router.route('/unstake').post(removeStake);
router.route('/claim').post(claimStake);
router.route('/:name').post(getStakeList);

export default router;
