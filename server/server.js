import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

// Database Connection URL
const url = process.env.MONGODB_URI || 'mongodb+srv://myBlog:7bkUXkELZNmE9hn2@cluster0-tovqa.azure.mongodb.net/myBlog?retryWrites=true&w=majority';

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