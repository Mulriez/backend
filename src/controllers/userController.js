const UserModel = require("../models").user;

//get
async function getListUser(req, res) {
  try {
    const users = await UserModel.findAll();
    res.json({
      status: "Success",
      msg: "DITEMUKAN",
      data: users,
    });
  } catch (error) {
    res.status(403).json({
      status: "FAIL",
      msg: "ADA KESALAHAN",
    });
  }
}

//create data into database

//create
async function createUser(req, res) {
  try {
    const payload = req.body;
    let { nama, email, tempatLahir, tanggalLahir } = payload;
    await UserModel.create({
      nama: nama,
      email: email,
      isActive: true,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
    });
    res.status(201).json({
      status: "Success",
      msg: "YATTA, Data Saved :D",
    });
  } catch (error) {
    res.status(403).json({
      status: "FAIL",
      msg: "THERE WAS A PROBLEM :(",
    });
  }
}
//byId
async function getDetailUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        msg: `User Tidak ditemukan`,
      });
    }
    res.json({
      status: "Success",
      msg: "Berhasil kaka :D",
      data: user,
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "THERE WAS A PROBLEM :(",
    });
  }
}
//byParams
async function getDetailUserByParams(req, res) {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        msg: `User Tidak ditemukan`,
      });
    }
    res.json({
      status: "Success",
      msg: "User Ditemukan :D",
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "THERE WAS A PROBLEM :(",
    });
  }
}
//update
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { nama, tempatLahir, tanggalLahir } = payload;
    const user = await UserModel.findByPk(id);
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        msg: `User Tidak ditemukan`,
      });
    }
    // await UserModel.update(
    //   {
    //     nama: nama,
    //     tempatLahir: tempatLahir,
    //     tanggalLahir: tanggalLahir,
    //   },
    //   {
    //     where: {
    //       id: id,
    //     },
    //   }
    // );
    await UserModel.update(
      {
        nama,
        tempatLahir,
        tanggalLahir,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({
      status: "Success",
      msg: "User Updated :D",
      id: id,
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "THERE WAS A PROBLEM :(",
    });
  }
}
//delete
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (user === null) {
      return res.status(404).json({
        status: "Fail",
        msg: `User Tidak ditemukan`,
      });
    }
    await UserModel.destroy({
      where: {
        id: id,
      },
    });

    res.json({
      status: "Success",
      msg: "User Deleted X0",
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "THERE WAS A PROBLEM :(",
    });
  }
}

module.exports = {
  getListUser,
  createUser,
  getDetailUserById,
  getDetailUserByParams,
  updateUser,
  deleteUser,
};
