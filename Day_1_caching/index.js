//Cache Aside 
// Best for read-heavy apps but first req. slow
import redis from "redis"
const client = redis.createClient()

async function getUser(id){
     let user = await client.get(`user: ${id}`)

     if(user){
          console.log("Cache hit")
          return JSON.parse(user)
     }
     console.log("Cache Miss")
     user = await db.getUser(id);

     await client.setEx(`user:${id}`, 60, JSON.stringify(user))
     return user
}

//Write Through Strategies
async function updateUser(id,newData){
     //update the datbase first
     const updateUser= await db.user.update(id,newData)

     //Immediately update the cache data
     //use setEX to maintain TTL (time to live)
     await client.setEx(`user:${id}`,3600,JSON.stringfy(updateUser))

     return updateUser
}

//Write Behind or Back
async function updateUser2(id, newData){
     //1. Update the Cache immediately (fast)
     await client.set(`user:${id}`, JSON.stringify(updateUser))
     //2. Add this task to a "Background Queue" in Redis
     await client.lpush("db-updates-queue", JSON.stringify({id,newData}))

     // tell the user it's done!
     return {status: "Success", message: "Profile updated!"}


}

//Separate background worker (runs evey few seconds)
async function processDbUpdates(params) {
     const task = await client.rPop("db-updates-queue");
     if(task){
          const {id, newData}=JSON.parse(task)
          await db.user.update(id,newData) //Finally saving to Disk
     }
}