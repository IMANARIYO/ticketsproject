import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    departureCity: {
      type: String,
      required: false,
    },
    destinationCity: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: false,
    },
    travelAgencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TravelAgency',
      required: false,
    },
    bookingDate: {
      type: Date,
      required: false,
    },
    bookingTime: {
      type: Date, // Assuming a Date object for simplicity, you can adjust this based on your needs
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
      type: Date,
      required: false,
    },
    waitingTime: {
      type: Date,
      required: false,
    },
    done: {
      type: Boolean,
      default: false,
      required: false,
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'notPaid'],
      default: 'notPaid',
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
