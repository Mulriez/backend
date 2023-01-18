const express = require("express");
const app = express();
const router = require("./src/routes/index");
const notfound = require("./src/middleware/404")
const log = require("./src/middleware/log")
const log2 = require("./src/middleware/log2")
const authMiddleware = require("./src/middleware/authMiddleware")
const errorHandle = require("./src/middleware/errorHandling")
const port = 8040;

//urutan berpengaruh
app.use(express.json());
// app.use(authMiddleware);
app.use(log);
app.use(log2);
app.use(router);
app.use(notfound);
// app.use(errorHandle);

app.listen(port, () => console.log(`Running in http://localhost:${port}`));
