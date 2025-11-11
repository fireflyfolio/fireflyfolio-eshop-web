export default () => ({
  port: parseInt(process.env.ADMIN_API_PORT ?? '3001'),
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  },
  dbUrl: process.env.DATABASE_URL!,
  redisUrl: process.env.REDIS_URL!,
});
