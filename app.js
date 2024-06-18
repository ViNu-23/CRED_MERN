const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
 let users = await userModel.find()
  res.render("read",{users});
});

app.post("/create", async (req, res) => {
  let { name, email, url } = req.body;
  let createdUser = await userModel.create({
    name,
    email, 
    url,
  });
  res.redirect('/');
});

app.get("/delete/:id", async (req, res) => {
  let deleteUser= await userModel.findOneAndDelete({_id:req.params.id})
  res.redirect("/read");
})

app.get("/edit/:id", async (req, res)=>{
  let editUser= await userModel.findOne({_id:req.params.id})
res.render("edit",{editUser});
})

app.post("/update/:id", async (req,res) => {
   let {name, email, url} = req.body;
   let updateUser= await userModel.findOneAndUpdate({_id:req.params.id},{name,email,url},{new:true})
    res.redirect("/read");
  })


app.listen(3000);
