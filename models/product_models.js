// create term us model schema
const mongoose=require('mongoose');
const productSchema = new mongoose.Schema({

product_name:{
	type:String 
},

product_type:{
	type:String 
},

category_name:{
	type:String 
},


text:{
	type:String 
},

products:{
	type:String 
},

price:{
	type:String,
},

selling_price:{
	type:String,
},

rent_selling_price:{
	type:String,
},


rent_price:{
	type:String,
},

discount_price:{
	type:String,	
},

rent_discount_price:{
	type:String,	
},

p_price2:{
	type:String,
},
p_price3:{
	type:String,
},
p_price4:{
	type:String,
},
p_price6:{
	type:String,
},
p_price9:{
	type:String,
},
p_price12:{
	type:String,
},

v_price2:{
	type:String,
},
v_price3:{
	type:String,
},
v_price4:{
	type:String,
},
v_price6:{
	type:String,
},
v_price9:{
	type:String,
},

v_price12:{
	type:String,
},


delevery_time:{
	type:String,	
},
refund_pollicy:{
	type:String,	
},
category_id:{
	type:String,	
},

subcategory_id:{
	type:String,	
},

instock:{
       type:String,
},

description:{
		type:String,
	},

	dimensions:{
		type:String,
	},
	height:{
		type:String,
	},
	width:{
		type:String,
	},
	length:{
		type:String,
	},

	type_product:{
		type:String,
	},
	type_of_finish:{
		type:String,
	},
	
tenures_availabe:[],
size:[],
color:[],


offer:{
	type:String,
},
images:{
	type:Array,
},


},{timestamps:true});
module.exports =productModel= mongoose.model("product", productSchema);