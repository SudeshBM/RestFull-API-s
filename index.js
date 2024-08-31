const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")//to require method-override functionality

app.use(express.urlencoded({extended:true}));//to parse data from post request
app.use(methodOverride('_method'));//to use method-override functionality in the form in edit.ejs

app.set("view engine","ejs");// to set view engine to ejs 
app.set("views",path.join(__dirname,"views"));// to access files inside views folder

app.use(express.static(path.join(__dirname,"public")));// to access files inside public folder

// database
let posts = [
    {   
        id : uuidv4(),        
        username : "arun sagar",
        content : "I Love Coding !"
    },
    {
        id : uuidv4(),
        username : "sudesh",
        content : "A Lion Does Not Concern Himself With The Opinions Of A Sheep"
    },
    {
        id : uuidv4(),
        username : "rahul kumar",
        content : "I Got Selected For My First Internship"
    }
]

// 1) To get posts or index route that is our main page
app.get("/posts", (req,res) => {
    res.render("index.ejs", {posts});//posts data from database is sent to index.ejs
});

// 2) To create a new post via a button
// i. a form is created via get request to gather user info,and is sent to backend
app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

// ii. accepts post request from the form and add the new post to database
app.post("/posts", (req,res) => {
    let { username,content } = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

// 3) show route i.e, to view a particular post
app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);//to find a post in the database
    res.render("show.ejs",{post});
});

// 4) to update a specific post(content)
app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

// Edit Route
app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

// 5) to delete a post
app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;
     posts= posts.filter((p) => id !== p.id);
     res.redirect("/posts");
});

app.listen(port, () => {
    console.log("listening to port : 8080");
}) 