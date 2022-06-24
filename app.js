const express=require('express');
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const homepage="The primary objective of our website is to provide women with a supportive environment where importance is given to their healthcare and legal rights.Our motive is to provide women with an opportunity wherein they can express their opinions";
const contactus="Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
const dpage="Hey";
const aboutus="Desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."; 
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
    content:String
};

//Conecting db to server
const Postmod=mongoose.model("Postmod",postSchema);


app.get("/",function(req,res)
{
   
res.render("home",{homecontent:homepage
});

});
app.get("/FAQ",function(req,res)
{
      res.render("faq",{posts:posts});
   
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
app.get("/doctors",function(req,res)
{
res.render("doctors",{doctorscontent:dpage});
});

app.post("/compose",function(req,res){
const post=new Postmod({
    title:req.body.postquery,
    content:req.body.postbody
});
// posts.save();
posts.push(post)
res.redirect("/FAQ") ; 

})

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/',require('./routes/ourshe.js'));
//app.use('/doctors',require('./routes/ourdoc.js'));
app.set('views','./views')


app.listen(3000,function()
{
    console.log("Listening on port 3000")
});