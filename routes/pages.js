const express=require("express");
const router = express.Router();
const userController=require('../controllers/users');
router.get("/",(req,res)=>{
    res.render('index');
 });
router.get("/login",(req,res)=>{
    res.render('login');
});
router.get("/register",(req,res)=>{
    res.render('register');
});
router.get("/home",(req,res)=>{
   res.render('home');
});
 router.get("/booking",(req,res)=>{
    res.render('booking');
 });
 router.get("/description",(req,res)=>{
    res.render('description');
 });
 router.get("/bookform",(req,res)=>{
    res.render('bookform');
 });
 router.get("/aboutus",(req,res)=>{
   res.render('aboutus');
});
router.get("/payment",(req,res)=>{
   res.render('payment');
});

module.exports=router;