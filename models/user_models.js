// creat user model schema
const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
name:{
	type:String,
	required:true,
},
email:{
	type:String,
	required:true,
},
phone:{
	type:String,
	required:false,
},
password:{
	type:String,
	required:false,
},
referral_code:{
	type:String,
	required:false,
},
image: {
       type: String,
 },

google_id: {
            type: String,
 },
 facebook_id: {
             type: String,
 },

 twiter_id: {
            type: String,
 },

 is_user:{
           type:Number,
           default:0
},
 



},{timestamps:true});
module.exports = UserModel= mongoose.model("user",userSchema);