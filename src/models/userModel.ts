import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email.'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [isEmail, 'Invalid email address.'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password.'],
    trim: true,
    minLength: 6,
    maxLength: 15,
  },
  passwordConfirmation: {
    type: String,
    required: [true, 'A user must confirm their password.'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
