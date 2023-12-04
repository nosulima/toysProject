const mongoose = require('mongoose');

const toysSchema = new mongoose.Schema({
    name:String,
    info:String,
    category:String,
    img_url:String,
    price:Number,
    user_id:{
      type:String,
    //  type: mongoose.Types.ObjectId,
    //   ref:'User',
      
    },
    date_created:{
      type:Date, default:Date.now()
    }
  })

 
  exports.Toy= mongoose.model("Toys", toysSchema);
