import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  feesPaid: { type: Boolean, default: false },
});

export default mongoose.model('User', userSchema);
