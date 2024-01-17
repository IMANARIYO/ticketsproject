import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    directionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'direction',
      required: true,
    },
    journeyId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Journey',
    },
    TicketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Ticket',
      required:false
    },
    travelAgencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TravelAgency',
      required: false,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: false,
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: false,
    },
    payingphone:{
      type:String,
      required:false
    },
    fullNames: {
      type: String,
      required:false
  },
  email: {
      type: String,
      required:false
    },

 phone: {
  type:String,
  required:false
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
    departureDate: {
      type: String,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: false,
    },
    seat_on_number: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'notPaid'],
      default: 'pending',
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ['confirmed', 'pending', 'canceled'],
      default: 'pending',
      required: false,
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'notPaid'],
      default: 'notPaid',
      required: false,
    },
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    passengerInfo: {   
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
  },{
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  }
);

ticketSchema.pre('save', function (next) {
  this.TicketId = this._id;
  next();
});

export const Ticket = mongoose.model('Ticket', ticketSchema);
