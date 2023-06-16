const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({ 
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
   
productId:{
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:"product"
},

  delevery_charge:{
        type: String,
       
    },
    total_price: {
        type: String,
       
    },
    qty:{type:Number,default:1},
    color:{type:String,},
    size: {type:String,},
    duration: {type:String,},
    
    status: {
        type:String,
        default:"pending",
       
    },

     unique: {
        type:Number, 
    },

     active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    },

refund_amount: {type:String},
transectionId:{type:String},
refund_date:{type:Date,default:Date.now},
refund_status:{type:String,default:0},




},{timestamps:true});
module.exports =cartModel= mongoose.model('cart', cartSchema);




