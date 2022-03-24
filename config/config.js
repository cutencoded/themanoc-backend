module.exports.config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3007,
    jwtSecret: process.env.JWT_SECRET || 'IN_globulus_verITas',
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/themanocmath',
    request: { limit: '20mb' }
};
