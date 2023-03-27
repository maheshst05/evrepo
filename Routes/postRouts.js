const express = require("express")
const postRoutes = express.Router()
const {PostModel}= require("../Model/postModel")


//post
postRoutes.post("/add",async(req,res)=>{
try {
const payload = req.body;

const post = new PostModel(payload)
await post.save()

res.send({"msg":"new post uploaded"})
    


} catch (error) { 
   res.send({"msg":error.message})
}

})
//get max and min comment and also paggination
postRoutes.get("/",async(req,res)=>{
    const max = +req.query.max;    
    const min = +req.query.min;
    try {
        const {user}= req.body
        const post =await PostModel.find({user})
        if(post.length>0){
         if(min&&max){   
    const posts =await PostModel.find({no_of_comments:{$gte:min,$lte:max}}).skip(1-1).limit(3) 
    res.send(posts)
        }else{
            const posts =await PostModel.find({user}).skip(1-1).limit(3) 
    res.send(posts)
        }
        }else{
            res.send({"msg":"no any post of this user"})
        }
        
    } catch (error) {
        res.send({"msg":error.message})
    }
})

//top and also pagination
postRoutes.get("/top",async(req,res)=>{
try {
    
    const {user}= req.body
    const post =await PostModel.find({user})
    if(post.length>0){
        

        const post = await PostModel.find({}).sort({no_if_comments:-1}).skip(1-1).limit(3)
      
    res.send(post)
    

    }else{
        res.send({"msg":"no any post of this user"})
    }


  
} catch (error) {
    res.send({"msg":error.message})
}

})


//update
postRoutes.patch("/update/:id",async(req,res)=>{
    try {
        

        const {user}= req.body
        const post =await PostModel.find({user})
        if(post.length>0){
            
        const payload = req.body
            const id = req.params.id
                    const posts = await PostModel.findByIdAndUpdate({_id:id},payload)
                    res.send({"msg":"update"})
    
        }else{
            res.send({"msg":"no any post of this user"})
        }


        
    } catch (error) {
        res.send({"msg":error.message})
    }
})

//delete
postRoutes.delete("/delete/:id",async(req,res)=>{

try {
    const {user}= req.body
    const post =await PostModel.find({user})
    if(post.length>0){
        
    const id = req.params.id;
    const post =  await PostModel.findByIdAndDelete({_id:id})
    res.send({"msg":"delete"})

    }else{
        res.send({"msg":"no any post of this user"})
    }





} catch (error) {
    res.send({"msg":error.message})
}

})

//get by query

postRoutes.get("/get",async(req,res)=>{
 

  const device = req.query.device;
  
    try {

        const {user}= req.body
    const post =await PostModel.find({user})
    if(post.length>0){
        

        const postw =  await PostModel.find({device:device})
        res.send(postw)
    }else{
        res.send({"msg":"no any post of this user"})
    }



    } catch (error) {
        res.send({"msg":error.message})
    }


})



module.exports={
    postRoutes
}


// let min = req.query.min;
// let max = req.query.max;

// let genre = req.query.genre;
// let year = req.query.year;
// //* There should be a filter to get the movies in between a "min" and "max" rating
// if(min&&max){
//     const movie =await moviemodel.find({rating:{$gte:min,$lte:max}}) 
//     res.send(movie)
// }