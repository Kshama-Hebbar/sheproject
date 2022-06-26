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
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
const moment = require('moment')
app.locals.moment = moment;
let posts=[];
//connection URL
mongoose.connect("mongodb://localhost:27017/SHEDB",{useNewUrlParser:true});
const postSchema={
    title:String,
    content:String,
    reply:String
};
const userSchema=new mongoose.Schema({
    username:String,
    password:String
});
const adminSchema=new mongoose.Schema({
    username:String,
    password:String
});
const admin=mongoose.model("admin",adminSchema);
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
             console.log("NOt succcessfull")
            res.render("faq",{posts:query});
         }
        }
     });
      
   
   });

   app.get("/login",function(req,res)
   {
    res.render("login");
  });
  app.get("/legal",function(req,res)
  {
   res.render("legal");
 });
  app.get("/loginc",function(req,res){

    res.render("loginc");
  });
  app.get("/health",function(req,res){

    res.render("health");
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




app.get("/doctors",function(req,res)
{
res.render("doctors",{doctorscontent:dpage});
});

app.post("/compose",function(req,res){
const post=new Postmod({
    title:req.body.postquery,
    content:req.body.postbody,
    reply:""
});
// posts.save();
//posts.push(post)
post.save();
res.redirect("/FAQ") ; 

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
                   res.redirect("/home");
               }
           }
       }
   })

});
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/',require('./routes/ourshe.js'));
//app.use('/doctors',require('./routes/ourdoc.js'));
app.set('views','./views')


app.listen(3000,function()
{
    console.log("Listening on port 3000")
});