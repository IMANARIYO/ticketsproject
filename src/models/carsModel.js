// cars.js
import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  
  CarId:{type:mongoose.Schema.Types.ObjectId,},
  TravelAgencyId:{type: mongoose.Schema.Types.ObjectId,
    ref:'TravelAgency',
    required:false},
    agenceName:{type:String},
  model: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  remaingSeats: {
    type: Number,
    default:0,
    required:false
  },
  driverName: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
 
  ticketsbooked: [{
   type:Object,
    required:false
  }],
  
  status:{
    type:String,
    default:"available",
    required:false
  },
 availbleafter:{
  type:String,
  default:"after 30 minutes"
 },
 currentlyBookedfor:{
  type:String,
  default:"none"
 }
});
carSchema.pre('save', function (next) {
  this.CarId=this._id;
  next();
});
export const Car = mongoose.model('Car', carSchema);
