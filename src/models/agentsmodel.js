import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  agentName: {
    type: String,
    required: true,
    default: "John Doe", // Default agent name
  },
  contactInformation: {
    phoneNumber: {
      type: String,
      required: true,
      default: "+1234567890", // Default phone number
    },
    email: {
      type: String,
      required: true,
      unique: true,
      default: "john.doe@example.com", // Default email address
    },
  },
  agencyAffiliation: {
    type: String,
    required: true,
    default: "XYZ Travel Agency", // Default agency affiliation
  },
  location: {
    type: String,
    required: true,
    default: "CityA", // Default location
  },
  workingHours: {
    type: String,
    required: true,
    default: "9 AM to 5 PM", // Default working hours
  },
  assignedRoutes: {
    type: [String],
    default: [], // Default empty array for assigned routes
  },
  salesPerformance: {
    totalSales: {
      type: Number,
      default: 0,
    },
    revenue: {
      type: Number,
      default: 0,
    },
  },
  commissionStructure: {
    commissionRate: {
      type: Number,
      default: 0.1, // Default commission rate (10%)
    },
    additionalIncentives: {
      type: String,
      default: "None", // Default additional incentives
    },
  },
  authorizationLevel: {
    type: String,
    required: true,
    default: "Basic", // Default authorization level
  },
  ticketInventory: {
    availableTickets: {
      type: Number,
      default: 0,
    },
    ticketIds: {
      type: [String],
      default: [], // Default empty array for ticket IDs
    },
  },
  paymentRecords: [
    {
      transactionDate: {
        type: Date,
        default: Date.now,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  customerInteractionHistory: [
    {
      interactionDate: {
        type: Date,
        default: Date.now,
      },
      interactionType: {
        type: String,
        required: true,
      },
      customerName: {
        type: String,
      },
    },
  ],
});

export const Agent = mongoose.model("Agent", agentSchema);
