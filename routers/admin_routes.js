// import dependancies in the  router files
const express=require("express");
const router=express();
const multer = require("multer");
const adminControllers=require("../controllers/admin_controllers");
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
router.post("/contact_us",adminControllers.Contact_Us);
router.post("/privacy_pollicy",adminControllers.Privacy_Pollicy);
router.post("/term_condicition",adminControllers.Term_Condiction);
router.post("/about_us",adminControllers.About_Us);
router.get("/about_us",auth.isLogin,adminControllers.About_Uss);
router.get("/about_us_delete/:id",auth.isLogin,adminControllers.aboutusDelete);
router.post("/faq",adminControllers.Faqs);
router.post("/create_category",upload.single('image'),adminControllers.Category_api);
router.post("/create_banner",upload.single('image'),adminControllers.Banner_api);
router.post("/city_list",upload.single('image'),adminControllers.City_list_api);
router.post("/features_list",adminControllers.Features_api);
router.post("/create_feedback",upload.single('image'),adminControllers.feedback_api);
router.post("/create_offer",upload.single('image'),adminControllers.Offer_api);
router.post("/create_product",upload.array('images',5),adminControllers.Product_api);
router.post("/return_pollicy",adminControllers.return_Pollicy);
router.post("/shipping_pollicy",adminControllers.Shippingpollicy);
router.post("/refferal_term",adminControllers.Refferalterm);
router.post("/rent_benifit",adminControllers.RentBenifit);
router.post("/create_subcategory",upload.single('image'),adminControllers.Sub_Category_api);
router.post("/admin_signup",auth.isLogin,adminControllers.admin_signup);
router.get("/admin_signup",auth.isLogin,adminControllers.admin_signup_page);
router.get("/admin_logout",auth.isLogout,adminControllers.AdminLogout);
router.post("/create_gst",adminControllers.gst_api);
router.post("/create_delivery",adminControllers.delivery_charge_api);
router.get("/gst_list",auth.isLogin,adminControllers.gst_list);
router.get("/delivery_list",auth.isLogin,adminControllers.delevery_list);
router.get("/gst_update/:id",auth.isLogin,adminControllers.updategst);
router.post("/gst_update/:id",adminControllers.Updategst);
router.get("/delivery_update/:id",auth.isLogin,adminControllers.updatedelivery);
router.post("/delivery_update/:id",adminControllers.Updatedelivery);

module.exports=router;