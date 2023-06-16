const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({

	userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },



ShippingAddressId:{
	type:mongoose.Schema.Types.ObjectId,
required:false,
ref:"location"
},



paymentMethod:{
	type:String,
	required:false,
	default:"paypal"
},
paymentMode:{
	type:String,
	required:false,
	default:"online"
},
paymentResult:{
	id:{type:String},
	status1:{type:String},
   updat_time:{type:String},
   email_address:{type:String},
},

random_number:{
	type:Number,
	required:true,
	
},

types:{
	type:String,
	required:false,
	
},


shipping_price:{
	type:Number,
	required:false,
	default:0
},

t_price:{
	type:String,
	required:false,
	default:0
},

isPaid:{
	type:Boolean,
	required:false,
	default:false
},
PaidAt:{
	type:String
},
deleverAt:{
	type:String
},
status:{
	type:String,
default:"New"
},	

order_date:{
	type:Date,
default:Date ()},	


},{timestamps:true});

module.exports=orderModel=mongoose.model('order',orderSchema);


