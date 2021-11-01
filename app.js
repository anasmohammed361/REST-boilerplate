import express, { urlencoded } from "express";
import mongoose  from "mongoose";
import{config} from "dotenv";
import middleware from "./validataData.mjs"
config()
const app=express()
// app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(middleware)
let uri=process.env.URI

// let schema= new mongoose.Schema({
//     name:String,
//     age:{
//         required:true,
//         type:Number
//     }
// },{collection:'info'})
// let model= mongoose.model('inf',schema)

//         ||||||||||||||||||||||||||||||||||||||||||||||||||| info |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
app.route("/info")

.get(async(req,res)=>{
 try { await mongoose.connect(uri);
   let data= await model.find()
   res.send(data)
   }
   catch(err){
       res.send(err)
       console.log(err)
   }
   finally{
      await mongoose.connection.close()
   }
})

.post(async(req,res)=>{
    try { 
        await mongoose.connect(uri);
        if(!req.body.name||req.body.age==0) {
            res.status(204).send("Send Data Fucker");
            return;
        }
        let data=new model({
            name:req.body.name,
            age:Number(req.body.age)
        })
        let result=await data.save()
        res.status(201).send("Added")
      }
      catch(err){
         res.send(err)
      }
      finally{
         await mongoose.connection.close()
      }
   })

.delete(async(req,res)=>{
    try{
        await mongoose.connect(uri);
       let data= await model.deleteOne({name:req.body.name})
       res.send(data)
    }catch(err){
        res.send(err)
        console.log(err);
    }
    finally{
       await mongoose.connection.close()
    }
})
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| query |||||||||||||||||||||||||||||||||||||||||||||||||||||||||
app.route("/info/:name")

.get(async(req,res)=>{
    try { 
      await mongoose.connect(uri);
      let data= await model.findOne({name:req.params.name})
      if(!data) res.status(404);
      res.send(data);
      }
      catch(err){
          res.send(err)
          console.log(err)
      }
      finally{
         await mongoose.connection.close()
      }
   })

.put(async(req,res)=>{
try{
    await mongoose.connect(uri);
    if(!req.body.name||req.body.age==0) {
        res.status(405).send("Send Data Fucker");
        return;
    }
    let data=  await model.replaceOne({
        name:req.params.name
    },{
        name:req.body.name,
        age:req.body.age
    })
    if(!data.modifiedCount){ 
        res.status(404).send("Not Updated")
        return
    }
    res.status(200).send(data);
}
catch(err){
    res.send(err)
    console.log(err);
}
finally{
   await mongoose.connection.close()
}
})   


.patch(async(req,res)=>{
    try{
        await mongoose.connect(uri);
        console.log(req.body)
        let data=await model.updateOne({
            name:req.params.name
        },{
            $set:req.body
        })
         res.send(data)
    }
 catch(err){
     console.log(err);
     res.send(err)
 }
 finally{
   await mongoose.connection.close()
 }
})

.delete(async(req,res)=>{
    try{
        await mongoose.connect(uri);
        let data=await model.deleteOne({
            name:req.params.name
        })
        if(data.deletedCount==0){
            res.status(404)
        }
        res.send(data)
    }
 catch(err){
     console.log(err);
     res.send(err)
 }
 finally{
   await mongoose.connection.close()
 }
})



app.listen(3000,()=>console.log("connected"))