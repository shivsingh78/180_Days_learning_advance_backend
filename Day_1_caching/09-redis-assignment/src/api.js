import express from 'express'
import Redis from 'ioredis'
const redis=new Redis()
const app=express()

app.use(express.json())

app.post("/post/:id/view", async (req,res)=>{
    const postId=req.params.id
const views=await redis.incr(`post:${postId}:views`)
res.json({postId,views})
})

app.post("/leaderboard/score", async (req,res)=>{
const {userId,points}=req.body;
const score=await redis.zincrby(
    "leaderboard",
    points,
    userId
)
res.json({userId,points})
})

app.get("/leaderboard", async (req,res)=>{
    const totalPost=await redis.zrange("leaderboard",0,9,"REV","WITHSCORES")
    const result=[]
    for(let i=0;i<totalPost.length;i+=2){
       result.push({
        userId:totalPost[i],
        score:Number(totalPost[i+1])
       })
    }
    res.json({result})
})

app.get("/leaderboard/:userId/rank", async(req,res)=>{
    const userId = req.params.userId;
    const rank=await redis.zrevrank(
        "leaderboard",
        userId
    )
    if(rank===null){
        return res.status(404).json({message:"user not found"})
    }
    res.json({userId,rank:rank+1})
})

app.listen(3000,()=>{
    console.log("server is listen on http://localhost:3000");
    
})