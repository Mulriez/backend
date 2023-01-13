const express = require("express")
const router = express.Router();

router.get("/", (req,res) => {
    res.send("Hello World")
  });
  router.get("/", (req,res) => {
    res.send({
      status : "success",
      message : "Mulyeah"
    })
  })
  router.get("/", (req, res) => {
    res.send({
        status: "success",
        message: "Running in get"
    })
  })
  router.post("/", (req, res) => {
    res.send({
        status: "success",
        message: "Running in post"
    })
  })
  router.put("/", (req, res) => {
    res.send({
        status: "success",
        message: "Running in put"
    })
  })
  router.delete("/", (req, res) => {
    res.send({
        status: "success",
        message: "Running in delete"
    })
  })
  router.get("/siswa/:nama", (req, res) => {
    console.log('params', req.params);
    console.log('query', req.query);
    res.send({
        status: "success",
        message: `Atas nama ${req.params.nama}, kelas ${req.query.kelas} & angkatan ke-${req.query.angkatan} ditemukan`
    })
  })

  module.exports = router;