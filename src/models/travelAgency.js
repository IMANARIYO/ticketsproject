import mongoose from "mongoose";
const travelAgencySchema = new mongoose.Schema({
  TravelAgencyId:{type: mongoose.Schema.Types.ObjectId,
  required:false},
  travelAgenceName: { 
    type: String,
    required: true,
  },
  image:{
    type: String,
default:"https://www.jobinrwanda.com/sites/default/files/styles/medium/public/employer_logos/xlogo_2130242003.png,qitok=a11ZtBb6.pagespeed.ic.wCryn_YzzN.jpg"
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
},{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});
travelAgencySchema.pre('save', function (next) {
  this.TravelAgencyId=this._id;
  next();
});
export const TravelAgency = mongoose.model('TravelAgency', travelAgencySchema);
