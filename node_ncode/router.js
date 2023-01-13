const express = require("express")
const routers =express.Router();

routers.get("/", (req,res) => {
    res.send({
        status: "success",
        message: "Berhasil"
    })
  });

  routers.get("/siswa/:nama", (req, res) => {
    console.log('query', req.query);
    let {nama} = req.params
    let {kelas, angkatan} = req.query
    res.send({
        status: "success",
        message: `Atas nama ${nama}, kelas ${kelas} & angkatan ke-${angkatan} ditemukan`
    })
  })
  
module.exports = routers;