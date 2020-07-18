import express from 'express'
//to handle the complexities of parsing streamable request objects so that we can simplify
//browser-server communication by exchanging JSON in the request body
import bodyParser from 'body-parser'
//Cookie parsing middleware to parse and set cookies in request objects.
import cookieParser from 'cookie-parser'
//attempt to compress response bodies for all requests that traverse through the middleware.
import compress from 'compression'
//to enable cross-origin resource sharing (CORS).
import cors from 'cors'
//Collection of middleware functions to help secure Express apps by setting various HTTP headers.
import helmet from 'helmet'

import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import devBundle from './devBundle'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import MainRouter from './../client/MainRouter'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './../client/theme'

const app = express()
const CURRENT_WORKING_DIR = process.cwd()
devBundle.compile(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.use('/', userRoutes)
app.use('/', authRoutes)
app.get('/', (req, res) => {
    res.status(200).send(Template())
})

app.get('*', (req, res) => {
    // 1. Generate CSS styles using Material-UI's ServerStyleSheets
    // 2. Use renderToString to generate markup which renders 
    //    components specific to the route requested
    // 3. Return template with markup and CSS styles in the response
    const sheets = new ServerStyleSheets()
    const context = {}
    const markup = ReactDOMServer.renderToString(
        sheets.collect(
            <StaticRouter location={req.url} context={context}>
                <ThemeProvider theme={theme}>
                    <MainRouter />
                </ThemeProvider>
            </StaticRouter>
        )
    )
    if (context.url) {
        return res.redirect(303, context.url)
      }
      const css = sheets.toString()
      res.status(200).send(Template({
        markup: markup,
        css: css
      }))
    
})

//To handle auth-related errors thrown by express-jwt when it tries to validate JWT tokens in incoming requests
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
})
//To handle the requests to static files such as css files, images or the bundled client-side js
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

export default app