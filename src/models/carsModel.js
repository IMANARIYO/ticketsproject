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
      image:{
        type: String,
default:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.scania.com%2Fcontent%2Fdam%2Fgroup%2Fproducts-and-services%2Fbuses-and-coaches%2Fscania-buses-and-coaches-mobile-21080-006.jpg&tbnid=p1jzA6IN8WcGMM&vet=12ahUKEwiL-8GFyOGDAxU5mycCHRxxBtwQMyglegUIARDBAQ..i&imgrefurl=https%3A%2F%2Fwww.scania.com%2Fgroup%2Fen%2Fhome%2Fproducts-and-services%2Fbuses-and-coaches.html&docid=49WRzvvNDR-FyM&w=1434&h=1433&q=bus&ved=2ahUKEwiL-8GFyOGDAxU5mycCHRxxBtwQMyglegUIARDBAQ"
      },
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
