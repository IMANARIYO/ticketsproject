import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  RouteID: {
    type: mongoose.Schema.Types.ObjectId,
   
    
  },
 routeName:{type:String},
  departureCity: {
    type: String,
    required: true,
  },
  destinationCity: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  
  tickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket', // Assuming your Ticket model is named 'Ticket'
    required:false
  }],
  cars:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required:false
  }],
  travelagencies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TravelAgency', 
      required:false
    }
  ],
});
routeSchema.pre('save', function (next) {
  this.RouteID = this._id;
  next();
});
export const Route = mongoose.model('Route', routeSchema);
