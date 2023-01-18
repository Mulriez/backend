const errorHandle = (err,req,res,next) => {
    res.status(500).json({
        status:"Error",
        message:"Something wen't wrong"
    })
}

module.exports = errorHandle