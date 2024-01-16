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
    ref: 'Booking',
    required: false
  }],
  payedticketsbooked:[{
    type: mongoose.Types.ObjectId,
    ref: 'Booking',
    required: false
  }],
  nonpayedbookedtickets:[{
    type: mongoose.Types.ObjectId,
    ref: 'Booking',
    required: false
  }],
  bookedDate:[ {
    type: String,
    required: false,
  }],
  bookedTime: [{
    type: String, 
    required: false,
  }],
  
 
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

const removeDuplicates = (array) => [...new Set(array)];

// Pre-save hook to remove duplicates from bookedDate and bookedTime
directionSchema.pre('save', function (next) {

  this.bookedDate = removeDuplicates(this.bookedDate);
  this.bookedTime = removeDuplicates(this.bookedTime);
const today = new Date().toISOString().split('T')[0];
console.log("date to day we are using",today)
this.bookedDate = this.bookedDate.filter(date => {
  console.log("to showup_____________________________________________-")
  const shouldInclude = date >= today;
  if (!shouldInclude) {
    console.log(`Filtering out date: ${date}`);
  }
  if (!shouldInclude) {
    console.log(`Filtering in date: ${date}`);
  }

  return shouldInclude;
});

  // Assign a unique ID for the direction
  this.directionId = this._id;
  next();
});

export const direction = mongoose.model('direction', directionSchema);
