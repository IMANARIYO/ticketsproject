import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  directions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Direction' }],
});

const City = mongoose.model('City', citySchema);

export default City;
