import User from '../models/User.js';

export const getAllStudents = async (req, res) => {
  const students = await User.find({}, 'name email feesPaid');
  res.json(students);
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.json(user);
};

export const markFeesPaid = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { feesPaid: true }, { new: true });
  res.json(user);
};
