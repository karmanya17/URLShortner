const express= require("express")
const mongodb=require("mongodb")
const bcrypt=require("bcryptjs")
const mongoclient=mongodb.MongoClient;
const URL="mongodb+srv://karmanya:admin123@cluster0.lxi2p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const cors=require("cors")
const app=express();
app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.get("/",function(req,res){
    res.json({
        message:"Working"
    })
})
app.post("/user/register",async function(req,res){
    try{
        let connection = await mongoclient.connect(URL)
        let db=connection.db("urlUser")
        let salt=await bcrypt.genSalt(10)
        let hash=await bcrypt.hash(req.body.password,salt);
        console.log(hash);
        req.body.password=hash;
        await db.collection('user').insertOne(req.body)
        res.json({
            message:"User Created"
        }) 
    }
    catch(error){
        console.log(error)
    }
})
app.post("/user/login",async function(req,res){
    try
    {
        console.log(req.body);
        let connection = await mongoclient.connect(URL)
        let db=connection.db("urlUser")
        let user= await db.collection("user").findOne({username:req.body.username})
        if(user){
            let result=await bcrypt.compare(req.body.password,user.password)
            if(result){
                //Generate JWT token
                res.json({
                    message:"Login Success"
                })
            }
            else
            {
                res.status(401).json({
                    message:"Password is incorrect"
                })
            }
        }
        else{
            res.status(401).json({
                message:"user Not Found"
            })
        }
    }
    catch{

    }
})
app.listen(process.env.PORT||3000,function(req,res){
    console.log("Server is up at 3000")
})