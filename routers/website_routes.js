// import dependancies in the  router files
const express=require("express");
const router=express();
const multer = require("multer");
const userControllers=require("../controllers/user_controllers");




// create storage
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },

});

const upload = multer({
    storage: storage,
    fileFilter: function(req,file,callback){
        if(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ){
        callback(null,true)
    }else{
        console.log('only  png , jpg & jpeg file supported')
        callback(null,false)
    }

   },
   limits:{

    filesize:100000000000 //1000000 bytes=1MB
   }
});






//import user controllers files here
router.post("/signup",userControllers.User_Signup);
router.post("/login",userControllers.User_Login);
router.post("/user_profile",upload.single('image'),userControllers.UserProfile);
router.post("/google_login",userControllers.GooleLogin);
router.post("/facebook_login",userControllers.FacebookLogin);
router.post("/twiter_login",userControllers.TwiterLogin);
router.get("/contact_us_list",userControllers.Contact_List);
router.get("/about_us_list",userControllers.About_List);
router.get("/term_condition_list",userControllers.Term_List);
router.get("/privacy_pollicy_list",userControllers.Pollicy_List);
router.get("/faq_list",userControllers.Faq_List);
router.get("/banner_list",userControllers.Banner_List);
router.get("/category_list",userControllers.Category_List);
router.get("/city_list",userControllers.City_List);
router.get("/features_list",userControllers.Feature_api);
router.get("/feedback_list",userControllers.Feedback_api);
router.get("/offer_list",userControllers.OfferList_api);
router.get("/product_list",userControllers.ProductList_api);
router.post("/rent_product_list",userControllers.RentProductList_api);
router.post("/product_details",userControllers.ProductDetails);
router.post("/category_product_list",userControllers.categoryProduct_llist);
router.post("/like",userControllers.likePost);
router.post("/wish_list",userControllers.Wishlist_api);
router.post("/search_api",userControllers.ProductSearchApi);
router.post("/user_details",userControllers.UserDetails);
router.get("/return_pollicy_list",userControllers.Return_List);
router.get("/shipping_pollicy_list",userControllers.Shipping_List);
router.get("/refferal_term_list",userControllers.Refferal_List);
router.post("/add_cart",upload.single('image'),userControllers.AddCart_api);
router.post("/cart_list",userControllers.cartlist);
router.post("/like_api",userControllers.like_api);
router.post("/cart_remove",userControllers.cartDelete);
router.get("/rent_benifit_list",userControllers.rentbenifit_List);
router.post("/address_update",userControllers.AddressUpdate);
router.get("/recent_buyProduct_list",userControllers.RecentBuyProductList_api);
router.get("/recent_rentProduct_list",userControllers.recentRentProductList_api);
router.post("/subcategory_list",userControllers.Sub_Category_List);
router.post("/subcategory_buyProduct_list",userControllers.subcategoryBuyProduct_list);
router.post("/subcategory_rentProduct_list",userControllers.subcategoryRentProduct_list);
router.post("/order_summery",userControllers.ordersummery);
router.post("/order_summery_list",userControllers.ordersummery_list);
router.post("/sortAsc_product_list",userControllers.SortProduct_list);
router.post("/sortDsc_product_list",userControllers.SortProductDsc_list);
router.post("/add_address",userControllers.Address);
router.post("/address_list",userControllers.Address_list);
router.post("/address_delete",userControllers.Address_delete);
router.post("/order",userControllers.OrderProduct);
router.post("/order_history",userControllers.orderhistory);
router.post("/order_details",userControllers.orderDetails);
router.post("/changePassword",userControllers.changePassword);
router.post("/resetPassword",userControllers.resetPassword);
router.post("/kyc_request",upload.single('images'),userControllers.kyc_api);
router.post("/kyc_details",userControllers.kyc_details_api);
router.post("/total_deposite_list",userControllers.Total_deposite_list_api);
router.post("/active_deposite_list",userControllers.active_deposite_list_api);
router.post("/close_order_list",userControllers.close_order);
router.post("/add_payment",userControllers.Add_payment_api);
router.post("/refund_amount",userControllers.refund_deposite_list_api);
router.post("/extend_subscription",userControllers.subscription_request);
router.get("/gst_list",userControllers.gst_list);
router.get("/delivery_list",userControllers.delevery_list);




module.exports=router;