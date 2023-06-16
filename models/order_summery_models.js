const mongoose = require('mongoose');
const orderSummerySchema = new mongoose.Schema({

    
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
   
    total_price: {
        type:String,
        
    },
   

},{timestamps:true});
module.exports =ordersummeryModel= mongoose.model('ordersummery',orderSummerySchema);