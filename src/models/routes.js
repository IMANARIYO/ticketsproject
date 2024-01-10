import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  RouteID: {
    type: mongoose.Schema.Types.ObjectId,
  },
 routeName:{type:String,
required:false},
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
  travelagencies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TravelAgency', 
      required:false
    }
  ],
},{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});
routeSchema.pre('save', function (next) {
  this.RouteID = this._id;
  next();
});
export const Route = mongoose.model('Route', routeSchema);
