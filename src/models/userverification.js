import mongoose from "mongoose";

const userverifySchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId},
    uniqueString: {
        type: String,
        required: true
    },
    createdAt: {
        type:Date,
        required: true
    },
   
expiresAt: {
        type: Date,
        required: false
    }, 
    verified:{type:Boolean,
    required:false   }
});
usersSchema.pre('save', function (next) {
    this.userId=this._id;
    next(); 
  });
 export const userverifyconst = mongoose.model('usersverification', userverifySchema );

