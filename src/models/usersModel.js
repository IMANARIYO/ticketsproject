import mongoose from "mongoose";

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
        required: true

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
    }
});
usersSchema.pre('save', function (next) {
    this.userId=this._id;
    next();
  });
 export const userconst = mongoose.model('users', usersSchema);

