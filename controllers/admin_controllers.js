// import dependancies and models in controllers js files
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
const Rent_benifit=require("../models/rent_benifit_models");
const Sub_Category=require("../models/sub_category_models");
const Admin=require("../models/admin_models");
const Gst=require("../models/gst_models");
const Delivery=require("../models/d_charge_models");



//create gst post api
 const gst_api =async(req,res)=>{
   const{gst}=req.body;    
 try{
                    
        const user=new Gst({gst});
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      
};


//create delivery charge api  using post method
 const delivery_charge_api =async(req,res)=>{
   const{d_charge}=req.body;    
 try{
                    
        const user=new Delivery ({d_charge});
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      
};






//create admin login signup api
const admin_signup=async(req,res)=>{
    const {email,password,name}=req.body;
    try{
        const user= await Admin.findOne({email:email});
        if(user){
            res.status(400).json({result:"false",message:"admin allready exist"})
        }else{
        const data =new Admin({email,password,name});
        const list=await data.save();
        res.status(200).redirect("/public/index");/*json({result:"ture",message:"admin signup sucessfully",data:list});*/
}
    }catch(error){
res.status(400).json({result:"false",message:error.message})
    }

};


//create admin login signup page api
const admin_signup_page=async(req,res)=>{  
    res.render('admin_signup')
};



// create admin logout  api
 const AdminLogout=async(req,res) => {
    req.session.destroy();
    res.render('login');
};




// create contact us api using post method
const Contact_Us=async(req,res)=>{
	
	const {whatsapp,email_address}=req.body;
    // exist user
	const register_user= await Contact.findOne({email_address});
	if(register_user){
	 res.status(400).json({
        result:"false",
        message:"user allready send data",  
    });

	}else{
		if(whatsapp && email_address ){

	    try{
            const user = new Contact({whatsapp,email_address})
		    const user_data=await user.save()
	        res.status(200).json({
                result:"true",
                message:"contact us details are",data:user_data});
	    }catch(error){
	        res.status(400).json({result:"false",
                message:"data doest not send"
            })
        }
    }else{
		res.status(400).json({
            result:"false",
            message:"parameter required whatsapp, email_address "
        });
	}
}
};


//create privacy Policy post api
 const Privacy_Pollicy =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Pollicy({title,text})
        const result=await user.save()
         res.status(200).json({
        	result:"true",
        	message:"data add sucessfully",
        	data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
        	message:" get some error",
        	message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};




// create term and condiction api
//create privacy Policy post api
 const Term_Condiction =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Term({title,text})
        const result=await user.save()
         res.status(200).json({
        	result:"true",
        	message:"data add sucessfully",
        	data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
        	message:" get some error",
        	message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};





//create about us post api
 const About_Us =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new About({title,text})
        const result=await user.save()
         res.status(200).redirect("/public/aboutList");/*render('create_about.ejs',{
        	result:"true",
        	message:"data add sucessfully",
        	data:result
  })*/
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
        	message:" get some error",
        	message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};


// create about us  page api
const About_Uss=async(req,res)=>{
    res.status(200).render('create_about');

};



// craeate about us delete api
const aboutusDelete=async(req,res)=>{
        const id=req.params.id  
try{           
    const data =await About.findByIdAndDelete({"_id":id});           
    if(data.length==0){
        res.status(400).render('about',{msg:'Record not found'})
    }else{
     res.status(200).redirect('/public/aboutList');/*{ success: true, message: "list deleted successful", list: list}) */
    }
  }
 catch(error){
          res.send(error.message)
      }
    };




// create faq api
 const Faqs=async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Faq({title,text})
        const result=await user.save()
         res.status(200).json({
        	result:"true",
        	message:"data add sucessfully",
        	data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
        	message:" get some error",
        	message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};





// start create category api
const Category_api=async(req,res)=>{
    try{
         const {name}=req.body;
         const user_profile= await Category.findOne({name:name});
          if(user_profile){
        if(req.file){
            var profileRecord={
            name:name,
            image:req.file.filename
    }

   }else{
var profileRecord={
      name:name
    }
   }
 const updateUser_data= await Category.findOneAndUpdate({name:name},(profileRecord),      
{new:true}); 
   res.status(200).json({
   result:"true",
   message: "data updated successfully.",
   data:updateUser_data
})

}else{
const category=new Category({name:name,image:req.file.filename});
             if(name){
            const result = await category.save();
             res.status(200).redirect("/public/category");/*json({
             	result:"true",
             	message:"add sucessfully",
             	data:result
             });*/
 
  }else{ 
     res.status(400).json({result:"false",message:"required parameters name,image"})
  }
 }
}catch(error){
            res.status(500).send({result:"false",message:"get some error", msg:error.message});
        }
};


//end create category api



// create subcategory api
const Sub_Category_api=async(req,res)=>{
    try{
         const {name,categoryId}=req.body;
         const user_profile= await Sub_Category.findOne({name:name});
          if(user_profile){
        if(req.file){
            var profileRecord={
            name:name,
            categoryId:categoryId,
            image:req.file.filename
    }

   }else{
var profileRecord={
      name:name,
      categoryId:categoryId,
    }
   }
 const updateUser_data= await Sub_Category.findOneAndUpdate({name:name},(profileRecord),      
{new:true}); 
   res.status(200).redirect("/public/subcategory");/*json({
   result:"true",
   message: "data updated successfully.",
   data:updateUser_data
})*/

}else{
const category=new Sub_Category({name:name,categoryId:categoryId,image:req.file.filename});
             if(name){
            const result = await category.save();
             res.status(200).redirect("/public/subcategory");/*json({
                result:"true",
                message:"add sucessfully",
                data:result
             });*/
 
  }else{ 
     res.status(400).json({result:"false",message:"required parameters name,image,categoryId"})
  }
 }
}catch(error){
            res.status(500).send({result:"false",message:"get some error", msg:error.message});
        }
};







// create banner post api
const Banner_api =async(req,res)=>{
	const {title}=req.body;
	try{
	const category=new Banner({title:title,image:req.file.filename});
            const result = await category.save();
             res.status(200).redirect("/public/banner_list");/*json({
             	result:"true",
             	message:"add sucessfully",
             	data:result
             });	*/

	}catch(error){
		res.status(500).send({result:"false",message:"get some error", msg:error.message});
	}

};




// create city list post api
const City_list_api =async(req,res)=>{
    const {city}=req.body;
    try{
    const citylist=new City_list ({city:city,image:req.file.filename});
            const result = await citylist.save();
             res.status(200).json({
                result:"true",
                message:"add sucessfully",
                data:result
             });    

    }catch(error){
        res.status(500).send({result:"false",message:"get some error", msg:error.message});
    }

};



//create our_features api
const Features_api=async(req,res)=>{
    const {title,text,type}=req.body;
    try{
        const feautres_data=new Feature({title,text,type})
        const result=await feautres_data.save();
        res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    }catch(error){
        res.status(500).send({result:"false",message:"get some error", msg:error.message});
  }
};





// create sub category post api
const feedback_api =async(req,res)=>{
    const {title,text}=req.body;
    try{
    const category=new Feedback({title,text,image:req.file.filename});
            const result = await category.save();
             res.status(200).redirect("/public/user_feedbackFList");/*json({
                result:"true",
                message:"add sucessfully",
                data:result
             });    */

    }catch(error){
        res.status(500).send({result:"false",message:"get some error", msg:error.message});
    }

};




// create  offer list api post api
const Offer_api =async(req,res)=>{
    const {title,text,ex_date}=req.body;
    try{

    var OTP = Math.floor(1000 + Math.random() * 9000);
    const  create_data=new Offer({title,text,ex_date,code:OTP,image:req.file.filename});
            const result = await create_data.save();
             res.status(200).redirect("/public/offer_list");/*json({
                result:"true",
                message:"add sucessfully",
                data:result
             });    */

    }catch(error){
        res.status(500).render("create_offer",{result:"false",message:"get some error", msg:error.message});
    }

};



// create product add api 
const Product_api=async(req,res)=>{
    const {gst,d_charge,v_price2,v_price3,v_price4,v_price6,v_price9,v_price12,p_price2,p_price3,p_price4,p_price6,p_price9,p_price12,rent_selling_price,selling_price,products,product_name,product_type,category_name,title,text,rent_price,price,discount_price,rent_discount_price,delevery_time,refund_pollicy,
                 category_id,subcategory_id,instock,dimensions,type_product,type_of_finish,like,offer,height,width,length,description,userId}=req.body;
try{

 const arrayImage=[];
 for(let i=0;i<req.files.length;i++){
    arrayImage[i]=req.files[i].filename;
 }

const colors=["red","blue","black","white","pink","gray"];
const sizes=["single","double","queen size","king size","five","four"];
const months=["2 ","3 ","6 ","9 ","12"];


const a=Number(price);
const b=Number(discount_price);
const x=Number(a-b);

const p=Number(rent_price);
const q=Number(rent_discount_price);
const r=Number(p-q);
//const xx=Math.round(Number((x*100)/a));




    const product=new Product({v_price2,v_price3,v_price4,v_price6,v_price9,v_price12,p_price2,p_price3,p_price4,p_price6,p_price9,p_price12,rent_selling_price:r,selling_price:x,products,product_name,product_type,category_name,title,text,rent_price,price,discount_price,rent_discount_price,delevery_time,refund_pollicy,
                               color:colors,size:sizes,tenures_availabe:months,category_id,subcategory_id,instock,gst,d_charge,
                               dimensions,type_product,type_of_finish,images:arrayImage,like,offer,height,width,length,description,userId:[],});
    


    const result=await product.save();
    res.status(200).redirect("/public/product_list");/*.json({result:"true",message:"data add sucessfully",data:result});*/
    }catch(error){
        res.status(500).send({result:"false",message:"get some error", msg:error.message});
    }

};




//create return Policy post api
 const return_Pollicy =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Return_pollicy({title,text})
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};





//create Shipping Policy post api
 const Shippingpollicy =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Shipping_pollicy({title,text})
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};



//create Refferalterm Policy post api
 const Refferalterm =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Refferal_term({title,text})
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};



//create rent benifit Policy post api
 const RentBenifit =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Rent_benifit({title,text})
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};



// create gst list api
const gst_list=async(req,res)=>{
    try{     
    const products= await Gst.find({});
   
   res.render('gst',{result:"true", message: "your list are.",
   path:"https://admin.krazeal.com/uploads/",data:products})  
    }catch(error){
      
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};




// create delivery list api
const delevery_list=async(req,res)=>{
    try{     
    const products= await Delivery.find({});
   res.render('delivery',{result:"true", message: "your list are.",
   path:"https://admin.krazeal.com/uploads/",data:products})  
    }catch(error){
      
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};




// create update gst api
const updategst=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Gst.findById({"_id":id});
     res.status(200).render('gst_update',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create update gst api
const Updategst=async(req,res)=>{
    const {gst}=req.body;
    const id=req.params.id;
    try{
    const data=await Gst.findByIdAndUpdate({"_id":id},{$set:{gst},new:true});
     res.status(200).redirect("/public/gst_list");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create update delivery  api
const updatedelivery=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Delivery.findById({"_id":id});
     res.status(200).render('delivery_update',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const Updatedelivery=async(req,res)=>{
    const {d_charge}=req.body;
    const id=req.params.id;
    try{
    const data=await Delivery.findByIdAndUpdate({"_id":id},{$set:{d_charge},new:true});
     res.status(200).redirect("/public/delivery_list");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};









module.exports ={
Contact_Us,
Privacy_Pollicy,
Term_Condiction,
About_Us,
Faqs,
Category_api,
Banner_api,
City_list_api,
Features_api,
feedback_api,
Offer_api,
Product_api,
return_Pollicy,
Shippingpollicy,
Refferalterm,
RentBenifit,
Sub_Category_api,
admin_signup,
admin_signup_page,
AdminLogout,
About_Uss,
aboutusDelete,
delivery_charge_api,
gst_api,
gst_list,
delevery_list,
updategst,
Updategst,
updatedelivery,
Updatedelivery




};