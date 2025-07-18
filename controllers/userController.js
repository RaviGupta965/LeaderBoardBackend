import User from '../models/User.js';
import ClaimHistory from '../models/claimHistory.js';

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const addUser = async (req, res) => {
  const { name } = req.body;

  const existingUser = await User.findOne({ name });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const user = new User({ name });
  await user.save();
  res.json(user);
};

export const claimPoints = async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 10) + 1;
  const user = await User.findByIdAndUpdate(
    userId,
    { $inc: { totalPoints: points } },
    { new: true }
  );
  await new ClaimHistory({ userId, points }).save();
  res.json({ user, points });
};

export const getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
};

export const getHistory = async (req, res) => {
  const history = await ClaimHistory.find().populate('userId').sort({ claimedAt: -1 });
  res.json(history);
};
