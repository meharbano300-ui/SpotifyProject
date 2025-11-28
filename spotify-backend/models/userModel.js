import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
    trim: true,
    unique: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String 
  },
  dob: { 
    type: String 
  },
  gender: { 
    type: String 
  },
  role: { 
    type: String,
    enum: ['Admin', 'Premium', 'Free'], 
    default: 'Free', 
    required: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, 
{
  collection: 'users' 
});

export default mongoose.model("User", userSchema);
