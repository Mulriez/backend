const express = require("express")
const app = express()
const router = require("./src/routes/index")
const port = 8040

app.use(router)



app.listen(port, () => console.log(`Running in http://localhost:${port}`))
