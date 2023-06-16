
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
const User=require("../models/user_models");
const Sub_Category=require("../models/sub_category_models");
const Rent_benifit=require("../models/rent_benifit_models");
const Cart=require("../models/cart_models");
const Order=require("../models/order_product_models");
const Kyc=require("../models/kyc_models");
const Admin=require("../models/admin_models");




//create indexpage api
const IndexPage=async(req,res)=>{
    const usercount=await User.count();
    const a={usercount};
    const productcount=await Product.count();
    const b={productcount};
    const categorycount=await Order.count();
    const c={categorycount};


//find total deposit price or amount
 const datas=await Order.find({types:"Buy"});

 //apply for loop
 var total_amount=0;
 for(let i=0;i<datas.length;i++){
  total_amount +=Number((datas[i].t_price));
 
 }


    const d={total_amount};  
    const data=[a,b,c,d];

	res.render("index",{data:data});

}



// create admin login page
const LoginPage=async(req,res)=>{
	res.render("login");
}


// category Operations
//create indexpage api
const CategoryPage=async(req,res)=>{
	res.render("create_category");
}


//  create category list api
const categorylist=async(req,res)=>{
try{
    const data = await Category.find();
    if(data != null){
        res.status(200).render("game_category",{result:"true",message:"all data lists are",data:data})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

};


// create delete category api

    const categoryDelete=async(req,res)=>{
    	const id=req.params.id  
try{           
    const data =await Category.findByIdAndDelete({"_id":id});           
    if(data.length==0){
        res.status(400).render('game_category',{msg:'Record not found'})
    }else{
     res.status(200).redirect('/public/Category');/*{ success: true, message: "list deleted successful", list: list}) */
    }
  }
 catch(error){
          res.send(error.message)
      }
    };



//create update category api
   const CategoryUpdate=async(req,res)=>{
    try {
    const id=req.params.id;

    const user_profile= await Category.findOne({"_id":id});
    if(user_profile){
        if(req.file){
            var profileRecord={
        name:req.body.name,
        image:req.file.filename
    }

   }else{
var profileRecord={
      name:req.body.name,
        
    }
   }
 const updateUser_data= await Category.findOneAndUpdate({"_id":id},(profileRecord),     
{new:true});
       const profile=await updateUser_data.save();
   res.status(200).redirect("/public/category");/*({result:"true", message: "user profile updated successfully.",data:profile})  */
    
    }else{
         res.status(400).json({result:"false",message:"parameter required id"});
    }
        
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}
  };
   




// create category update api list
const categoryupdate=(req,res,next)=>{
 Category.findById(req.params.id).then(result =>{
        res.status(200).render('edit_category',{data:result})
    })
.catch(error =>{
    res.status(500).json({ error:error})
})
  };


 //end category operation





// start subcategory operation
//create supcategorypage api
const SubCategoryPage=async(req,res)=>{
   try{
    const data = await Category.find();
    if(data != null){
        res.status(200).render("create_subcategory",{result:"true",message:"all data lists are",data:data})
        //console.log(data)
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

};




//  create category list api
const subcategorylist=async(req,res)=>{
try{
    const data = await Sub_Category.find();
    if(data != null){
        res.status(200).render("subcategory",{result:"true",message:"all data lists are",data:data})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

};


// create delete category api

    const subcategoryDelete=async(req,res)=>{
        const id=req.params.id  
try{           
    const data =await Sub_Category.findByIdAndDelete({"_id":id});           
    if(data.length==0){
        res.status(400).render('game_category',{msg:'Record not found'})
    }else{
     res.status(200).redirect('/public/subcategory');/*{ success: true, message: "list deleted successful", list: list}) */
    }
  }
 catch(error){
          res.send(error.message)
      }
    };



// create subcategroy update api
const SubcategoryUpdate=async(req,res)=>{
    const id=req.params.id;
    
    try{
    const user_profile= await Sub_Category.findOne({"_id":id});
    if(user_profile){
        if(req.file){
            var profileRecord={
        name:req.body.name,
        categoryId:req.body.categoryId,
        image:req.file.filename
    }

   }else{
var profileRecord={
       id:req.params._id,
        name:req.body.name,
        
    }
   }
 const updateUser_data= await Sub_Category.findOneAndUpdate({"_id":id},(profileRecord),     
{new:true});
       const profile=await updateUser_data.save();
   res.status(200).redirect("/public/subcategory");/*({result:"true", message: "user profile updated successfully.",data:profile})  */
    
    }else{
         res.status(400).json({result:"false",message:"parameter required id"});
    }
        
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};



// create banner update api list
const subcategoryupdate=async(req,res)=>{
    try{
       //const results= await Category.find();  
    const result= await Sub_Category.findById(req.params.id);
    
    //console.log(result)
    res.status(200).render('edit_subcategory',{data:result});

    }catch(error){
        res.status(400).json({ message:error.message})
    }  
  };




// end subcategory operation here





// Banner Operations
// create banner list api
const bannerlist=async(req,res)=>{
try{
    const data = await Banner.find();
    if(data != null){
        res.status(200).render("banner",{result:"true",message:"all data lists are",data:data})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

};



// create banner update api
const BannerUpdate=async(req,res)=>{
    const id=req.params.id;
    
    try{
    const user_profile= await Banner.findOne({"_id":id});
    if(user_profile){
        if(req.file){
            var profileRecord={
        name:req.body.name,
        title:req.body.title,
        image:req.file.filename
    }

   }else{
var profileRecord={
       id:req.params._id,
      title:req.body.title,
        
    }
   }
 const updateUser_data= await Banner.findOneAndUpdate({"_id":id},(profileRecord),     
{new:true});
       const profile=await updateUser_data.save();
   res.status(200).redirect("/public/banner_list");/*({result:"true", message: "user profile updated successfully.",data:profile})  */
    
    }else{
         res.status(400).json({result:"false",message:"parameter required id"});
    }
        
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};



// create banner update api list
const bannerupdate=async(req,res,next)=>{
 Banner.findById(req.params.id).then(result =>{
        res.status(200).render('edit_banner',{data:result})
    })
.catch(error =>{
    res.status(500).json({ error:error})
})
  };


//create indexpage api
const BannerPage=async(req,res)=>{
	res.render("create_banner");
}




  //create banner delete method by using delete method
    const BannerDelete=async(req,res)=>{
    	const id=req.params.id  
try{           
    const data =await Banner.findByIdAndDelete({"_id":id});           
    if(data.length==0){
        res.status(400).render('banner_list',{msg:'Record not found'})
    }else{
     res.status(200).redirect('/public/banner_list');/*{ success: true, message: "list deleted successful", list: list}) */
    }
  }
 catch(error){
          res.send(error.message)
      }
    };






// Offer operations
//create offer banner list 
   const Offer_list =async(req,res)=>{
       try{                
       const ff =await Offer.find()           
       return res.status(200).render('offer_banner',{ result: "true", message: "list are", data:ff 
  });

}  catch(error){
    res.status(400).json({result:"false",message:error.message});
       
   }
 };




// create banner update api
const offerUpdate=async(req,res)=>{
    const id=req.params.id;
    
    try{
    const user_profile= await Offer.findOne({"_id":id});
    if(user_profile){
        if(req.file){
            var profileRecord={
        text:req.body.text,
        title:req.body.title,
         ex_date:req.body.ex_date,
        image:req.file.filename
    }

   }else{
var profileRecord={
       id:req.params._id,
      text:req.body.text,
      title:req.body.title,
     ex_date:req.body.ex_date,
        
    }
   }
 const updateUser_data= await Offer.findOneAndUpdate({"_id":id},(profileRecord),     
{new:true});
       const profile=await updateUser_data.save();
   res.status(200).redirect("/public/offer_list");/*({result:"true", message: "user profile updated successfully.",data:profile})  */
    
    }else{
         res.status(400).json({result:"false",message:"parameter required id"});
    }
        
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};



// create banner update api list
const OFFERupdate=async(req,res)=>{
  try{
    const id=req.params.id;
       
    const data= await Offer.findById({"_id":id});
    res.render('Edit_offer',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
  };


//create indexpage api
const OfferPage=async(req,res)=>{
    res.render("create_offer");
}




  //create banner delete method by using delete method
    const offerDelete=async(req,res)=>{
        const id=req.params.id  
try{           
    const data =await Offer.findByIdAndDelete({"_id":id});           
    if(data.length==0){
        res.status(400).render('offer_banner',{msg:'Record not found'})
    }else{
     res.status(200).redirect('/public/offer_list');/*{ success: true, message: "list deleted successful", list: list}) */
    }
  }
 catch(error){
          res.send(error.message)
      }
    };


// offer operation close here



// City_list operations

//create  City_list list 
   const City_List =async(req,res)=>{
       try{                
       const list =await City_list.find()           
       return res.status(200).render('city_list',{ result: "true", message: "list are", list:list 
  });

}  catch(error){
    res.status(400).json({result:"false",message:error.message});
       
   }
 };



// create city update api
 const updateCity=async(req,res)=>{  
try {
    const id=req.params._id;
   if(req.file){
    var datarecord={
        city:req.body.city,
        image:req.file.filename
    }

   }else{
var datarecord={
        city:req.body.city
       
    }
   }
   var list=await City_list.findByIdAndUpdate(id,(datarecord),function(err){
    if(err){
        res.redirect('city_update/',+req.params._id);
    }else{
        res.status(200).redirect('/public/city_list');
    }
   });
   
}catch(error){

}
  };
   

// find id by usede gate method
const UpdateCity=async(req,res) =>{
    const id=req.params._id;
  const aa =City_list.findById(id,(err,user) =>{
    if(err){
        res.redirect("/public/city_list");
    }else{
        if(user == null){
            res.redirect("/public/city_list");
        }else{
        res.status(200).render('city_edit',{list:user})
        }
       }
     })
   };


  //create city delete method by using delete method
    const cityDelete=async(req,res)=>{
        const id=req.params._id  
try{           
    const list =await City_List.findByIdAndDelete({"_id":id});           
     res.status(200).redirect('/public/city_list');/*{ success: true, message: "list deleted successful", list: list}) */
    
  }
 catch(error){
          res.send(error.message)
      }
    };





//create Admin signin api
const AdminSignin=async(req,res)=>{
     try{
      const {email,password}=req.body;
      const user= await Admin.findOne({email:email,password:password});
      if (user) {
    if(user.is_admin === 0){
        res.render("login",{message:"email and Password incorrect"});
       // res.redirect('/public/index');
    }else{
        req.session.user_id=user._id;
        console.log(req.session)
        res.redirect('/public/index');
    }
  }
      else{
  res.render('login',{message:"email and Password incorrect"});

 }
   
   }catch(error){
           console.log(error.message)
    }  

};



/*
//create Admin signin api
const AdminSignin=async(req,res)=>{
     try{
      const {email,password}=req.body;
      const user= await Admin.findOne({email:email,password:password});
      if (user) {
    if(user.is_admin === 0){
         req.session.admin_id=user._id;
        res.redirect('/public/index');
    }else{
        req.session.user_id=user._id;
        console.log(req.session)
        res.redirect('/public/index');
    }
  }
      else{
  res.render('login',{message:"email and Password incorrect"});

 }
   
   }catch(error){
           console.log(error.message)
    }  

};

*/


// create user logout api
 const AdminLogout=async(req,res) => {
    req.session.destroy();
    res.render('login');
};



// product operations start
// create product list api
const productlist=async(req,res)=>{
try{
    const data = await Product.find();
    if(data != null){
        res.status(200).render("product_list",{result:"true",message:"all data lists are",data:data})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

};



// create inventory list product list api
const inventorylist=async(req,res)=>{
try{
    const data = await Product.find({});
    if(data != null){
        res.status(200).render("inventory",{result:"true",message:"all data lists are",data:data})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

};



//Product indexpage api
const ProductPage=async(req,res)=>{
    try{
        const dinesh=await Sub_Category.find();
        res.status(200).render("product",{result:"true",data:dinesh});
    }catch(error){
        res.status(400).json({result:"false",message:error.message})

    }
 }



  //create product delete method by using delete method
    const productDelete=async(req,res)=>{
        const id=req.params.id;  
try{           
    const data =await Product.findByIdAndDelete({"_id":id});           
    if(data.length==0){
        res.status(400).render('product_list',{msg:'Record not found'})
    }else{
     res.status(200).redirect('/public/product_list');/*{ success: true, message: "list deleted successful", list: list}) */
    }
  }
 catch(error){
          res.send(error.message)
      }
    };



// product update api
    const updateproducts=async(req,res)=>{
        try{
        
    const result= await Product.findById(req.params.id);
    res.status(200).render('edit_product',{data:result});

    }catch(error){
        res.status(400).json({ message:error.message})
    }  

    };


// product updates using post method
    const UpdateProducts=async(req,res)=>{
        const id=req.params.id;
        try{


         const arrayImage=[];
        for(let i=0;i<req.files.length;i++){
          arrayImage[i]=req.files[i].filename;
      }


 const{gst,d_charge,v_price2,v_price3,v_price4,v_price6,v_price9,v_price12,p_price2,p_price3,p_price4,p_price6,p_price9,p_price12,product_name,product_type,title,text,rent_price,price,discount_price,rent_discount_price,delevery_time,refund_pollicy,
                instock,dimensions,type_product,type_of_finish,like,offer,height,width,length,description}=req.body;
            const dinesh=await Product.findOne({"_id":id});
            if(dinesh){
                if(arrayImage.length>0){
                    var datarecord={
                     v_price2,
                     v_price3,
                     v_price4,
                     v_price6,
                     v_price9,
                     v_price12,
                     p_price2,
                     p_price3,
                     p_price4,
                     p_price6,
                     p_price9,
                     p_price12,
                     gst,
                     d_charge,
                        product_name:product_name,
                        product_type:product_type,
                        title:title,
                        text:text,
                        rent_price:rent_price,
                        price:price,
                        discount_price:discount_price,
                        rent_discount_price:rent_discount_price,
                        delevery_time:delevery_time,
                        refund_pollicy:refund_pollicy,
                        instock:instock,
                        dimensions:dimensions,
                        type_product:type_product,
                        type_of_finish:type_of_finish,
                        offer:offer,
                        height:height,
                        width:width,
                        length: length,
                        description:description,
                        images:arrayImage
                        
                    }
                }else{
                     var datarecord={
                        product_name:product_name,
                        product_type:product_type,
                        title:title,
                        text:text,
                        rent_price:rent_price,
                        price:price,
                        discount_price:discount_price,
                        rent_discount_price:rent_discount_price,
                        delevery_time:delevery_time,
                        refund_pollicy:refund_pollicy,
                        instock:instock,
                        dimensions:dimensions,
                        type_product:type_product,
                        type_of_finish:type_of_finish,
                        offer:offer,
                        height:height,
                        width:width,
                        length: length,
                        description:description,
                        v_price2,
                        v_price3,
                        v_price4,
                        v_price6,
                        v_price9,
                        v_price12,
                        p_price2,
                        p_price3,
                        p_price4,
                        p_price6,
                        p_price9,
                        p_price12,
                         gst,
                     d_charge,
                }

            }
            

const data=await Product.findByIdAndUpdate({"_id":id},(datarecord),{new:true});
const dashing=await data.save();
res.status(200).redirect("/public/product_list");


        }else{
            res.status(400).json({result:"false",message:"some paramerers are required"})
        }


        }catch(error){
            res.status(400).json({result:"true",message:error.message});
        }

    };




//update inventoru tab
    const updateinstock=async(req,res)=>{
        try{
        
    const result= await Product.findById(req.params.id);
    res.status(200).render('edit_instock',{data:result});

    }catch(error){
        res.status(400).json({ message:error.message})
    }  

    };




// inventory  instok updates using post method
    const Updateinstock=async(req,res)=>{
        const id=req.params.id;
        try{
 const{instock}=req.body;

const data=await Product.findByIdAndUpdate({"_id":id},{$set:{instock:instock}},{new:true});
res.status(200).redirect("/public/inventoryTab");
        }catch(error){
            res.status(400).json({result:"true",message:error.message});
        }

    };



// end inventory tab





// producyt operations end here


// start contact operation
    // create contact list api
    const contactlist=async(req,res)=>{
        try{
            const data=await Contact.find({});
            res.status(200).render("contact",{result:"true",message:'list are',data:data});
        }catch(error){
            res.status(400).json({result:"false",message:error.message});
        }

    };

// create contest update api to get method
    const updatecontact=async(req,res)=>{
         try{
        
    const data= await Contact.findById(req.params.id);
    res.status(200).render('edit_contact',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
    };


// create Update contact us api using post method
    const Updatecontact=async(req,res)=>{
        const id=req.params.id;
        const{email_address,whatsaap}=req.body;
        try{
            const data=await Contact.findByIdAndUpdate({"_id":id},{$set:{email_address,whatsaap},new:true});
         res.status(200).redirect("/public/contactList");

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
    };

    //end contact us operation here


// start user collection operations
    // create userlist api
const userList=async(req,res)=>{
    try{
    const data=await User.find();
     res.status(200).render('user_show',{data:data});
      }catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// create user details api
const UserDetail=async(req,res)=>{
    const id=req.params.id;
try{

    const data=await User.findById({"_id":id});
     res.status(200).render('user_profile',{data:data});
      }catch(error){
        res.status(400).json({ message:error.message})
     }  

};


// end user collection operations here
// start term and condiction operation api
const termlist=async(req,res)=>{
    try{
        const data=await Term.find();
       res.status(200).render('term_condiction',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updateTerm=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Term.findById({"_id":id});
     res.status(200).render('edit_term_condition',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const UpdateTerm=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Term.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/termList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};

// end term operation here


// start pollicy operation api
const pollicylist=async(req,res)=>{
    try{
        const data=await Pollicy.find();
       res.status(200).render('privacy_pollicy',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updatepollicy=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Pollicy.findById({"_id":id});
     res.status(200).render('edit_pollicy',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const UpdatePollicy=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Pollicy.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/privacyList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};

// end Pollicy operation here



// start pollicy operation api
const aboutlist=async(req,res)=>{
    try{
        const data=await About.find();
       res.status(200).render('about',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updateabout=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await About.findById({"_id":id});
     res.status(200).render('edit_about',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const UpdateAbout=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await About.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/aboutList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// end Pollicy operation here


// start shipping pollicy operation

const shipping_pollicylist=async(req,res)=>{
    try{
        const data=await Shipping_pollicy.find();
       res.status(200).render('shipping_pollicy',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updateshipping_pollicy=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Shipping_pollicy.findById({"_id":id});
     res.status(200).render('edit_shipping',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const Updateshipping_pollicy=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Shipping_pollicy.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/shipping_pollicyList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// end shipping pollicy operation here




// start return pollicy operation

const return_pollicylist=async(req,res)=>{
    try{
        const data=await Return_pollicy.find();
       res.status(200).render('return_pollicy',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updatereturn_pollicy=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Return_pollicy.findById({"_id":id});
     res.status(200).render('edit_return',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const Updatereturn_pollicy=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Return_pollicy.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/return_pollicyList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// end return pollicy operation here




// start faq pollicy operation

const faqlist=async(req,res)=>{
    try{
        const data=await Faq.find();
       res.status(200).render('faq',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updatefaq=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Faq.findById({"_id":id});
     res.status(200).render('edit_faq',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const Updatefaq=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Faq.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/faqList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// end faq operation here



// start Rentifi_benifite pollicy operation

const rentBenifiteslist=async(req,res)=>{
    try{
        const data=await Rent_benifit.find();
       res.status(200).render('rentbenifites',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updaterentBenifites=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Rent_benifit.findById({"_id":id});
     res.status(200).render('edit_rentbenifites',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const UpdaterentBenifites=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Rent_benifit.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/rentBenifitesList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// end Rentifi_benifite operation here



// start reffer_term  pollicy operation

const refferallist=async(req,res)=>{
    try{
        const data=await Refferal_term.find();
       res.status(200).render('refferal',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updaterefferal=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Refferal_term.findById({"_id":id});
     res.status(200).render('edit_refferal',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const Updaterefferal=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Refferal_term.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/refferalTermList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// end reffer_term operation here


// start user feedback operations

const feedbacklist=async(req,res)=>{
    try{
        const data=await Feedback.find();
       res.status(200).render('user_feedback',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// create feedback page
const FeedbackPage=async(req,res)=>{
    res.render('create_feedback');

};



//create feedback delete method by using delete method
    const feedbackDelete=async(req,res)=>{
        const id=req.params.id;  
try{           
    const data =await Feedback.findByIdAndDelete({"_id":id});           
    if(data.length==0){
        res.status(400).render('user_feedback',{msg:'Record not found'})
    }else{
     res.status(200).redirect('/public/user_feedbackFList');/*{ success: true, message: "list deleted successful", list: list}) */
    }
  }
 catch(error){
          res.send(error.message)
      }
    };


//end Feedback operations end here


// start our features  api operations
const featureslist=async(req,res)=>{
    try{
        const data=await Feature.find();
       res.status(200).render('our_features',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updatefeatures=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Feature.findById({"_id":id});
     res.status(200).render('edit_features',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const Updatefeatures=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Feature.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/featuresList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


 // end our features  api operations



// create order details api
const orderDetails=async(req,res)=>{
//     const id=req.params.id;
//     try{
        
    
//     const dinesh=await Order.find({"_id":id}).populate('ShippingAddressId');
//     const abcd=dinesh[0].userId;
    
//     const list=await Cart.find({"userId":abcd}).populate('productId').populate('userId');

//    const data=[...list, ...dinesh ];
// console.log(data)
//     res.status(200).render('order_details',{result:"true",message:"required list are",data:data});

// }catch(error){
//     res.status(400).json({result:"false",message:error.message});

//  }


 const id=req.params.id;
    try{
   const dinesh=await Order.find({"_id":id});
   const dinu= dinesh[0].random_number;    
  const list=await Cart.find({unique:dinu}).populate('productId').populate('userId');
    res.status(200).render('order_details',{result:"true",message:"required list are",data:list});

}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }


 };





// create buy order details api
const orderlist_api=async(req,res)=>{
    try{
    const dinesh=await Order.find({types:"Buy"}).populate('ShippingAddressId');
   
    res.status(200).render('order',{result:"true",message:"required list are",data:dinesh});
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }
};



// create rent order details api
const rentorderlist_api=async(req,res)=>{
    try{
    //const dinesh=await Cart.find({duration:{$ne:""}}).populate(userId);
    const dinesh=await Order.find({types:"Rent"}).populate('userId').populate('ShippingAddressId');
    res.status(200).render('rentorder.ejs',{result:"true",message:"required list are",data:dinesh});
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }
};



// create order details api
const RentorderDetails=async(req,res)=>{
 const id=req.params.id;
    try{
   const dinesh=await Order.find({"_id":id});
   const dinu= dinesh[0].random_number;    
  const list=await Cart.find({unique:dinu}).populate('productId').populate('userId');
    res.status(200).render('rentorder_details',{result:"true",message:"required list are",data:list});

}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }


 };





// create kyc verificaation list api
const kyc_api_list=async(req,res)=>{
    try{
   
    const dinesh=await Kyc.find({}).populate('userId');
    res.status(200).render('kyc',{result:"true",message:"required list are",data:dinesh});
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }

};



// create kyc details a page
const kyc_api_details=async(req,res)=>{
     const id=req.params.id;
    try{
   
    const dinesh=await Kyc.find({"_id":id})
    res.status(200).render('kyc_details',{result:"true",message:"required list are",data:dinesh});
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }

};


// create kyc update api
const kyc_api_update=async(req,res)=>{
     const id=req.params.id;
     const {status}=req.body;
    try{
   
    const dinesh=await Kyc.findOneAndUpdate({"_id":id},{$set:{status:status}},{new:true});
    res.status(200).redirect("/public/kyc_varification")
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }

};

// create edit term and condiction api
const kyc_api_updates=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Kyc.findById({"_id":id});
     res.status(200).render('edit_kyc',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};




// create order status  update api
const orders_update=async(req,res)=>{
     const id=req.params.id;
     const {status}=req.body;
    try{
   
    const dinesh=await Order.findOneAndUpdate({"_id":id},{$set:{status:status}},{new:true});
    res.status(200).redirect("/public/order_list")
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }

};

// create edit term and condiction api
const orders_updates=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Order.findById({"_id":id});
     res.status(200).render('orders_status',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// Rent orders update

// create order status  update api
const rentorders_update=async(req,res)=>{
     const id=req.params.id;
     const {status}=req.body;
    try{
   
    const dinesh=await Order.findOneAndUpdate({"_id":id},{$set:{status:status}},{new:true});
    res.status(200).redirect("/public/rentOrder_list")
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }

};

// create edit term and condiction api
const rentorders_updates=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Order.findById({"_id":id});
     res.status(200).render('rent_orders_status',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// end rent orders



// create Cart  status  update api
const carts_update=async(req,res)=>{
     const id=req.params.id;
     const {status}=req.body;
    try{
   
    const dinesh=await Cart.findOneAndUpdate({"_id":id},{$set:{status:status}},{new:true});
    res.status(200).redirect("/public/order_list")
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }

};



// create edit term and condiction api
const carts_updates=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Cart.findById({"_id":id});
     res.status(200).render('orders_status',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};




// create rent carts status update api
const rentcarts_update=async(req,res)=>{
     const id=req.params.id;
     const {status}=req.body;
    try{
   
    const dinesh=await Cart.findOneAndUpdate({"_id":id},{$set:{status:status}},{new:true});
    res.status(200).redirect("/public/rentOrder_list")
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }

};

// create edit term and condiction api
const rentcarts_updates=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Cart.findById({"_id":id});
     res.status(200).render('rentorders_status',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};







// export from hers
module.exports={
	IndexPage,
	LoginPage,
	CategoryPage,
	categorylist,
	categoryDelete,
	CategoryUpdate,
	categoryupdate,
	bannerlist,
	BannerUpdate,
	bannerupdate,
	BannerPage,
	BannerDelete,
    updateCity,
    UpdateCity,
    City_List,
    cityDelete,
    AdminSignin,
    AdminSignin,
    productlist,
    ProductPage,
    productDelete,
    offerUpdate,
    OFFERupdate,
    OfferPage,
    offerDelete,
    Offer_list,
    subcategorylist,
    subcategoryDelete,
    SubcategoryUpdate,
    subcategoryupdate,
    SubCategoryPage,
    updateproducts,
    UpdateProducts,
    contactlist,
    updatecontact,
    Updatecontact,
    userList,
    UserDetail,
    termlist,
    updateTerm,
    UpdateTerm,
    pollicylist,
    updatepollicy,
    UpdatePollicy,

     aboutlist,
    updateabout,
    UpdateAbout,
     shipping_pollicylist,
    updateshipping_pollicy,
    Updateshipping_pollicy,
     return_pollicylist,
    updatereturn_pollicy,
    Updatereturn_pollicy,

     faqlist,
    updatefaq,
    Updatefaq,
    rentBenifiteslist,
    updaterentBenifites,
    UpdaterentBenifites,
    refferallist,
    updaterefferal,
    Updaterefferal,
    feedbacklist,
    FeedbackPage,
    feedbackDelete,
    featureslist,
    updatefeatures,
    Updatefeatures,
    orderDetails,
    orderlist_api,
    rentorderlist_api,
    kyc_api_list,
    kyc_api_details,
    kyc_api_update,
    kyc_api_updates,
    orders_update,
    orders_updates,
    carts_update,
    carts_updates,
    RentorderDetails,
    inventorylist,
    updateinstock,
    Updateinstock,
    rentorders_update,
    rentorders_updates,
    rentcarts_update,
    rentcarts_updates,













};