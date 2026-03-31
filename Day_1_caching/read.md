# What is caching ?
store frequently access data in fast storage (RAM) so you don't recompute or fetch from db agin.
**User->srever->cache->if miss -> db** By using cache you can reducess db .

## Caching - Redis 
Redis Data Structures
String
SET user:1 "shiv"

Hash (Object-like)
HSET user:1 name "Shiv" age 22
HGET user:1 name

List(Queue)
LPUSH tasks "task1"
RPOP tasks

Set (Unique value)
SADD users "A" "B"

Sorted Set (Ranking)
ZADD leaderboard 100 "Shiv"
 