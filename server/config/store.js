const Redis = require('ioredis');
const { Store } = require('koa-session2');

class RedisStore extends Store {
  constructor() {
    super();
    this.redis = new Redis();
  }

  async get(sid, ctx) {
    const data = await this.redis.get(`SESSION:${sid}`);
    return JSON.parse(data);
  }

  async set(session, {sid = this.getID(24), maxAge = 1 * 24 * 60 * 60 } = {}, ctx) {
    try {
      // Use redis set EX to automatically drop expired sessions
      console.log('this.redis.set: ', session, maxAge);
      await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge);
    } catch (e) {
      console.log('redis err: ', e);
    }
    return sid;
  }

  async destroy(sid, ctx) {
    console.log('del sid: ', sid);
    return await this.redis.del(`SESSION:${sid}`);
  }
}

module.exports = RedisStore;
