const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, (req, res) => {
  res.send("Hello World");
});
router.post("/post", authMiddleware, (req, res) => {
  res.send({
    status: "success",
    message: "Running in Post",
  });
});
router.put("/put", (req, res) => {
  res.send({
    status: "success",
    message: "Running in Put",
  });
});
router.delete("/delete", (req, res) => {
  res.send({
    status: "success",
    message: "Running in Delete",
  });
});

// query params ketika wajib diisi
router.get("/siswa/:nama/:sekolah", (req, res) => {
  // let nama = req.params.nama
  // let sekolah = req.params.sekolah

  let { nama, sekolah } = req.params;
  res.send({
    status: "success",
    message: `Nama beliau ${nama} & bersekolah di ${sekolah}`,
  });
});

//query string bebas(dinamis)
router.get("/siswa/:nama", (req, res) => {
  // let nama = req.params.nama
  // let sekolah = req.params.sekolah

  let { nama } = req.params;
  let { kelas = "X", sekolah = "MQ" } = req.query;
  //bisa diisi nilai default
  res.send({
    status: "success",
    message: `Nama beliau ${nama} duduk di kelas ${kelas} di ${sekolah}`,
  });
});

module.exports = router;
