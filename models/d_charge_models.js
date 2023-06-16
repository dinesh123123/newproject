// create d_charge us model schema
const mongoose=require('mongoose');
const d_chargeSchema = new mongoose.Schema({

d_charge:{
	type:String
	 
},



});
module.exports =d_chargeModel= mongoose.model("d_charge",d_chargeSchema);