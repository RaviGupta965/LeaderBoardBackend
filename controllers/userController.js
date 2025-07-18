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
  try {
    const history = await ClaimHistory.find()
      .populate('userId', 'name') // only populate the name field
      .sort({ claimedAt: -1 });

    const formatted = history.map(entry => ({
      userId: entry.userId?._id,
      userName: entry.userId?.name || "Unknown",
      points: entry.points,
      claimedAt: entry.claimedAt
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch claim history" });
  }
};

