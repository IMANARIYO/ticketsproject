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
default:"https://www.google.com/imgres?imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D100057627061851&tbnid=dMvFoqJc9KPmlM&vet=12ahUKEwiR1fOzyOGDAxW7dqQEHYwzA-wQMygCegQIARBQ..i&imgrefurl=https%3A%2F%2Fm.facebook.com%2Fp%2FRwanda-Association-of-Travel-Agencies-100057627061851%2F%3Flocale%3Dfi_FI&docid=2FwDAphpP4t9vM&w=329&h=290&itg=1&q=rwanda%20travel%20agence&ved=2ahUKEwiR1fOzyOGDAxW7dqQEHYwzA-wQMygCegQIARBQ"
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
