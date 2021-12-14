module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6eec6bdc5d8b551d9e0eed4776b9f9b1'),
  },
});
