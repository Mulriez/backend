const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
// const multer = require("multer")
// const fs = require("fs")
// const path = require("path")
// const upload = multer({dest:"public"})

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.post("/post",(req, res) => {
  res.send({
    status: "success",
    message: "Running in Post",
  });
});

//urutan berpengaruh untuk middleware jika callback berada dibawah command midlleware
//maka callback akan dibatasi
// router.use(authMiddleware)

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
router.patch(
  "/nilai/:nama",
  (req, res) => {
    let { nama } = req.params;
    let {matematika, fisika, kimia} = req.query
    res.send({
      status: "success",
      message: `nilai ${nama} adalah matematika ${matematika}, fisika ${fisika}, kimia ${kimia} `,
    });
  }
);
router.get(
  "/absensi/:nama",
  (req, res) => {
    let { nama } = req.params;
    let {status, dari_tanggal, sampai_tanggal} = req.query
    res.send({
      status: "success",
      data:{
        nama: nama,
        status: status,
        dari_tanggal: dari_tanggal,
        sampai_tanggal: sampai_tanggal
      }
    });
  }
);
router.get(
  "/user",
  (req, res) => {
    let {nama,kelas} = req.body
    res.send({
      status: "200 mah sukses",
      message: "success",
      data:{
        nama: nama,
        kelas: kelas,
      }
    });
  }
);
router.post(
  "/user/create",
  (req, res) => {
    const payload = req.body
    let {nama,kelas} = req.body
    res.json({
      status: "Success",
      message: "Latihan Request Body",
      payload: payload
    });
  }
);

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

// router.post("/upload", upload.single("file"),(req,res)=>{
//   const file = req.file
//   if (file) {
//     const target = path.join(__dirname, "public", file.originalname);
//     fs.renameSync(file.path, target)
//     res.send({
//       status: "success",
//       message: "berhasiel upload"
//     })
//   }else{
//     res.send({
//       status: "Fail",
//       message: "gagal upload"
//     })
//   }
// })


module.exports = router;
