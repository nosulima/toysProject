const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
 
    fullName: String,
  
  
  email: {
    type:String,unique: true
  },
  password: String,
  date_created: {
    type: Date, default: Date.now()
  },
  role: {
    type: String, default: "user" //admin or user
  }
})

exports.User = mongoose.model("users", userSchema);
