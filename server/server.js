import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

// Database Connection URL
const url = process.env.MONGODB_URI || 'mongodb+srv://kai:111222333@cluster0.erhaa.azure.mongodb.net/users?retryWrites=true&w=majority';

mongoose.connect(url, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true } )
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`)
})

app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})