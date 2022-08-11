export default {
  prot: 8030,
  jwt: {
    secret: '123456789',
    expiresIn: '10d',
  },

  throttler: {
    ttl: 60,
    limit: 100,
  },

  cookie: {
    secret: '123456789098765432123456789000',
  },
};
