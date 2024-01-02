const mysql=require("mysql");
//const bcrypt=require("bcryptjs");
// const jwt=require("jsonwebtoken");
// const { promisify }=require("util");
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE,
});
exports.login=(req,res)=>{
    try{
       const {email,password}=req.body;
       if(!email||!password){
        return res.status(400).render("login",{msg:'Please Enter Email/password',msg_type:"error"});
       }

       db.query('select * from register where email=?',[email],(error,result)=>{
       if(result.length<=0){
        return res.status(401).render("login",{msg:'Please Enter Email/password',msg_type:"error"});
       }else{
         if(password!=(result[0].password)){
            return res.status(401).render("login",{msg:'Please Enter valid mail/password',msg_type:"error"});
         }else{
            // const id=result[0].ID;
            // const token=jwt.sign({id:id},process.env.JWT_SECRET,{
            //     expiresIn:process.env.JWT_EXPIRES_IN,
            // });
            // console.log("Token: "+token);
            // const cookieOptions={
            //     expires:new Date(
            //     Date.now()+
            //     process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
            //     ),
            //     httpOnly:true,
            // };
            // res.cookie("jo",token,cookieOptions);
            res.status(200).redirect("/home");
         }
       }
       });
    }catch(error){
        console.log(error);
    }
};
exports.register=(req,res)=>{
    console.log(req.body);
    const username=req.body.username;
    const email=req.body.email;
    const phone=req.body.phone;
    const password=req.body.password;
    const confirm_password=req.body.confirm_password;
    /* const {name,email,password,confirm_password}=req.body;*/
    db.query("select email from register where email=?",[email],(error,result)=>{
       if(error){
        console.log(error);
       }
       if(result.length>0){
        return res.render("register",{msg:'This mail already taken',msg_type:"error"});
       }else if(password!==confirm_password){
        return res.render("register",{msg:'password does not match',msg_type:"error"});
       }
       //let hashedPassword=await bcrypt.hash(password,8);
       db.query("insert into register set?",{username:username,email:email,phone:phone,password:password},(error,result)=>{
        if(error){
            console.log(error);
        }else{
            console.log(result);
            return res.render("register",{msg:'Registered Successfully',msg_type:"success"});
        }
       });
  });
};

