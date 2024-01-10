import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    directionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'direction',
      default: new mongoose.Types.ObjectId,
      required: true,
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
    status: {
      type: String,
      enum: ['booked', 'pending', 'paid', 'notPaid'],
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
