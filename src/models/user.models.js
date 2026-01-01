import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema({
  watchHistory: [{
    type: Types.ObjectId,
    ref: 'videos',       
    required: false
  }],
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  fullName: {
    type: String,
    required: false,
    trim: true
  },
  avatar: {
    type: String,
    required: false,
    default: 'default_avatar.png'
  },
  coverImage: {
    type: String,
    required: false,
    default: 'default_cover.png'
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }); 
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) 
        return next();
  this.password = bcrypt.hash(this.password, 10)
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password,this.password)
    
}
 userSchema.method.generateAccessToken = function(){
  return jwt.sign(
    {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.ACCESS_TOKEN_EXPIRY 
    }
 )
 }
  userSchema.method.generateRefreshToken = function(){
    return jwt.sign(
    {
        _id: this._id,
     
    },
)
  }

export const User = model('User', userSchema);
