import mongoose from "mongoose";

const directionSchema = new mongoose.Schema({
  TravelAgencyId: {
    type: mongoose.Types.ObjectId,
    ref: 'TravelAgency',
    required: false,
  },
  RouteId: {
    type: mongoose.Types.ObjectId,
    ref: "Route",
    required: false
  },
  directionId: {
    type: mongoose.Types.ObjectId,
    required: false
  },
  directionName:{type:String}
  ,
  departureCity: {
    type: String,
    required: true,
  },
  destinationCity: {
    type: String,
    required: true,
  },
  bookings: [{
    type: mongoose.Types.ObjectId,
    ref: 'Booking',
    required: false
  }],
  ticketsbooked: [{
    type: mongoose.Types.ObjectId,
    ref: 'Ticket',
    required: false
  }],
  payedticketsbooked:[{
    type: mongoose.Types.ObjectId,
    ref: 'Ticket',
    required: false
  }],
  bookedDate: {
    type: Date,
    required: false,
  },
  bookedTime: {
    type: Date, 
    required: false,
  },
  payedbookedtickets: {
    type: Number,
    default: 0,
  },
  nonpayedbookedtickets: {
    type: Number,
    default: 0,
  },
  periodic:{
    type:Number,
    required:true
  },
  specificationofperiodic:{
    type:String,
    required:true
  }, 
},
{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});

directionSchema.pre('save', function (next) {
  this.directionId = this._id;
  next();
});

export const direction = mongoose.model('direction', directionSchema);
