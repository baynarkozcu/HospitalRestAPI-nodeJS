const errorException = (err, req, res, next)=>{
    res.json({
        errorCode: err.statusCode,
        messages: err.message,
    });
}

module.exports = errorException;