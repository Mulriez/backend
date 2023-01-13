const express = require("express")
const app = express()
// const routers = require("./router")
const port = 8080

// app.use(routers)

app.get("/", (req,res) => {
  res.end("Hello World")
});
// app.get("/user", (req,res) => {
//   res.send({
//     status : "success",
//     message : "Mulyeah"
//   })
// })
// app.get("/user", (req, res) => {
//   res.send({
//       status: "success",
//       message: "Running in get"
//   })
// })
// app.post("/user", (req, res) => {
//   res.send({
//       status: "success",
//       message: "Running in post"
//   })
// })
// app.put("/user", (req, res) => {
//   res.send({
//       status: "success",
//       message: "Running in put"
//   })
// })
// app.delete("/user", (req, res) => {
//   res.send({
//       status: "success",
//       message: "Running in delete"
//   })
// })
// app.get("/siswa/:nama", (req, res) => {
//   console.log('params', req.params);
//   console.log('query', req.query);
//   res.send({
//       status: "success",
//       message: `Atas nama ${req.params.nama}, kelas ${req.query.kelas} & angkatan ke-${req.query.angkatan} ditemukan`
//   })
// })

app.listen(port, () => console.log(`Running in http://localhost:${port}`))

// app.listen(port, function (){
//   return console.log(`running in ${port}`);
// })