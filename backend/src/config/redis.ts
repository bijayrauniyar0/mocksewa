import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://redis:6379',
});

export async function connectRedis() {
  try {
    await redisClient.connect();
  } catch {
    // console.error('Redis connection error:', error);
  }
}

export default redisClient;
