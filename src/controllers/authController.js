const UserModel = require("../models").user;
const ForgotPasswordModel = require("../models").password;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmailHandle = require("../mail/index");
const crypto = require("crypto");
const dayjs = require("dayjs");
require("dotenv").config();

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
        msg: "Password lama & Password beda",
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

async function updatePassword(req, res) {
  try {
    const payload = req.body;
    const { email, password, new_password } = payload;

    const user = await UserModel.findOne({
      where: {
        email: req.email,
      },
    });
    const verify = await bcrypt.compareSync(password, user.password);
    if (user === null) {
      return res.json({
        status: "gagal",
        msg: "email gk ketemu",
      });
    }
    if (verify) {
      let hashPassword = await bcrypt.hash(new_password, 10);
      await UserModel.update(
        { password: hashPassword },
        {
          where: {
            id: user.id,
          },
        }
      );
      res.json({
        status: "berhasil",
        msg: "password update",
      });
    } else {
      res.json({
        status: "gagal",
        msg: "password lama tidak sesuai",
      });
    }
  } catch (error) {
    res.status(403).json({
      status: "gagal",
      msg: "Ada kesalahan",
    });
  }
}

async function lupaPassword(req, res) {
  try {
    const { email } = req.body;
    //cek apakah user dengan email tsb terdaftar
    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    //jika tidak terdaftar berikan response dengan msg email tidak terdaftar
    if (user === null) {
      return res.status(422).json({
        status: "gagal",
        msg: "email gk ketemu, pakai yg sudah terdaftar",
      });
    }
    // cek apakah token sudah pernah dibuat pada user tsb di table forgot password
    const currentToken = await ForgotPasswordModel.findOne({
      where: {
        userId: user.id,
      },
    });
    // sudah hapus
    if (currentToken !== null) {
      await ForgotPasswordModel.destroy({
        where: {
          userId: user.id,
        },
      });
    }
    // jika belum buat token
    const token = crypto.randomBytes(32).toString("hex");
    const date = new Date();
    const expire = date.setHours(date.getHours() + 1);

    await ForgotPasswordModel.create({
      userId: user.id,
      token: token,
      expireDate: dayjs(expire).format("YYYY-MM-DD hh:mm:ss"),
    });

    const context = {
      link: `${process.env.MAIL_CLIENT_URL}/reset-password/${user.id}/${token}`,
    };
    const sendEMail = await sendEmailHandle(
      email,
      "lupa password",
      "lupaPassword",
      context
    );
    if (sendEMail === "success") {
      res.json({
        status: "success",
        msg: "silahkan cek email",
      });
    } else {
      res.status(403).json({
        status: "gagal",
        msg: "Gunakan email yg terdaftar",
      });
    }
  } catch (error) {
    res.status(403).json({
      status: "gagal",
      msg: "Ada kesalahan",
    });
  }
}
async function resetPassword(req, res) {
  try {
    const { newPassword } = req.body;
    const { id, token } = req.params;
    const currentToken = await ForgotPasswordModel.findOne({
      where: { userId: id, token: token },
    });

    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (currentToken === null) {
      res.status(403).json({
        status: "Fail",
        msg: "token invalid",
      });
    } else {
      let expired = currentToken.expiredDate;
      let expire = dayjs(Date());
      let difference = expire.diff(expired, "hour");
      if (difference !== 0) {
        res.json({
          status: "Fail",
          msg: "Token has expired",
        });
      } else {
        let hashPassword = await bcrypt.hash(newPassword, 10);
        await UserModel.update(
          { password: hashPassword },
          {
            where: {
              id: user.id,
            },
          }
        );
        await ForgotPasswordModel.destroy({ where: { token: token } });
        res.json({
          status: "Success",
          msg: "password updated",
        });
      }
    }
  } catch (err) {
    console.log("err", err);
    res.status(403).json({
      status: "Fail",
      msg: "ada error",
      err: err,
      // token: currentToken
    });
  }
}

module.exports = {
  register,
  login,
  updatePassword,
  lupaPassword,
  resetPassword,
};
