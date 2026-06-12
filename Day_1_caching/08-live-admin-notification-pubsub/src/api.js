import express from 'express'
import Redis from 'ioredis'

const publisher=new Redis("redis://localhost:6379")
const app=express()
app.use(express.json())
app.post("/notifications", async (req,res)=>{
    const payload={
        title: req.body.title,
        createdAt: new Date().toISOString()
    }
    const receivers= await publisher.publish("notifications",JSON.stringify(payload))
    res.json({message: `Notification sent to ${receivers} subscribers`})
})
app.post("/email", async (req,res)=>{
    const payload={
        to:req.body.to,
        subject:req.body.subject,
        body:req.body.body,
        createdAt:new Date().toISOString()
        
    }
    const receivers= await publisher.publish("email",JSON.stringify(payload))
    res.json({message:`email sent to  ${receivers} subscriber`})
})

app.listen(3000,()=>{
    console.log("server is listning on http://localhost:3000");
    
})