const express =require("express")
const authRoutes = require("./modules/auth/auth.routes")
const userRoutes = require("./modules/user/user.routes")
const taskRoutes = require("./modules/task/task.routes")
const path = require('path');

require("dotenv").config()
require("./config/db")



const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.use("/task",taskRoutes)


app.get('/download/:fileName', (req, res)=>{
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'upload', fileName);
    res.download(filePath, fileName, function(err){
        if(err){
            console.log("error in download", err);
            res.status(404).send("file not found");
        }
    });
});

app.use((req,res) => {
    return res.status(404).json({
        message : "api not found"
    })
})



app.listen(process.env.PORT , (err)=>{
    if (err) {
        console.log(err);
    }
    console.log("connected to" , process.env.PORT);
})

