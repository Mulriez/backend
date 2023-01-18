const notfound = (req,res,next) => {
    res.status(404).json({
        status:"Error",
        message:"Routing not Found"
    })
}

module.exports = notfound