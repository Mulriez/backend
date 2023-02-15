const { promise } = require("bcrypt/promises");
const MateriModel = require("../models").materi;

async function getListMateri(req, res) {
  try {
    let { page, pageSize, offset, punya } = req.query;
    if (punya == "saya") {
      const materi = await MateriModel.findAndCountAll({
        where: {
          userId: req.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        limit: pageSize,
        offset: offset,
        order: [["id", "ASC"]],
      });
      res.json({
        status: "berhasil",
        msg: "Materi ditemukan",
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalData: materi.count,
        },
        data: materi.rows,
      });
    } else {
      const materi = await MateriModel.findAndCountAll({
        limit: pageSize,
        offset: offset,
        order: [["id", "ASC"]],
      });
      res.json({
        status: "berhasil",
        msg: "Materi ditemukan",
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalData: materi.count,
        },
        data: materi,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: "Gagal",
      msg: "Materi tidak ditemukan",
    });
  }
}

async function createMateri(req, res) {
  try {
    let { payload } = req.body;
    let success = 0;
    let fail = 0;
    let jumlah = payload.length;
    console.log(req.role);
    if (req.role === "guru") {
      await Promise.all(
        payload.map(async (item, index) => {
          try {
            await MateriModel.create({
              mapel: item.mapel,
              kelas: item.kelas,
              materi: item.materi,
              userId: req.id,
            });

            success = success + 1;
          } catch (err) {
            fail = fail + 1;
          }
        })
      );

      res.status(201).json({
        status: "201",

        msg: `sukses menambahkan ${success} Materi dari total ${jumlah} Materi dan gagal ${fail} Materi`,
      });
    } else {
      res.status(403).json({
        status: "Fail",
        msg: "Anda tidak memiliki akses karena role anda adalah siswa",
      });
    }
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      msg: "Gagal membuat materi",
    });
  }
}

async function updateMateri(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { mapel, materi, kelas } = payload;
    const Materi = await MateriModel.findByPk(id);
    if (Materi === null) {
      return res.status(404).json({
        status: "Fail",
        message: "Materi gk ketemu",
      });
    }
    if (req.role === "guru") {
      if (Materi.userId != req.id) {
        return res.status(422).json({
          status: "Fail",
          message: "Materi punya guru lain tidak bisa update",
        });
      }
      await MateriModel.update(
        {
          mapel,
          kelas,
          materi,
        },
        {
          where: {
            userId: req.id,
            id: id,
          },
        }
      );
    } else {
      return res.status(422).json({
        status: "Fail",
        message: "Anda tidak memiliki akses karena role anda adalah siswa",
      });
    }
    res.json({
      status: "Success",
      message: "Updated",
      // data: artikel,
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "something went wrong",
    });
  }
}

async function deleteMateriMulti(req, res) {
  try {
    const { payload } = req.body;
    let success = 0;
    let fail = 0;
    let jumlah = payload.length;
    if (req.role === "siswa") {
      return res.status(400).json({
        status: "fail",
        msg: "Anda tidak memiliki akses karena role anda adalah siswa",
      });
    } else {
      await Promise.all(
        payload.map(async (item) => {
          try {
            const hapus = await MateriModel.findOne({
              where: { id: item.id },
            });
            if (hapus.userId !== req.id) {
              return (fail = fail + 1);
            } else {
              await MateriModel.destroy({
                where: { id: item.id },
              });
              success = success + 1;
            }
          } catch (err) {
            fail = fail + 1;
          }
        })
      );
    }

    res.json({
      status: "success",
      msg: `sukses menghapus ${success} artikel dari total ${jumlah} artikel dan gagal ${fail} artikel`,
    });
  } catch (err) {
    res.status(403).json({
      status: "error",
      msg: "tidak bisa menghapus artikel",
    });
  }
}

module.exports = {
  getListMateri,
  createMateri,
  updateMateri,
  deleteMateriMulti,
};
