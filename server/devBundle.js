//in order to set up a compile method that takes the Express app and configures it to use the Webpack middleware.
import config from './../config/config'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './../webpack.config.client.js'

const compile = (app) => {
    if(config.env === "development"){
        const compiler = webpack(webpackConfig)
        const middleware = webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        })
        app.use(middleware)
        app.use(webpackHotMiddleware(compiler))
    }
}
    export default {
        compile
}