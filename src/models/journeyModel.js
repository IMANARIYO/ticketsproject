import mongoose from "mongoose";

const journeySchema = new mongoose.Schema({

  TravelAgencyId: {
    type: mongoose.Types.ObjectId,
   ref:'TravelAgency',
    required: false,
  },
  carId: {
    type: mongoose.Types.ObjectId,
    ref:"Car",
    required:false
  },
  RouteId: {
    type: mongoose.Types.ObjectId,
    ref:"Route",
    required:false
  },
  JourneyId:{
    type:mongoose.Types.ObjectId,
    required:false
  },
  agenceName: {
    type: String,
    default: "agenceoftetsting",
  },

  departureDateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  
  
  remainingseats: {
    type: Number,
    default: 0,
  },
  availableSeats:{
    type: Number,
    default: 0,
  },
  ticketsbooked: [{
    type:mongoose.Types.ObjectId,
    ref:'Ticket',
     required:false
   }],
  agents: [
    {
      agentID: {
        type: String,
        required: true,
      },
      customers: [
        {
          customerID: {
            type: String,
            // ref: 'Customer', // Assuming your Customer model is named 'Customer'
            required: false,
          },
          customerName: {
            type: String,
            required: false,
          },
          customerSex: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: false,
          },
        },
      ],
    },
  ],
});

// Define a pre-save middleware to set journeyID and agenceId
journeySchema.pre('save', function (next) {
  this.JourneyId = this._id;
  next();
});

export const Journey = mongoose.model('Journey', journeySchema);
