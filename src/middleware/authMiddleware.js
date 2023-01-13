//untuk membatasi routing kita middleware dijalankan sebelum function dijalakan 

function authMiddleware(req, res, next) {
  console.log("middleware terpanggil");
  console.log("header", req.headers);

  if (req?.headers?.authorization === "123") {
    next();
  } else {
    return res.status(401).json({
      status: "Fail",
      meassage: "Invalid Token",
    });
  }
}

module.exports = authMiddleware;
