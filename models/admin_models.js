// creat admin model schema
const mongoose=require('mongoose');
const adminSchema = new mongoose.Schema({
name:{
	type:String,
	required:true,
},
email:{
	type:String,
	required:true,
},

password:{
	type:String,
	required:true,
},

image: {
       type: String,
 },

 is_admin:{
           type:Number,
           default:1
},
 



},{timestamps:true});
module.exports = adminModel= mongoose.model("admin",adminSchema);