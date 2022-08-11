export default {
  prot: 8030,
  db: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    database: 'battery',
    username: 'root',
    password: 'root',
    timezone: '+08:00',
    define: {
      timestamps: true,
      paranoid: true,
      charset: 'utf8',
      underscored: true,
    },
    dialectOptions: {
      dateStrings: true,
      typeCast: (field: any, next: () => void) => {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  },

  cache: {
    port: 6379,
    host: '127.0.0.1' /* redis */,
    password: 'root',
    db: 1,
    ttl: 5, // 默认缓存有效时间 5 秒
    max: 10, // 最大最小缓存数量
  },

  // bull mq redis
  mq: {
    redis: {
      port: 16379,
      host: '127.0.0.1' /* redis */,
      password: 'root',
      db: 0,
    },
    prefix: 'mq_', // 所有队列键的前缀
    limiter: { max: 1, duration: 1000 }, // 控制队列作业处理速率
  },

  jwt: {
    secret: '123456789',
    expiresIn: '10d',
  },

  cookie: {
    secret: '123456789098765432123456789000',
  },

  throttler: {
    ttl: 60,
    limit: 100,
  },

  swagger: {
    title: 'Nest Fastify Demo',
    description: 'Test Swagger Api',
    version: '1.0.0',
    url: '/api/doc',
  },
};
