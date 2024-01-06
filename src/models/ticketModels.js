import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  JourneyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journey',
    default: new mongoose.Types.ObjectId,
    required: true,
  },
  TicketId:{
    type: mongoose.Schema.Types.ObjectId
  },
  travelAgencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TravelAgency',
    required: false,
   
  },
  customerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customers',
    required: false, 
  },

  travelAgencename: { type: String },
  departureCity: {
    type: String,
    required: true,
  },
  destinationCity: {
    type: String,
    required: true,
  },
  departureDateTime: {
    type: Date,
    required: true,
  },
  price: {
    type: String,
    required: false,
  },
  seat_on_number: {
    type: Number,
    required: true,
  },
  
  customerName: {
    type: String,
    required: true,
    default: "John Doe", // Default customer name
  },
  customerSex: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
    default: 'Male', // Default customer sex
  },
  locationProvided: {
    type: String,
  },
  ticketCutTime: {
    type: Date,
    default: Date.now, // Default ticket cut time
  },
}, {
  timestamps: { currentTime: () => new Date() }, // Use local time zone
});


ticketSchema.pre('save', function (next) {
  this.TicketId = this._id;
  next();
});

export const Ticket = mongoose.model('Ticket', ticketSchema);
