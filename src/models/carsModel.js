// cars.js
import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  
  CarId:{type:mongoose.Schema.Types.ObjectId,},
  TravelAgencyId:{type: mongoose.Schema.Types.ObjectId,
    ref:'TravelAgency',
    required:false},
    travelAgencyName:{type:String},
  JourneyId:{type: mongoose.Schema.Types.ObjectId,
      ref:'Journey',
      required:false},
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
 equipedseats:{
  type:Number
 },
 
  driverName: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  status:{
    type:String,
    default:"available",
    required:false
  },
 availbleafter:{
  type:String,
  default:"after 30 minutes"
 },
 injourney:{
  type:String,
  default:"none"
 }
});
carSchema.pre('save', function (next) {
  this.CarId=this._id;
  next();
});
export const Car = mongoose.model('Car', carSchema);
