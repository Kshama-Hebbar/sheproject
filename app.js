const express=require('express');
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const md5=require('md5');
const ejs=require("ejs");
const homepage="The primary objective of our website is to provide women with a supportive environment where importance is given to their healthcare and legal rights.Our motive is to provide women with an opportunity wherein they can express their opinions";
const contactus="For any queries,contact us:Anusha,Kshama,Rekha,Rukmini";
const dpage="Hey";
const aboutus="The primary objective of our website is to provide women with a supportive environment where importance is given to their healthcare and legal rights.Our motive is to provide women with an opportunity wherein they can express their opinions"; 
const app=express();
const path=require('path');
const router = express.Router();
//const uploaded = require('./uploadMiddleware');
module.exports = router;
const multer = require('multer');

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
const moment = require('moment');
const req = require('express/lib/request');
app.locals.moment = moment;
let posts=[];
let complaints=[];
//connection URL
mongoose.connect("mongodb://localhost:27017/SHEDB",{useNewUrlParser:true});
const postSchema=new mongoose.Schema({
    title:String,
    content:String,
    reply:String
});
const cyberSchema=new mongoose.Schema({
    title:String,
    content:String,
    reply:String
});
const policeSchema=new mongoose.Schema({
    username:String,
    password:String,
    address:String,
    cno:String,
    image:String,
    status:String
});
const userSchema=new mongoose.Schema({
    username:String,
    password:String
});
const doctorSchema=new mongoose.Schema({
    username:String,
    password:String,
    address:String,
    cno:String,
    image:String,
    status:String
});
const adminSchema=new mongoose.Schema({
    username:String,
    password:String
});
const cyber=mongoose.model("cyber",cyberSchema);
const police=mongoose.model("police",policeSchema);
const admin=mongoose.model("admin",adminSchema);
const doctor=mongoose.model("doctor",doctorSchema);
const newadmin=new admin({
    username:"kshamahebbar1@gmail.com",
    password:md5("789456")
});
newadmin.save(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('Success');
    }
});

var Storagei= multer.diskStorage({
    destination:"./public/uploadi/",
    filename:(req,file1,cb)=>{
        cb(null,file1.fieldname+"_"+Date.now()+path.extname(file1.originalname));
    }
  });
var uploadi=multer({
    storage:Storagei
}).single('filei');


//Conecting db to server
const Postmod=mongoose.model("Postmod",postSchema);


app.get("/",function(req,res)
{
   
res.render("home",{homecontent:homepage
});

});

app.get("/home",function(req,res)
{
   
res.render("home",{homecontent:homepage
});

});

app.get("/FAQ",function(req,res)
{
     let query=[]
     Postmod.find({},function(err,query){
         if(!err){
         if(query.length>0)
         {
            res.render("faq",{posts:query});
         }
         else
         {
             console.log("Not succcessfull")
            res.render("faq",{posts:query});
         }
        }
     });
      
   
   });

   app.get("/cyberanswers",function(req,res)
{
     let query=[]
     cyber.find({},function(err,query){
         if(!err){
         if(query.length>0)
         {
            res.render("cyberanswers",{posts:query});
         }
         else
         {
             console.log("Not succcessfull")
            res.render("cyberanswers",{posts:query});
         }
        }
     });
      
   
   });

   app.get("/status",function(req,res)
   {
    let query=[]
    doctor.find({},function(err,query){
         if(!err){
         if(query.length>0)
         {
            res.render("status",{newListItems:query});
         }
         else
         {
             console.log("Not succcessfull")
           // res.render("status",{newListItems:query});
         }
        }
     });
    
  });
  app.get("/cyberstatus",function(req,res)
   {
  let question=[]
  police.find({},function(err,question){
       if(!err){
       if(question.length>0)
       {
          res.render("cyberstatus",{newListItems:question});
       }
       else
       {
           console.log("Not succcessfull")
        //  res.render("cyberstatus",{newListItems:question});
       }
      }
   });
});
  
  app.get("/statusAccept",function(req,res)
   {
    res.render("statusAccept");
  });
  app.get("/statusDeny",function(req,res)
  {
   res.render("statusDeny");
 });
   app.get("/login",function(req,res)
   {
    res.render("login");
  });
  app.get("/legal",function(req,res)
  {
   res.render("legal");
 });
  app.get("/doctorreg",function(req,res){

    res.render("doctorreg");
  });
  app.get("/doctorlogin",function(req,res){

    res.render("doctorlogin");
  });
  app.get("/policelogin",function(req,res){

    res.render("policelogin");
  });
  app.get("/policereg",function(req,res){

    res.render("policereg");
  });
  app.get("/health",function(req,res){

    res.render("health");
  });
  app.get("/approve",function(req,res){

    res.render("approve");
  });
app.get("/about",function(req,res)
{
res.render("about",{aboutcontent:aboutus});
});
app.get("/contact",function(req,res)
{
res.render("contact",{contactcontent:contactus});
});

app.get("/compose",function(req,res)
{  
res.render("compose",
{
posts:posts
});

});
app.get("/cyber",function(req,res)
{  
res.render("cyber",
{
complaints:complaints
});

});
app.post("/FAQ",function(req,res){
    var queryId=req.body.queryId;
    // var qcontent=req.body.content;
    const update={
        reply:req.body.queryBody
    };
     Postmod.findOneAndUpdate({_id:queryId},update,function(err,queryInfo){
         if(!err){
         console.log(queryInfo);     
         }
         else{
             console.log("err");
         }
     });
   res.redirect("/FAQ");

});
app.post("/cyberanswers",function(req,res){
    var queryId=req.body.queryId;
    // var qcontent=req.body.content;
    const update={
        reply:req.body.queryBody
    };
     cyber.findOneAndUpdate({_id:queryId},update,function(err,queryInfo){
         if(!err){
         console.log(queryInfo);     
         }
         else{
             console.log("err");
         }
     });
   res.redirect("/cyberanswers");

});



app.post("/compose",function(req,res){
const post=new Postmod({
    title:req.body.postquery,
    content:req.body.postbody,
    reply:""
});
post.save();
res.redirect("/home") ; 

})

app.post("/cyber",function(req,res){
    const post=new cyber({
        title:req.body.postquery,
        content:req.body.postbody,
        reply:""
    });
    post.save();
    res.redirect("/home") ; 
    
    })
app.post("/login",function(req,res){
    const username=req.body.username;
    const password=md5(req.body.password);

   admin.findOne({username:username},function(err,foundUser){
       if(err){
           console.log(err);
       }else{
           if(foundUser){
               if(foundUser.password===password){
                   res.redirect("/approve");
               }
           }
       }
   })

   

});
app.post("/doctorlogin",function(req,res){
    const username=req.body.username;
    const password=md5(req.body.password);

   doctor.findOne({username:username},function(err,foundUser){
       if(err){
           console.log(err);
       }else{
           if(foundUser){
               if(foundUser.password===password){
                   console.log("Correct psword")
                   res.redirect("/FAQ");
               }
           }else{
           console.log("user Not found");
           }
       }
   })
   

});
app.post("/policelogin",function(req,res){
    const username=req.body.username;
    const password=md5(req.body.password);

   police.findOne({username:username},function(err,foundUser){
       if(err){
           console.log(err);
       }else{
           if(foundUser){
               if(foundUser.password===password){
                   console.log("Correct psword")
                   res.redirect("/cyberanswers");
               }
           }else{
           console.log("user Not found");
           }
       }
   })
   

});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/',require('./routes/ourshe.js'));
//app.use('/doctors',require('./routes/ourdoc.js'));
app.set('views','./views')


    
 
app.post("/doctorreg",uploadi,function(req,res){

    
    const doc=new doctor({
    username:req.body.username,
    password:md5(req.body.password),
    address:req.body.address,
 cno:req.body.cno,
 image:req.file.filename

    });
  doc.save();

    
    res.redirect("/doctorlogin");
  });
  app.post("/policereg",uploadi,function(req,res){

    
    const pol=new police({
    username:req.body.username,
    password:md5(req.body.password),
    address:req.body.address,
 cno:req.body.cno,
 image:req.file.filename

    });
  pol.save();

    
    res.redirect("/policelogin");
  });
  app.post("/statusAccept",function(req,res){
    const userId=req.body.accept;
    console.log(userId);
    const update={
        status:"Accepted"
    };
     doctor.findOneAndUpdate({_id:userId},update,function(err,userInfo){
         if(!err){
         console.log(userInfo);     
         }
         else{
             console.log("err");
         }
     });
     res.redirect("/status");
 
 });
 app.post("/statusDeny",function(req,res){
     const userId=req.body.deny;
     console.log(userId);
     const update={
         status:"Denied"
     };
     doctor.deleteOne({_id:userId},update,function(err,userInfo){
          if(!err){
          console.log(userInfo);     
          }
          else{
              console.log("err");
          }
      });
      res.redirect("/status");
  
  });
  

app.listen(3000,function()
{
    console.log("Listening on port 3000")
});