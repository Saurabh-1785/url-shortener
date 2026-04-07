// src/dao/user.dao.js
import User from '../models/user.model.js';

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// select('+password') overrides select:false for this query
export const findUserByEmailWithPassword = async (email) => {
  return await User.findOne({ email }).select('+password');
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const createUser = async (name, email, password) => {
  const user = new User({ name, email, password });
  return await user.save();
  // .pre('save') runs automatically → password gets hashed
};