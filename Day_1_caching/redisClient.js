import redis from 'redis'

const client = redis.createClient({
     url: "redis://localhost:6379"
})

client.on("error",(err) => console.log("Redis Error:", err))

async function connectRedis(){
     await client.connect()
     console.log("Redis connected")
}

export {client,connectRedis}