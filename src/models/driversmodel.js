import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  DriverID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car', // Assuming your Car model is named 'Car'
    },
  ],
  journeys: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Journey'
    },
  ],
},
{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});

driverSchema.pre('save', function (next) {
  this.DriverID = this._id;
  next();
});
export const Driver = mongoose.model('Driver', driverSchema);
