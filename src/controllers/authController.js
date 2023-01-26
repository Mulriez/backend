const UserModel = require("../models").user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

async function register(req, res) {
  try {
    const payload = req.body;
    const { nama, email, password } = payload;
    let hashPassword = await bcrypt.hashSync(password, 10);
    await UserModel.create({
      nama,
      email,
      password: hashPassword,
    });
    res.json({
      status: "Success",
      msg: "Register Berhasil",
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Yg salah",
    });
  }
}

async function login(req, res) {
  try {
    const payload = req.body;
    const { email, password } = payload;
    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (user === null) {
      return res.status(422).json({
        status: "Fail",
        msg: "Email tidak ditemukan, register dlu bang...",
      });
    }
    if (password === null) {
      return res.status(422).json({
        status: "Fail",
        msg: "Password & Email beda",
      });
    }
    const verify = await bcrypt.compareSync(password, user.password);
    if (verify === false) {
      return res.status(422).json({
        status: "Fail",
        msg: "Password & Email beda",
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nama: user.nama,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.json({
      status: "Success",
      msg: "Login Berhasil",
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Yg salah",
    });
  }
}

module.exports = { register, login };
