import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    directionId:{type: mongoose.Schema.Types.ObjectId,
      ref: 'direction',
      required: false},
    departureCity: {
      type: String,
      required: false,
    },
    destinationCity: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: false,
    },
    TravelAgencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TravelAgency',
      required: false,
    },
    price:{
      type:Number,
      required:false
    },
    bookingDate: {
      type: String,
      required: false,
    },
    bookingTime: {
      type: String, // Assuming a Date object for simplicity, you can adjust this based on your needs
      required: false,
    },
    bookedCar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: false,
    },
    status: {
      type: String,
      enum: ['booked', 'waiting', 'done'],
      default: 'booked',
      required: false,
    },
    waitingDate: {
      type:Boolean,
      default:false,
      required: false,
    },
    waitingTime: {
      type:Boolean,
      default:false,
      required: false,
    },
    done: {
      type: Boolean,
      default: false,
      required: false,
    },
    paymentStatus: {
      type: Boolean,
      enum: ['true', 'false'],
      default: false,
      required: false,
    },
    paymentInformation: {
      // Add relevant fields for payment information
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
  },
  {
    timestamps: { currentTime: () => new Date() }, // Use local time zone
  }
);

bookingSchema.pre('save', function (next) {
  this.bookingId = this._id;
  next();
});

export const Booking = mongoose.model('Booking', bookingSchema);
