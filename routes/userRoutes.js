import express from 'express';
import {
  getUsers,
  addUser,
  claimPoints,
  getLeaderboard,
  getHistory
} from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', addUser);
router.post('/claim', claimPoints);
router.get('/leaderboard', getLeaderboard);
router.get('/history', getHistory);

export default router;
