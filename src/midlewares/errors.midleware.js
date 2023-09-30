//Necesitamos un midleware para mostrar errores en la consola (log errors)
const logError = (err, req, res, next) => {
    console.log(err); // Mostrar la fecha del error
    next(err);
}

//Error
//{status,error,message}
const errorHandler = (err, req, res, next) => {
    const { status, ...error } = err;
    res.status((status || 500)).json(error)
}

const notFoundErrorHandler = (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource is not into server'
    })
}

module.exports = {logError,errorHandler,notFoundErrorHandler}