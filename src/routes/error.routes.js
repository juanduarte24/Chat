const {logError, 
    errorHandler, 
    notFoundErrorHandler
} = require('../midlewares/errors.midleware')

const errorRoutes = (app)=>{
    app.use(logError)
    app.use(errorHandler)
    app.use(notFoundErrorHandler)
}

module.exports= errorRoutes