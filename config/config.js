//define some server-side configuration-related
//variables that will be used in the code but should not be hardcoded as a best practice,
//as well as for security purposes
const config = {
    //To differentiate between development and production modes
    env: process.env.NODE_ENV || 'development',
    //To define the listening port for the server
    port: process.env.PORT || 3000,
    //The secret key to be used to sign JWT
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    //The location of the MongoDB database instance for the project
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') + '/mernproject'
    }
    export default config