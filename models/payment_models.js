const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userId:{type:String,required:true},
    trnsId:{type:String,required:true},
    amount: {type: Number, required:true},
    title: {type: String, required:false},
    refundStatus:{type:Boolean,default:false},
    count : {type: Number, default:0},
    date: {type: Date, default: Date.now()}
});


module.exports = mongoose.model("payment", paymentSchema);