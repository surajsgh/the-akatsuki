import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name.'],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price.'],
    },
    description: {
      type: String,
      required: [true, 'A tour must have a description.'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    hotels: [String],
    tourGuide: [String],
    durations: {
      type: String,
      required: [true, 'A tour must have a duration.'],
    },
    places: [String],
  },
  { toJSON: { virtuals: true } },
);

// Virtual Query
tourSchema
  .virtual('expiresIn')
  .get(() => `${Math.floor(Math.random() * 10) + 1} days`);

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
