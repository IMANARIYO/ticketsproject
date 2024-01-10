import mongoose from "mongoose";

const journeySchema = new mongoose.Schema({
  TravelAgencyId: {
    type: mongoose.Types.ObjectId,
    ref: 'TravelAgency',
    required: false,
  },
  carId: {
    type: mongoose.Types.ObjectId,
    ref: "Car",
    required: false
  },
  RouteId: {
    type: mongoose.Types.ObjectId,
    ref: "Route",
    required: false
  },
  journeyId: {
    type: mongoose.Types.ObjectId,
    required: false
  },
  departureCity: {
    type: String,
    required: true,
  },
  destinationCity: {
    type: String,
    required: true,
  },
  travelAgenceName: {
    type: String,
    default: "agenceoftetsting",
  },
  departureDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
 
  departureTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  plannedSeats: {
    type: Number,
    default: 0,
  },
  bookedSeats: {
    type: Number,
    default: 0,
  }, 
  payedticketsbooked:[{
    type: mongoose.Types.ObjectId,
    ref: 'Ticket',
    required: false
  }],
  payedSeats: {
    type: Number,
    default: 0,
  },
  nonPayedSeats: {
    type: Number,
    default: 0,
  },
  remainingNonPayedSeats: {
    type: Number,
    default: 0,
  },
  estimatedArrivalTime: {
    type: Date,
    required: false,
  },
  ticketsbooked: [{
    type: mongoose.Types.ObjectId,
    ref: 'Ticket',
    required: false
  }],
  quickChanceSeats: {
    type: Number,
    required: false,
  },
  periodic: {
    type: Number,
    required: false
  },
  specificationofperiodic: {
    type: String,
    required: false
  },
  carsizerequired: {
    type: Number,
    required: false
  },
  status: {
    type: String,
    enum: ['Started', 'Pending', 'Completed', 'Canceled', 'Delayed', 'Issue', 'BackupNeeded', 'Accident', 'NeedRepair'],
    default: 'Pending',
  },
  agents: [{
    agentID: {
      type: String,
      required: false,
    },
    customers: [{
      customerID: {
        type: String,
        required: false,
      },
      customerName: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      customertelphone: {
        type: Number,
        required: false
      },
      customerSex: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: false,
      },
    }],
  }],
},{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});

journeySchema.pre('save', function (next) {
  this.journeyId = this._id;
  next();
});

export const Journey = mongoose.model('Journey', journeySchema);
