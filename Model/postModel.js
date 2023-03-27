const mongoose = require("mongoose")

const postScehma = mongoose.Schema({
title:{type:String,required:true},
body:{type:String,required:true},
device:{type:String,required:true,enum:["mobile","laptop","tablet"]},
no_of_comments:{type:Number,required:true},
user:{type:String,required:true}
})


const PostModel =  mongoose.model("post",postScehma)

module.exports={
    PostModel
}
