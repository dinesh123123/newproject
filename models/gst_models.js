// create gst us model schema
const mongoose=require('mongoose');
const gstSchema = new mongoose.Schema({

gst:{
	type:String
	 
},



});
module.exports =gstModel= mongoose.model("gst",gstSchema);