const http = require("http");
const moment = require("moment/moment");
const dayjs = require("dayjs");
const { des, cekBilangan } = require("./example");
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/json");
  //   res.write(des);
  //   res.write(cekBilangan(7));
  //   res.write(moment().calendar());
  //   res.write(dayjs().month());
  // res.write(
  //     JSON.stringify({
  //         status:"succsess",
  //         message: "response success",
  //         data : {
  //             cekBilangan : cekBilangan(4),
  //             des : des,
  //             day : moment().calendar()
  //         }
  //     })
  // )
  const url = req.url;
  if (url === "/sekolah") {
    res.write(
      JSON.stringify({
        status: "success",
        message: "aku berangkat sekolah",
      })
    );
  } else {
    res.write(
      JSON.stringify({
        status: "success",
        message: "aku nggak sekolah",
      })
    );
  }
  res.end();
});

const hostname = "127.0.0.1";
const port = 8085;
server.listen(port, hostname, () => {
  console.log(`Server Running at http://${hostname}:${port}/`);
});
