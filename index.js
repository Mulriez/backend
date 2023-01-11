const express = require("express")
const app = express()
const port = 8080

app.get("/", (req,res) => {
  res.end("Hello World")
});
// app.get("/user", (req,res) => {
//   res.send({
//     status : "success",
//     message : "Mulyeah"
//   })
// })
app.get("/user", (req, res) => {
  res.send({
      status: "success",
      message: "Running in get"
  })
})
app.post("/user", (req, res) => {
  res.send({
      status: "success",
      message: "Running in post"
  })
})
app.put("/user", (req, res) => {
  res.send({
      status: "success",
      message: "Running in put"
  })
})
app.delete("/user", (req, res) => {
  res.send({
      status: "success",
      message: "Running in delete"
  })
})
app.get("/siswa/:nama", (req, res) => {
  res.send({
      status: "success",
      message: `Atas nama ${req.params.nama}`
  })
})


app.listen(port, () => console.log(`Running in http://localhost:${port}`))