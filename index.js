const express=require("express");
const app=express();
const path=require('path');
const fs=require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.set("view engine",'ejs');


app.get("/",function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files});
        // console.log(files);
    })
});
// reading file data
app.get("/files/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
       res.render('show',{filename:req.params.filename,filedata:filedata});
        // console.log(files);
    })
});

// File Title
app.get("/edit/:filename",function(req,res){
   res.render('edit',{filename:req.params.filename})
});
app.get("/edit/:filedata",function(req,res){
   res.render('edit',{filedata:req.params.filedata})
});
app.post("/edit",function(req,res){
    // console.log(req.body)
    // FileRenamed
    fs.rename(`./files/${req.body.prevtitle}`,`./files/${req.body.newTitle}`,function(err){
        res.redirect('/');
    })
    // New Content Update
    // fs.writeFile(`./files/${req.body.newTitle}`,req.body.newdesc,function(err){
    //     res.redirect('/');
    // })

   
});



// FileData
// app.get("/edit/:filedata",function(req,res){
//    res.render('edit',{filedata:req.params.filedata})
// });

app.post("/create",function(req,res){
    fs.writeFile(`./files/${req.body.title.split('').join('')}.txt`,req.body.details,function(err){
        // Create hote hi vaps uss page pe aa jaunga..
        res.redirect('/')
    })
});

// // app.get("/profile/:username",(req,res)=>{
// //     // req.params.username
// //     res.send(`Hello And Welcome ${req.params.username}`)
// // })
// app.get("/profile/:username/:age/:desig",(req,res)=>{
//     // req.params.username
//     res.send(`Hello And Welcome ${req.params.username},Age Is ${req.params.age} And Designation is ${req.params.desig}`)
// })
app.listen(5000,function(){
    console.log("Server Is Running")
})
