import express from 'express'
import {client,connectRedis} from "./redisClient.js"
const app=express()
const PORT=3000

app.get("/",(req,res)=>{
     res.send("hello from cache")
})
app.get("/user/:id", async (req,res)=>{
     const id=req.params.id;
     //1.check cache
     const cacheData= await client.get(`user:${id}`)
     if(cacheData){
          return res.json({
               source: "cache",
               data: JSON.parse(cacheData)
          })
     }
     //2.fake db call
     const user = {id,name:"Shiv"};

     //3. Store in cache (TTL 60 sec)
     await client.set(`user:${id}`,JSON.stringify(user))

     
res.json({
     source: "db",
     data:user
})

})

app.listen(PORT , async ()=>{
     await connectRedis()
     console.log(`server is listining on port no. ${PORT}`)
})

