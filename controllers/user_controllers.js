
// import dependancies and models in controllers js files
const User=require("../models/user_models");
const Contact=require("../models/contact_us_models");
const About=require("../models/about_us_models");
const Term=require("../models/term_models");
const Pollicy=require("../models/p_pollicy_models");
const Banner=require("../models/banner_models");
const Category=require("../models/category_models");
const Faq=require("../models/faq_models");
const City_list=require("../models/city_list_models");
const Feature=require("../models/our_features_models");
const Feedback=require("../models/feedback_models");
const Offer=require("../models/offer_models");
const Product=require("../models/product_models");
const Return_pollicy=require("../models/return_pollicy_models");
const Shipping_pollicy=require("../models/shipping_pollicy_models");
const Refferal_term=require("../models/refferal_term_models");
const Cart=require("../models/cart_models");
const Like=require("../models/like_models");
const Rent_benifit=require("../models/rent_benifit_models");
const Location=require("../models/location_models");
const Sub_Category=require("../models/sub_category_models");
const Order_summery=require("../models/order_summery_models");
const Order=require("../models/order_product_models");
const Kyc=require("../models/kyc_models");
const Review=require("../models/reviews_models");
const Payment=require("../models/payment_models");
const nodemailer = require("nodemailer");
const Gst=require("../models/gst_models");
const Delivery=require("../models/d_charge_models");



// create Register api using post method
const User_Signup=async(req,res)=>{
	
	const {name,email,phone,password}=req.body;
    // exist user
	const register_user= await User.findOne({phone});
	if(register_user){
	 res.status(400).json({
        result:"false",
        message:"user allready registered, please go to login page..",  
    });

	}else{
		if(name && email && phone && password){

	    try{
            const user = new User({name,email,phone,password,referral_code})
		    const user_data=await user.save()
	        res.status(200).json({
                result:"true",
                message:"user registered sucessfully..",data:user_data});
	    }catch(error){
	        res.status(400).json({result:"false",
                message:"user does not register please try again.."
            })
        }
    }else{
		res.status(400).json({
            result:"false",
            message:"parameter required name, email, phone, password "
        });
	}
}
};







//create user login api
 const User_Login =async(req,res)=>{
 	const {phone,password} =req.body;

    try{
 		if(phone && password){
 			const user = await User.findOne({phone:phone,password:password});
 			if(user != null){
 			    res.status(200).json({
                    result:"true",message:'user sucessfully login..',
                    data:user
                });
            }else{
                res.status(400).json({
                    result:"false",message:'please enter correct phone & password..'
                });
            }
        }else{
           res.status(400).json({
            result:"false",
            message:'parameter required phone & password..'
        });	
        }        
 	}catch(error){
 	    console.log(error.message)
 	}
};




// create user profile update api
const UserProfile=async(req,res)=>{
    const {userId}=req.body;
    try{
    const user_profile= await User.findOne({"_id":userId});
    if(user_profile){
        if(req.file){
            var profileRecord={
        userId:req.body.userId,
        image:req.file.filename
    }

   }else{
var profileRecord={
       userId:req.body.userId,
        
    }
   }
 const updateUser_data= await User.findOneAndUpdate({"_id":req.body.userId},(profileRecord),     
{new:true});
       const profile=await updateUser_data.save();
   res.send({result:"true", message: "user profile updated successfully.",
   path:"http://103.104.74.215:3009/uploads/",data:profile}) 
    
    }else{
         res.status(400).json({result:"false",message:"parameter required userId and image"});
    }
        
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};




// create user google login api
const GooleLogin=async(req,res)=>{
const {google_id,name,email}=req.body;
    try{
        let existingUser = await User.findOne({ google_id:google_id});
        if(google_id && name && email){
            let existingUser = await User.findOne({ google_id:google_id});
            if (!existingUser) {
                const newUser = new User({
                      google_id:google_id,
                      name:name,
                      email:email,
                     
 
});
       const user = await newUser.save();
       res.status(200).json({
        result:"true",
        message:"You are login sucessfully",
        data:user
    })
}else{
res.send({result:"false",message:"You are allready login"})
}
            }else{
                res.send({result:"false",message:"parameter required google_id,name,email"});
            }

        }
        catch(error){
            console.log(error.message)
            res.status(400).json({
                result:"false",
                message:"You are not login",
                message:error.message
        })
    }
 };






// create user facebook login api
const FacebookLogin=async(req,res)=>{
const {facebook_id,name,email}=req.body;
    try{
        let existingUser = await User.findOne({ facebook_id:facebook_id});
        if(facebook_id && name && email){
            let existingUser = await User.findOne({ facebook_id:facebook_id});
            if (!existingUser) {
                const newUser = new User({
                    facebook_id:facebook_id,
                      name:name,
                      email:email,
                     
 
});
       const user = await newUser.save();
       res.status(200).json({
        result:"true",
        message:"You are login sucessfully",
        data:user
    })
}else{
res.send({result:"false",message:"You are allready login"})
}
            }else{
                res.send({result:"false",message:"parameter required facebook_id,name,email"});
            }

        }
        catch(error){
            console.log(error.message)
            res.status(400).json({
                result:"false",
                message:"You are not login",
                message:error.message
        })
    }
 };



// create user twiter login api

const TwiterLogin=async(req,res)=>{
const {twiter_id,name,email}=req.body;
    try{
        let existingUser = await User.findOne({ twiter_id:twiter_id});
        if(twiter_id && name && email){
            let existingUser = await User.findOne({ twiter_id:twiter_id});
            if (!existingUser) {
                const newUser = new User({
                      twiter_id:twiter_id,
                      name:name,
                      email:email,
                     
 
});
       const user = await newUser.save();
       res.status(200).json({
        result:"true",
        message:"You are login sucessfully",
        data:user
    })
}else{
res.send({result:"false",message:"You are allready login"})
}
            }else{
                res.send({result:"false",message:"parameter required twiter_id,name,email"});
            }

        }
        catch(error){
            console.log(error.message)
            res.status(400).json({
                result:"false",
                message:"You are not login",
                message:error.message
        })
    }
 };




//  create contact us list api for app side
 const Contact_List=async(req,res)=>{
   try{
    const data= await Contact.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};




//  create about list api for app side
 const About_List=async(req,res)=>{
   try{
    const data= await About.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};



// create faq list api for app side
 const Faq_List=async(req,res)=>{
   try{
    const data= await Faq.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};




//  create about list api for app side
 const Pollicy_List=async(req,res)=>{
   try{
    const data= await Pollicy.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};



// create faq list api for app side
 const Term_List=async(req,res)=>{
   try{
    const data= await Term.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};




//  create about list api for app side
 const Banner_List=async(req,res)=>{
   try{
    const data= await Banner.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};



// create faq list api for app side
 const Category_List=async(req,res)=>{
   try{
    const data= await Category.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};



//  create city list api for app side
 const City_List=async(req,res)=>{
   try{
    const data= await City_list.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};




//  create city list api for app side
 const Feature_api=async(req,res)=>{
   try{
    const data= await Feature.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};





//  create Feedback_api list api for app side
 const Feedback_api=async(req,res)=>{
   try{
    const data= await Feedback.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};





//  create OfferList_api list api for app side
 const OfferList_api=async(req,res)=>{
   try{
    const data= await Offer.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};





//  create ProductList_api list api for app side
 const ProductList_api=async(req,res)=>{
   try{
    const data= await Product.find({product_type:"Buy"});
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};



//  create  Rent ProductList_api list api for app side
 const RentProductList_api=async(req,res)=>{
   const {categoryId}=req.body;
    try{
        if(!categoryId){
            res.status(400).json({result:"false",message:"parameter required categoryId"});
            }else{ 
    const products= await Product.find({"category_id":categoryId,product_type:"Rent"});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3008/uploads/",data:products}) 
   } 
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};


//  create Recet Buy ProductList_api list api for app side
 const RecentBuyProductList_api=async(req,res)=>{
   try{
    const data= await Product.find({product_type:"Buy"}).sort( { createdAt: -1 } ).limit(10);
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};



//  create  Recent Rent ProductList_api list api for app side
 const recentRentProductList_api=async(req,res)=>{
   try{
    const data= await Product.find({product_type:"Rent"}).sort( { createdAt: -1 } ).limit(10);
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};










// create product Details api
const ProductDetails=async(req,res)=>{
    const {productId}=req.body;
    try{
        if(!productId){
            res.status(400).json({result:"false",message:"parameter required productId"});
            }else{ 
    const products= await Product.findOne({"_id":productId});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3008/uploads/",data:products}) 
   
   } 
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};



// create categoryProduct api list
const categoryProduct_llist=async(req,res)=>{
    const {categoryId}=req.body;
    try{
        if(!categoryId){
            res.status(400).json({result:"false",message:"parameter required categoryId"});
            }else{ 
    const products= await Product.find({"category_id":categoryId,product_type:"Buy"});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3008/uploads/",data:products}) 
   } 
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};




// create sort productname on category base api list
const SortProduct_list=async(req,res)=>{
    const {product_name}=req.body;
    try{
         
    const products= await Product.find({}).sort({"product_name":1});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3008/uploads/",data:products}) 
   
    }catch(error){
       
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};




// create sort productname on category base api list
const SortProductDsc_list=async(req,res)=>{
    const {product_name}=req.body;
    try{
        
    const products= await Product.find({}).sort({"product_name":-1});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3008/uploads/",data:products}) 
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};







// create sumcategoryBuyProduct api list
const subcategoryBuyProduct_list=async(req,res)=>{
    const {subcategoryId}=req.body;
    try{
        if(!subcategoryId){
            res.status(400).json({result:"false",message:"parameter required subcategoryId"});
            }else{ 
    const products= await Product.find({"subcategory_id":subcategoryId,product_type:"Buy"});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3008/uploads/",data:products}) 
   } 
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};



// create sumcategoryRentProduct api list
const subcategoryRentProduct_list=async(req,res)=>{
    const {subcategoryId}=req.body;
    try{
        if(!subcategoryId){
            res.status(400).json({result:"false",message:"parameter required subcategoryId"});
            }else{ 
    const products= await Product.find({"subcategory_id":subcategoryId,product_type:"Rent"});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3008/uploads/",data:products}) 
   } 
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};








//create likeUser
const likePost=async(req,res)=>{
    const{userId,productId}=req.body;
    if(userId){
    try{
            const like=await Product.findOne({"_id":productId});
            if(!like.likes.includes(userId)){
            const likedata= await like.updateOne({$push:{likes:userId}});
                res.status(200).json({result:"true",message:"user liked"});
            }else{
                if(like.likes.includes(userId)){
                await like.updateOne({$pull:{likes:userId}});
                res.status(200).json({result:"true",message:"user unliked"});
            }else{
                res.status(400).json("user  allready unliked by you");
            }
            }

        }catch(error){
            res.status(500).json(error.message);

        }
    }else{
        res.status(403).json("require parameter userId and productId");
    }

};









//create likeUser
const like_api=async(req,res)=>{
    const{userId,productId,status}=req.body;
    if(userId && productId){
    try{

        const dinu=await Like.findOne({"userId":userId,"productId":productId});
        if(dinu){
            const dinudata=await Like.findOneAndUpdate({"productId":productId},{$set:{status}},{new:true});
            const updatedata=await dinudata.save();
            res.status(200).json({result:"true",message:"data updated successfully",data:updatedata})

        }
            
       
        else{

            const like= new Like({userId,productId,status});
            const likedata=await like.save();

            const data=  await Product.findByIdAndUpdate({"_id":productId},{$push:{status:productId}});  
            res.status(200).json({result:"true",message:"data add sucessfully",data:likedata});
          
    }  
        }catch(error){
            res.status(500).json(error.message);

        }
    }else{
        res.status(403).json("require parameter userId and productId,status");
    }

};










/*//create wish list api
 const Wishlist_api=async(req,res)=>{
   try{
    const {userId}=req.body;
    const data= await Product.find({likes:[(userId)]});
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" required parameter is userId"
        })
    }
    
    }catch(error){
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};

*/


//create wish list api
 const Wishlist_api=async(req,res)=>{
   try{
    const {userId}=req.body;
    if(userId){
    const data= await Like.find({$and:[{"userId":userId},{"status":1}]}).populate('productId');
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" required parameter is userId"
        })
    }
}else{
    res.status(400).send({result:"false",message:"required parameters are userId"});
}
    
    }catch(error){
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};






// create search api
const ProductSearchApi=async(req,res)=>{
    try{
      const {key} =req.body;
      if(!key){
        res.status(400).json({result:"false",message:" required parameter is key",}) 
      }else{
      const data_name=await Product.find(
               
    {"$or":[
    {"product_name":{$regex:".*"+key+".*",$options:"i"}},
      {"price":{$regex:".*"+key+".*",$options:"i"}} 
      ]}
    )    
//check condition
    if(data_name.length>0){
        res.status(200).send({
        result:"true",
        message:"your result are",
        path:"http://103.104.74.215:3008/uploads/",
        data:data_name
    });
      }else{
           res.status(400).send({
            result:"false",
            message:"result is not found",
            data:data_name
        })  
    }
 }
}catch(error){
            res.status(400).send({result:"false",message:error.message});
        }
        };
    




//creat user details api
const UserDetails=async(req,res)=>{
    const {userId}=req.body;
    try{
        if(!userId){
            res.status(400).json({result:"false",message:"parameter required userId"});
            }else{ 
    const products= await User.findOne({"_id":userId});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3008/uploads/",data:products}) 
   } 
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};



//  create about list api for app side
 const Shipping_List=async(req,res)=>{
   try{
    const data= await Shipping_pollicy.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};



//  create about list api for app side
 const Return_List=async(req,res)=>{
   try{
    const data= await Return_pollicy.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};



//  create about list api for app side
 const Refferal_List=async(req,res)=>{
   try{
    const data= await Refferal_term.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};



// create  add  cart api 
const AddCart_api=async(req,res)=>{
    //const {userId,delevery_charge,total_price,items,discount,productId,color,size,qty,duration,orderItems}=req.body;
    const {unique,userId,delevery_charge,total_price,productId,color,size,qty,duration}=req.body;
    
try{
    const Rauniyar=await Cart.findOne({"userId":userId,"productId":productId,status:"pending"});
    if(Rauniyar){
         res.status(400).send({result:"false",message:"productId exist"});
}else{

if(userId){
    //const product=new Cart({userId,delevery_charge,total_price,items,discount,orderItems});
     const product=new Cart({userId,delevery_charge,total_price,productId,color,size,qty,duration});
    
    const result=await product.save();
    res.status(200).json({result:"true",message:"data add sucessfully",data:result});
}else{
    res.status(400).send({result:"false",message:"required parameters are userId,delevery_charge,total_price,productId,color,size,qty,duration},]"});
  }
}
    }catch(error){
        res.status(400).send({result:"false",message:"get some error", msg:error.message});
    }

};










/*
// create  add  cart api 
const AddCart_api=async(req,res)=>{
    //const {userId,delevery_charge,total_price,items,discount,productId,color,size,qty,duration,orderItems}=req.body;
    const {userId,delevery_charge,price,productId,color,size,qty,duration,gst,product_name}=req.body;
    
try{
    const Rauniyar=await Cart.findOne({"userId":userId,"productId":productId});
    if(Rauniyar){
         res.status(400).send({result:"false",message:"productId exist"});
}else{

if(userId){
    //const product=new Cart({userId,delevery_charge,total_price,items,discount,orderItems});
     const product=new Cart({userId,delevery_charge,price,productId,color,size,qty,duration,gst,product_name,image:req.file.filename});
    
    const result=await product.save();
    res.status(200).json({result:"true",message:"data add sucessfully",data:result});
}else{
    res.status(400).send({result:"false",message:"required parameters are userId,delevery_charge,price,productId,color,size,qty,duration,gst,product_name,image"});
  }
}
    }catch(error){
        res.status(400).send({result:"false",message:"get some error", msg:error.message});
    }

};

*/












/*// create  cart list api
const cartlist =async(req,res)=>{
    
    try{
         const {userId,productId}=req.body;
         
        if(!userId && productId){
            res.status(400).json({result:"false",message:"required parameter is userId ,productId"})
        }else{

        const list=await Cart.find({$and:[{"userId":userId},{"productId":productId}]})
        res.status(200).json({result:"true",message:"your list are",
            path:"http://103.104.74.215:3008/uploads/",
            data:list})
}
    }catch(error){
         res.status(400).send({result:"false",message:"get some error", msg:error.message});

    }
};
*/


/*// create  cart list api
const cartlist =async(req,res)=>{
    
    try{
         const {userId}=req.body;
         
        if(!userId ){
            res.status(400).json({result:"false",message:"required parameter is userId "})
        }else{

       // const list=await Cart.find({"userId":userId}).populate({path: "orderItems", populate: "productId" });
            const list=await Cart.find({"userId":userId}).populate('productId');
        res.status(200).json({result:"true",message:"your list are",
            path:"http://103.104.74.215:3008/uploads/",
            data:list})
}
    }catch(error){
         res.status(400).send({result:"false",message:"get some error", msg:error.message});

    }
};

*/









// create  cart list api
const cartlist =async(req,res)=>{
    
    try{
         const {userId}=req.body;
         
        if(!userId ){
            res.status(400).json({result:"false",message:"required parameter is userId "})
        }else{

       // const list=await Cart.find({"userId":userId}).populate({path: "orderItems", populate: "productId" });
            const list=await Cart.find({"userId":userId,status:"pending"}).populate('productId');
             //const list=await Cart.find({"userId":userId,"active":true});
        res.status(200).json({result:"true",message:"your list are",
            path:"http://103.104.74.215:3008/uploads/",
            data:list})
}
    }catch(error){
         res.status(400).send({result:"false",message:"get some error", msg:error.message});

    }
};










//create add like and remove like api
/*const like_api=async(req,res)=>{
    const{userId,productId,status}=req.body;
    try{
        if(userId && productId){
           const likes=await Like.findOne({"userId":userId,"productId":productId});
          
           if(!likes){
    const s=1;
    const product=new Like({userId,productId,status:s});
    const result=await product.save();
    res.status(200).json({result:"true",message:"data add sucessfully",data:result});
}else{

    const dislikes=await Like.findOne({"userId":userId,"productId":productId});

//start for loop
    for (let dd in dislikes) {
        if(dislikes.status==0){       
            const us=1;
     const product=await Like.findOneAndUpdate({userId,productId},{$set:{status:us}},
     {new:true});
    const result=await product.save();
    
}else{
    const uss=0;
     const product=await Like.findOneAndUpdate({userId,productId},{$set:{status:uss}},
{new:true});
    const result=await product.save();
 }
  }//for loop end
  const sanju=await Like.findOne({"userId":userId,"productId":productId});
  res.status(200).json({result:"true",message:"data remove sucessfully",data:sanju});
}
  
 }else{
}

    }catch(error){
        res.status(400).send({result:"false",message:"get some error", msg:error.message});
    }

};

*/

/*const like_api=async(req,res)=>{
    const{userId,productId,status}=req.body;
    try{
        if(userId && productId){
           const likes=await Like.findOne({"userId":userId,"productId":productId});   
           for(let dd in likes){
            if(likes.status==1){
            let s=0;      
     const product=await Like.findOneAndUpdate({userId,productId},{$set:{status:s}},
     {new:true});
    const result=await product.save();
    res.status(200).json({result:"true",message:"unlike sucessfully",data:result});
}else{

    const product=new Like({userId,productId,status:status});
    const result=await product.save();
    res.status(200).json({result:"true",message:"like sucessfully",data:result});
 }
  
 }
}else{
    res.status(400).json({result:"false",message:"require parameters are status,productId,userId"})
}

    }catch(error){
        res.status(400).send({result:"false",message:"get some error", msg:error.message});
    }

};




*/





// create delete or remove add cart api
 const cartDelete=async(req,res)=>{
    const{cartId}=req.body;
          
try{ 
if(cartId){         
    const data =await Cart.findByIdAndDelete({"_id":cartId});           
    if(data.length==0){
        res.status(400).json({result:"false",message:"record not found"});
    }else{
     res.status(200).json({result:"true", message: "list deleted successful", data:data});
    }
  
}else{
    res.status(400).send({result:"false",message:"required parameters are cartId "});
}
 }catch(error){
          res.send(error.message)
      }
    };





//  create rent pollicy list api for app side
 const rentbenifit_List=async(req,res)=>{
   try{
    const data= await Rent_benifit.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};




//create address update api 
 const AddressUpdate= async(req,res)=>{
    try{
         const addressData={userId,address,pincode,city,addressId,land_Mark}=req.body;
    if(userId && address && pincode && city && addressId){
       const location=await Location.findOne({"userId":userId,"_id":addressId});
       if(location) {
   const Address_data= await  Location.findOneAndUpdate({userId:req.body.userId},{$set:{address,pincode,city,land_Mark,
    /*geo_location:{
            type:"Point",
        coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.lettitude)]
    }*/
}},
{new:true});
     res.status(200).json({result:"true", message: "Delevery address updated successfully.",data:Address_data })
       
    }else{
        res.status(400).json({result:"false",message:"userId and addressId are not match"});

    }
     }else{
        res.status(400).json({result:"false",message:"required parameters are userId,address,pincode,city,addressId"})

   }

 }catch(error){
    res.status(400).json({result:"false",message:"got some error", message:error.message});
 }
};



//create address add api 
 const Address= async(req,res)=>{
    try{
         const addressData={userId,address,pincode,city,land_Mark}=req.body;
    if(userId && address && pincode && city){

        const addressLocation =new Location({
            userId,address,pincode,city,land_Mark,/*geo_location:{
            type:"Point",
           coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.lettitude)]
    }*/
  });
        const user_location_data = await addressLocation .save();
        res.status(200).json({result:"true",message:"address location insert sucessfully",data:user_location_data});

     }
   else{res.status(400).json({result:"false",message:"required parameters are userId,address,pincode,city"})
}
 }catch(error){
    res.status(400).json({result:"false",message:"got some error", message:error.message});
 }
};



// create address list api
const Address_list=async(req,res)=>{
    const {userId}=req.body;
    try{
        if(!userId){
            res.status(400).json({result:"false",message:"userId is required"})

        }else{
            const datalist=await Location.find({"userId":userId}).sort({"createdAt":-1}).limit(10);
            res.status(200).json({result:"true",message:"requred data here",data:datalist})
        }

    }catch(error){
        res.status(400).json({result:"false",message:error.message})
    }

};



// create address delete api
const Address_delete=async(req,res)=>{
    const {userId,addressId}=req.body;
    try{
        if(userId && addressId){
            const data =await Location.findOneAndDelete({"userId":userId,"_id":addressId});
            res.status(200).json({result:"ture",message:"data deleted successfully",data:data})

        }else{
            res.status(400).json({result:"false",message:"required parameters are userId and addressId"});
        }
    }catch(error){
        res.status(400).json({result:"false",message:error.message});

    }

};









// create sub category list api for app side
 const Sub_Category_List=async(req,res)=>{
    const {categoryId}=req.body;
   try{
    if(!categoryId){
        res.status(400).json({result:"false",message:"required parameters is categoryId"})
    }
    const data= await Sub_Category.find({"categoryId":categoryId});
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};




//create order summery api
const ordersummery=async(req,res)=>{
    const {total_price,userId}=req.body;
    try{
        if(userId){
            const raju=await Order_summery.findOne({"userId":userId});
            if(raju){
                const lakhan=await Order_summery.findOneAndUpdate({"userId":userId},{$set:{total_price}},{new:true});
                const updatedata=await lakhan.save();
                res.status(200).json({result:"true",message:"data updated successfully",data:updatedata});
            }else{
            
        const data=new Order_summery({total_price});
        const raja=await data.save();
        res.status(200).json({result:"true",message:"data add sucessfully",data:raja})
    }
}else{
    return res.send("required parameters are total_price,userId,")
}
    }catch(error){
        res.status(400).json({result:"false",message:error.message});
    }

};




//create ordersummery _list api
const ordersummery_list=async(req,res)=>{
     try{
         const {userId,summeryId}=req.body;
         
        if(!userId ){
            res.status(400).json({result:"false",message:"required parameter is userId,summeryId "})
        }else{

        const list=await Cart.find({"userId":userId,status:"pending"}).populate('productId');
        const dinesh=await Order_summery.find({"_id":summeryId});
   
          res.status(200).json({result:"true",message:"your list are",
            path:"http://103.104.74.215:3008/uploads/",
            data:list,dinesh})



}
    }catch(error){
         res.status(400).send({result:"false",message:"get some error", msg:error.message});

    }


};






// create oder product api
const OrderProduct=async(req,res)=>{
    try{
    const ram = Math.floor(100000 + Math.random() * 900000);

    const{random_number,types,userId,ShippingAddressId,t_price,shipping_price,isPaid,PaidAt,deleverAt,tax_price,paymentMode,paymentMethod,status,duration}=req.body;

     if(userId && t_price){


    const order=new Order({random_number:ram,types,userId,ShippingAddressId,t_price,shipping_price,isPaid,PaidAt,deleverAt,tax_price,paymentMode,paymentMethod,status,duration,
    
    paymentResult:{
    id:req.body.id,
    status1:req.body.status1,
    updat_time:req.body.updat_time,
    email_address:req.body.email_address,

},

});
    const data= await order.save();
    
// update status
    const updatedata=await Cart.find({"userId":userId,status:"pending"}).populate('productId');
   
for(i=0;i<updatedata.length;i++){
    const cart_id=updatedata[i]._id;
       if(cart_id){
        const radha=await Cart.findOneAndUpdate({"_id":cart_id},{$set:{status:"placed",unique:ram}},{new:true});
       }
}

//update instock
    const qtyupdate=await Cart.find({"userId":userId,status:"pending"}).populate('productId');
    for(i=0;i<updatedata.length;i++){
    const quantity=updatedata[i].qty;
    const quantitys=updatedata[i].productId.instock;
    const product_Id=updatedata[i].productId._id;
       if(product_Id){
         const abs=Number(quantitys-quantity)
        const qtys=await Product.findOneAndUpdate({"_id":product_Id},{$set:{instock:abs}},{new:true});
       }
}


 res.status(200).json({result:"true",message:"data insert sucessfully",data:data});
 }else{
     res.send("required parameters are userId,ShippingAddressId,t_price");
 }
}catch(error){
    res.status(400).json({result:"false",message:error.message});

}

};




/*
//create order history api
const orderhistory=async(req,res)=>{
    const{userId}=req.body;
    try{
         if(userId){

     const list=await Cart.find({"userId":userId,status:{$ne:"pending"}}).populate('productId');
    res.status(200).json({result:"true",message:"required list are",data:list});
}else{
    res.status(400).json({result:"false",message:"required parameter is userId "});
}
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }
};

*/



//create order history api
const orderhistory=async(req,res)=>{
    const{userId}=req.body;
    try{
         if(userId){

     const list=await Order.find({"userId":userId});
    res.status(200).json({result:"true",message:"required list are",data:list});
}else{
    res.status(400).json({result:"false",message:"required parameter is userId "});
}
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }
};






//create order history api
const close_order=async(req,res)=>{
    const{userId}=req.body;
    try{
         if(userId){

     const list=await Cart.find({"userId":userId,status:"Delivered"},{userId:0,_id:0}).populate('productId');
     //const dinesh=await Order.find({"userId":userId},{_id:1,order_date:1});

  // const data=[...list, ...dinesh ]

if(list.length>0){
    res.status(200).json({result:"true",message:"required list are",data:list});
}else{
    res.status(400).json({result:"false",message:"data does not found"});
}
}else{
    res.status(400).json({result:"false",message:"required parameter is userId "});
}
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }
};




// create order details api
 const orderDetails=async(req,res)=>{
 const {orderId}=req.body;
    try{
        if(orderId){
   const dinesh=await Order.find({"_id":orderId});
   const dinu= dinesh[0].random_number;    
  const list=await Cart.find({unique:dinu}).populate('productId');
    res.status(200).json({result:"true",message:"required list are",data:list});
}else{
  res.status(400).json({result:"false",message:"required parameter is orderId"})  
}
}catch(error){
    res.status(400).json({result:"false",message:error.message});
 }
};






//create user change password  api for website
const changePassword=async(req,res)=>{
    try{
        const {email,userId,password}=req.body;
        if(email && userId){
         const validation=await User.findOne({"_id":userId,"email":email});
         if(validation) {  
        const data=await User.findOneAndUpdate({"_id":userId,"email":email},{$set:{password},new:true});
        const userdata=await data.save();
        res.status(200).json({result:"true",message:"data updated successfully",data:data});
}else{
    return res.send("your email address is wrong")
   
}
}else{
    return res.status(400).json({result:"false",message:"required parameters are userId ,email,password"});
}

    }catch(error){
        res.status(400).json({result:"false",message:error.message});
    }

};





//create reset password api on gmail
const resetPassword=async(req,res)=>{
    const {email}=req.body;
    try{
        if(email ){
                  function generatePassword() {
        var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
      return retVal;
    }
    var password = generatePassword();
    
    const validation=await User.findOne({"email":email});
         if(validation) {  
    const data =await User.findOneAndUpdate({"email":email},{$set:{password},new:true});
    const userdata = await data.save();

            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'aryan@eterior.in',
                pass: 'eqisxmvaunwenvml'
            }
        });

        var mailOptions = {
            from: 'dinuthecoder@gmail.com',
            to: email,
            subject: "new password send your register email from Yuonair",
            html: "<h4>email : "+email+"</h4><h4>password : "+password.toString()+"</h4>"
        }
         
        transporter.sendMail(mailOptions, function(err, result){
            if(err) {
                res.json({
                    result:'false',
                    msg: 'email does not exist..',
                })
            }
            else{
                res.json({
                    result: 'true',
                    message :'password send successfully your email address please check your email..',
                    email:email,
                    password: password.toString(),
                   
                })
            }
        })//end here email operation
}else{
return res.send("your email address is wrong,please enter correct email")
}
}else{
    return res.send("required parameters are  email")
}
    }catch(error){
        res.status(400).json({result:"false",message:error.message})
    }
};





// create kyc  add api 
const kyc_api=async(req,res)=>{
    const {userId}=req.body;
try{
    if(userId){
const rauniyar =await Kyc.findOne({"userId":userId});
/*if(rauniyar.status=="verified"){
   res.send("Your kyc has been allready verified"); 
}else{*/

if(rauniyar){
  const arrayImage=[];
  for(let i=0;i<rauniyar.images.length;i++){
    arrayImage.push(rauniyar.images[i]);
    
}
arrayImage.push(req.file.filename);

    const dinu=await Kyc.findOneAndUpdate({"userId":userId},{$set:{images:arrayImage}},{new:true});
     res.status(200).json({result:"true",message:"data updated sucessfully",data:dinu});
  
}else{
 const kyc=new Kyc({userId,images:req.file.filename});
const result=await kyc.save();
    res.status(200).json({result:"true",message:"data add sucessfully",data:result});
 }
//}
}else{
    res.status(400).json({result:"false",message:"required parameters are userId and images"})
}
    }catch(error){
        res.status(500).send({result:"false",message:"get some error", msg:error.message});
    }

};



//create kyc details api
const kyc_details_api=async(req,res)=>{
    const {userId}=req.body;
    try{
        if(userId){
    const data=await Kyc.findOne({"userId":userId},{status:1, _id: 1,createdAt:1 });
    const dinu=await Cart.findOne({"userId":userId,status:"active"},{duration: 1, _id: 0,total_price:1,images:1 }).populate('productId');
    const dinesh=await Order.findOne({"userId":userId,status: "active"},{_id:0,t_price:1 });

const rauniyar={"requestId":data._id,"request_date":data.createdAt,"status":data.status,"duration":dinu.duration,"total_price":dinu.total_price,"image":dinu.productId.images[0],"deposite":dinesh.t_price}

res.status(200).json({result:"true",message:"kyc details",
    path:"http://103.104.74.215:3008/uploads/",
    data:rauniyar
});

    
}else{
     res.status(400).json({result:"false",message:"required parameters are userId "})
}
}catch(error){
     res.status(500).send({result:"false",message:"get some error", msg:error.message});
}
};




// create order active list api
const Total_deposite_list_api=async(req,res)=>{
    const {userId}=req.body;
    try{
        if(userId){
     const list=await Cart.find({"userId":userId,status:"active"}).populate('productId');
     const dinesh=await Order.find({"userId":userId,status:"active"},{_id:1,order_date:1,t_price:1});
res.status(200).json({result:"true",message:"required list are",
    path:"http://103.104.74.215:3008/uploads/",
    data:list,dinesh
});

    
}else{
     res.status(400).json({result:"false",message:"required parameters are userId "})
}
}catch(error){
     res.status(500).send({result:"false",message:"get some error", msg:error.message});
}
};




// create order active list api
const active_deposite_list_api=async(req,res)=>{
    const {userId}=req.body;
    try{
        if(userId){
     const list=await Cart.find({"userId":userId,status:"active"}).populate('productId');
     const dinesh=await Order.find({"userId":userId,status:"active"},{_id:1,order_date:1});
res.status(200).json({result:"true",message:"required list are",
    path:"http://103.104.74.215:3008/uploads/",
    data:list,dinesh
});

    
}else{
     res.status(400).json({result:"false",message:"required parameters are userId "})
}
}catch(error){
     res.status(500).send({result:"false",message:"get some error", msg:error.message});
}
};



// create order active list api
const refund_deposite_list_api=async(req,res)=>{
    const {userId}=req.body;
    try{
        if(userId){
     const list=await Cart.find({"userId":userId,status:"active",refund_status:"1"}).populate('productId');
     const dinesh=await Order.find({"userId":userId,status:"active"},{_id:1});
    if(list.length>0){   
    res.status(200).json({result:"true",message:"required list are",
    path:"http://103.104.74.215:3008/uploads/",
    data:list,dinesh
});
}else{
 res.status(400).json({result:"false",message:"data does not found",
    })
    }
    
}else{
     res.status(400).json({result:"false",message:"required parameters are userId "})
}
}catch(error){
     res.status(500).send({result:"false",message:"get some error", msg:error.message});
}
};









//create add payment api
const Add_payment_api=async(req,res)=>{
    const {userId,trnsId,amount,title}=req.body;
try{
    if(userId && trnsId && amount){
 const payments=new Payment({userId,trnsId,amount,title});
 const result=await payments.save();
    res.status(200).json({result:"true",message:"data add sucessfully",data:result});
 }
else{
    res.status(400).json({result:"false",message:"required parameters are userId trnsId ,amount"})
}
    }catch(error){
        res.status(500).send({result:"false",message:"get some error", msg:error.message});
    }


};





// create user reviews api
const Reviews_api=async(req,res)=>{
    const {productId,userId,ratings,comment,name}=req.body;
    try{
        if(userId && productId){
    
        const rating=new Review ({ratings,comment,userId,productId,name});
        const data=await rating.save();
        res.status(200).json({result:"true",message:"data sucessfully",data:data});

    
}else{
     res.status(400).json({result:"false",message:"required parameters are userId,productId,ratings,comment,name"});
}
} catch(error){
    res.status(400).json({result:"false",message:error.message});

 }

};




// create review list api
const reviews_list=async(req,res)=>{
    const {productId}=req.body;
    try{
        if(!productId){
            res.status(400).json({result:"false",message:"parameter required productId"});
            }else{ 
    const products= await Review.find({productId},{_id:0,createdAt:0,updatedAt:0});
   
   res.send({result:"true", message: "your list are.",
   path:"https://admin.krazeal.com/uploads/",data:products}) 
   } 
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};





//create extend subscription  api on gmail
const subscription_request=async(req,res)=>{
    const {orderId,message}=req.body;
    try{
        if(orderId && message){
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'aryan@eterior.in',
                pass: 'eqisxmvaunwenvml'
            }
        });

        var mailOptions = {
            from: 'aryan@eterior.in',
            to:'vranjanhit@gmail.com',
            subject: "Extend subscription request",
            html: "<h4>orderId:"+orderId+"</h4><h4>message: "+message+"</h4>"
        }
         
        transporter.sendMail(mailOptions, function(err, result){
            if(err) {
                res.json({
                    result:'false',
                    msg: 'email does not exist..',
                })
            }
            else{
                res.json({
                    result: 'true',
                    message :'password send successfully your email address please check your email..',
                    orderId:orderId,
                    message:message,
                   
                })
            }
        })//end here email operation
    }else{
       res.status(400).json({result:"false",message:"required parameters are orderId,message"}) 
    }

    }catch(error){
        res.status(400).json({result:"false",message:error.message})
    }
};




// create like list api 
const total_like_list=async(req,res)=>{
    try{
    const data=await Product.aggregate([     
   {
      $lookup:
       {
          from: "likes",
          localField: "_id",
         foreignField: "productId", 
        as: "dinu"
       }
     
}])

  

    res.status(200).json({result:"true",message:"required list are",data:data});
}catch(error){
    res.status(400).json({result:"false",message:error.message});
}
};





// create gst list api
const gst_list=async(req,res)=>{
    try{     
    const products= await Gst.find({},{_id:0,__v:0,});
   
   res.send({result:"true", message: "your list are.",
   path:"https://admin.krazeal.com/uploads/",data:products})  
    }catch(error){
      
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};




// create delivery list api
const delevery_list=async(req,res)=>{
    try{     
    const products= await Delivery.find({},{_id:0,__v:0,});
   res.send({result:"true", message: "your list are.",
   path:"https://admin.krazeal.com/uploads/",data:products})  
    }catch(error){
      
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};





module.exports ={
User_Signup,
User_Login,
UserProfile,
GooleLogin,
FacebookLogin,
TwiterLogin,
Contact_List,
About_List,
Faq_List,
Banner_List,
Term_List,
Pollicy_List,
Category_List,
City_List,
Feature_api,
Feedback_api,
OfferList_api,
ProductList_api,
ProductDetails,
categoryProduct_llist,
likePost,
Wishlist_api,
ProductSearchApi,
UserDetails,
Shipping_List,
Refferal_List,
Return_List,
AddCart_api,
cartlist,
like_api,
cartDelete,
rentbenifit_List,
RentProductList_api,
AddressUpdate,
RecentBuyProductList_api,
recentRentProductList_api,
Sub_Category_List,
subcategoryBuyProduct_list,
subcategoryRentProduct_list,
ordersummery,
ordersummery_list,
SortProduct_list,
SortProductDsc_list,
Address,
Address_list,
Address_delete,
OrderProduct,
orderhistory,
orderDetails,
changePassword,
resetPassword,
kyc_api,
kyc_details_api,
close_order,
Add_payment_api,
Total_deposite_list_api,
active_deposite_list_api,
refund_deposite_list_api,
Reviews_api,
reviews_list,
subscription_request,
total_like_list,
delevery_list,
gst_list

};