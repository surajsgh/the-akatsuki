import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
    minLength: 8,
    maxLength: 15,
  },
  // passwordConfirmation: {
  //   type: String,
  //   required: [true, 'A user must confirm their password.'],
  //   trim: true,
  //   minLength: 8,
  //   maxLength: 15,
  //   validate: function (value: string) {
  //     return this.password === value;
  //   },
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mongoose.model('User', userSchema);

export default User;
