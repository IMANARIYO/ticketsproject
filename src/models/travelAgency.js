import mongoose from "mongoose";


const travelAgencySchema = new mongoose.Schema({
  TravelAgencyId:{type: mongoose.Schema.Types.ObjectId,
  required:false},
  agencyName: { type: mongoose.Schema.Types.ObjectId,
    type: String,
    required: true,
  },
  agencysites:[{
    type:String,
    required:false
  }],
  contactInformation: {
    type: String,
    required: true,
  },
 routes:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Route',
  required:false
 }],
Journeys:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Journey',
  required:false
 }],
  cars:[{type:mongoose.Schema.Types.ObjectId,
    ref:'Car',
  required:false}],
}, {
  timestamps: { currentTime: () => new Date() },
});
travelAgencySchema.pre('save', function (next) {
  this.TravelAgencyId=this._id;
  next();
});
export const TravelAgency = mongoose.model('TravelAgency', travelAgencySchema);
