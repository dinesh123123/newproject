// import dependancies in the  router files
const express=require("express");
const router=express();
const multer = require("multer");
const pannelControllers=require("../controllers/pannel_controllers");
const auth=require("../middlewere/admin_auth");


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
router.get("/index",auth.isLogin,pannelControllers.IndexPage);
router.get("/admin_login",auth.isLogout,pannelControllers.LoginPage);
router.get("/category",auth.isLogin,pannelControllers.categorylist);
router.get("/create_category",auth.isLogin,pannelControllers.CategoryPage);
router.get("/category_delete/:id",auth.isLogin,pannelControllers.categoryDelete);
router.post("/category_update/:id",upload.single('image'),pannelControllers.CategoryUpdate);
router.get("/category_update/:id",auth.isLogin,pannelControllers.categoryupdate);
router.get("/banner_list",auth.isLogin,pannelControllers.bannerlist);
router.post("/banner_update/:id",upload.single('image'),pannelControllers.BannerUpdate);
router.get("/banner_update/:id",auth.isLogin,pannelControllers.bannerupdate);
router.get("/create_banner",auth.isLogin,pannelControllers.BannerPage);
router.get("/banner_delete/:id",auth.isLogin,pannelControllers.BannerDelete);
router.get("/offer_list",auth.isLogin,pannelControllers.Offer_list);
router.get("/offer_delete/:id",auth.isLogin,pannelControllers.offerDelete);
router.get("/create_offer",auth.isLogin,pannelControllers. OfferPage);
router.post("/update_offer/:id",upload.single('image'),pannelControllers.offerUpdate);
router.get("/update_offer/:id",auth.isLogin,pannelControllers.OFFERupdate);
router.get("/city_list",auth.isLogin,pannelControllers.City_List);
router.post("/update_city/:_id",upload.single('image'),pannelControllers.updateCity);
router.get("/update_city/:_id",auth.isLogin,pannelControllers.UpdateCity);
router.get("/city_delete/:_id",auth.isLogin,pannelControllers.cityDelete);
router.post("/admin_login",pannelControllers.AdminSignin);
router.get("/admin_logout",auth.isLogout,pannelControllers.AdminSignin);
router.get("/product_list",auth.isLogin,pannelControllers.productlist);
router.get("/create_product",auth.isLogin,pannelControllers.ProductPage);
router.get("/delete_product/:id",auth.isLogin,pannelControllers.productDelete);
router.get("/update_product/:id",pannelControllers.updateproducts);
router.post("/update_product/:id",upload.array('images',5),pannelControllers. UpdateProducts);
router.get("/subcategory",auth.isLogin,pannelControllers.subcategorylist);
router.get("/subcategory_delete/:id",auth.isLogin,pannelControllers.subcategoryDelete);
router.post("/subcategory_update/:id",upload.single('image'),pannelControllers.SubcategoryUpdate);
router.get("/subcategory_update/:id",auth.isLogin,pannelControllers.subcategoryupdate);
router.get("/create_subcategory",auth.isLogin,pannelControllers.SubCategoryPage);
router.get("/contactList",auth.isLogin,pannelControllers.contactlist);
router.get("/contact_update/:id",auth.isLogin,pannelControllers.updatecontact);
router.post("/contact_update/:id",pannelControllers.Updatecontact);
router.get("/user_list",auth.isLogin,pannelControllers.userList);
router.get("/user/:id",auth.isLogin,pannelControllers.UserDetail);
router.get("/termList",auth.isLogin,pannelControllers.termlist);
router.get("/term_update/:id",auth.isLogin,pannelControllers.updateTerm);
router.post("/term_update/:id",pannelControllers.UpdateTerm);
router.get("/privacyList",auth.isLogin,pannelControllers.pollicylist);
router.get("/pollicy_update/:id",auth.isLogin,pannelControllers.updatepollicy);
router.post("/pollicy_update/:id",pannelControllers.UpdatePollicy);
router.get("/aboutList",auth.isLogin,pannelControllers. aboutlist);
router.get("/about_update/:id",auth.isLogin,pannelControllers.updateabout);
router.post("/about_update/:id",pannelControllers.UpdateAbout);
router.get("/shipping_pollicyList",auth.isLogin,pannelControllers.shipping_pollicylist);
router.get("/shipping_pollicy_update/:id",auth.isLogin,pannelControllers.updateshipping_pollicy);
router.post("/shipping_pollicy_update/:id",pannelControllers.Updateshipping_pollicy);
router.get("/return_pollicyList",auth.isLogin,pannelControllers.return_pollicylist);
router.get("/return_pollicy_update/:id",auth.isLogin,pannelControllers.updatereturn_pollicy);
router.post("/return_pollicy_update/:id",pannelControllers.Updatereturn_pollicy);
router.get("/faqList",auth.isLogin,pannelControllers.faqlist);
router.get("/faq_update/:id",auth.isLogin,pannelControllers.updatefaq);
router.post("/faq_update/:id",pannelControllers.Updatefaq);
router.get("/rentBenifitesList",pannelControllers.rentBenifiteslist);
router.get("/rentBenifites_update/:id",pannelControllers.updaterentBenifites);
router.post("/rentBenifites_update/:id",pannelControllers.UpdaterentBenifites);
router.get("/refferalTermList",pannelControllers.refferallist);
router.get("/refferalTerm_update/:id",pannelControllers.updaterefferal);
router.post("/refferalTerm_update/:id",pannelControllers.Updaterefferal);
router.get("/user_feedbackFList",pannelControllers.feedbacklist);
router.get("/create_feedback",pannelControllers.FeedbackPage);
router.get("/feedback/:id",auth.isLogin,pannelControllers.feedbackDelete);
router.get("/featuresList",auth.isLogin,pannelControllers.featureslist);
router.get("/features_update/:id",pannelControllers.updatefeatures);
router.post("/features_update/:id",pannelControllers.Updatefeatures);
router.get("/order_details/:id",pannelControllers.orderDetails);
router.get("/order_list",pannelControllers.orderlist_api);
router.get("/rentOrder_list",pannelControllers.rentorderlist_api);
router.get("/kyc_varification",auth.isLogin,pannelControllers.kyc_api_list);
router.get("/kyc_details/:id",auth.isLogin,pannelControllers.kyc_api_details);
router.post("/kyc_update/:id",pannelControllers.kyc_api_update);
router.get("/kyc_update/:id",auth.isLogin,pannelControllers.kyc_api_updates);
router.post("/orders_update/:id",pannelControllers.orders_update);
router.get("/orders_update/:id",pannelControllers.orders_updates);
router.post("/carts_update/:id",pannelControllers.carts_update);
router.get("/carts_update/:id",auth.isLogin,pannelControllers.carts_updates);
router.get("/rentorder_details/:id",auth.isLogin,pannelControllers.RentorderDetails);
router.get("/inventoryTab",auth.isLogin,pannelControllers.inventorylist);
router.get("/update_instock/:id",auth.isLogin,pannelControllers.updateinstock);
router.post("/update_instock/:id",pannelControllers.Updateinstock);
router.post("/rentorders_update/:id",pannelControllers.rentorders_update);
router.get("/rentorders_update/:id",auth.isLogin,pannelControllers.rentorders_updates);
router.post("/rentcarts_update/:id",pannelControllers.rentcarts_update);
router.get("/rentcarts_update/:id",auth.isLogin,pannelControllers.rentcarts_updates);

module.exports=router;