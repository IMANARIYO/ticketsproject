import mongoose from "mongoose";
import { datew } from "../utils/datefunctin.js";
const usersSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId},
    fullNames: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    picture:{type:String,
    required:false},
    password: {
        type: String,
        required: true
    },
    sex:{type:String},
    role: {
        type: String,
        default:"user",
       
    },
    otpExpiresAt: {
        type: String,
        required: false
    },
    otp: {
        type: String,
        required: false
    },
    token:{type:String,
    },
    verified:{type:Boolean,
    default:false   },
    
}, {
    timestamps: { currentTime: () => new Date() }, 
  }

);
usersSchema.pre('save', function (next) {
    this.userId=this._id;
    const now = new Date();
    
    next();
  });
 export const userconst = mongoose.model('users', usersSchema);

//  if (user) {
    //   return res.status(409).json({ message: "Email is already in use."
    
    //   });
    //  }
 
