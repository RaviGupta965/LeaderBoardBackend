import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  totalPoints: { type: Number, default: 0 }
});

const User = mongoose.model('User', UserSchema);
export default User;
