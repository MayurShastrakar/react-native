//  1.



const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());


mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to database!');
})
.catch((error) => {
  console.error('Error connecting to database:', error);
});
// 
// Schema Design
mongoose.set("strictQuery", true);
 const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    passward:String
 })
 

//  Model
 const User = new mongoose.model("User", userSchema)

 //**** */
 async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
// Routes

app.get("/",(req,res)=>{
    res.send("My API")
})

// Login
app.post("/login",(req,res)=>{
    // res.send("My API Login")
    // console.log(req.body);

    const {email, pass}=req.body
    User.findOne({email:email}, (err, user)=>{
        if(user){
            const isMatch=bcrypt.compare(pass,user.passward)
            if(isMatch){
                console.log(pass,user.passward);
                res.send({message:"Login Successfully", user:user})               
            }
            else{ 
                res.send({message:"Passward didn't match"})
            }
        }
        else{
            console.log(err);
            res.send({message:"User not registered"})
        }
    })
})

// Register
app.post("/register", async(req,res)=>{
    // res.send("My API Register")
    // console.log(req.body);

    const password = 'pass';                                    //** */
    const hashedPassword = await hashPassword(password);

    const {Fullname, email, pass}= await req.body
    User.findOne({email:email}, (err, user)=>{
        if(user){
            res.send({message:"User already registered"})
        }
        else{
            const user =new User({
                name:Fullname,
                email,
                passward:hashedPassword                     //** */
            })
            user.save(err =>{
                if(err){
                    res.send(err)
                }
                else {res.send({ message:"Successfully Registered"}) }
            })
        }
    })

})




app.listen(8008, ()=>{
    console.log("BE Started at port 8008");
})