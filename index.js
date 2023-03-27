const express = require("express")
const app = express()
app.use(express.json())
const{connection}=require("./db")

const{userRoutes}=require("./Routes/userRouts")
const{authentication}=require("./middleware/authorization")
const{postRoutes}=require("./Routes/postRouts")
app.use("/user",userRoutes)
app.use(authentication)
app.use("/post",postRoutes)




app.listen(9090,async()=>{
  await connection
  console.log("connect to the db.")
    console.log("server is runing...")
})