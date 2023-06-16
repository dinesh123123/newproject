
// create product model schema
const mongoose=require('mongoose');
const reviewSchema = new mongoose.Schema({
	
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },

    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
    
    name:{
        type:String,
       
    },
    ratings:{
        type:Number,
        required:false

    },
    comment:{
        type:String,
        required:false
    },
      date:{
    type:Date,
    default:Date.now
    },


},{timestamps:true});
module.exports = reviewModel= mongoose.model("review",reviewSchema);
