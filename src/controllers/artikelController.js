const { promise } = require("bcrypt/promises");
const { where } = require("sequelize");
const ArtikelModel = require("../models").artikel;

async function createArtikel(req, res) {
  try {
    let payload = req.body;
    const { title, year, descripton } = payload;
    await ArtikelModel.create({
      title,
      year,
      descripton,
      userId: req.id,
    });
    res.status(201).json({
      status: "success",
      msg: "Berhasil Membuat Artikel",
    });
  } catch (error) {
    res.status(401).json({
      status: "FAIL",
      msg: "ADA YANG SALAH",
    });
  }
}

async function createArtikelMulti(req, res) {
  try {
    const { payload } = req.body;

    let success = 0;
    let fail = 0;
    let jumlah = payload.length;
    await Promise.all(
      payload.map(async (item) => {
        try {
          await ArtikelModel.create({
            title: item.title,
            year: item.year,
            description: item.description,
            userId: req.id,
          });

          success = success + 1;
        } catch (err) {
          fail = fail + 1;
        }
      })
    );

    res.status(201).json({
      status: "Success",
      msg: `Berhasil menambahkan ${success} dari ${jumlah} dan gagal ${fail}`,
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
    });
  }
}

async function deleteMulti(req, res) {
  try {
    const { payload } = req.body;
    let success = 0;
    let fail = 0;
    let jumlah = payload.length;
    await Promise.all(
      payload.map(async (item) => {
        try {
          const title = await ArtikelModel.findOne({
            where: {
              id: item.id,
            },
          });
          if (title.userId !== req.id) {
            return fail = fail + 1
          }
          await ArtikelModel.destroy({
            where: { id: item.id },
          });
          success = success + 1;
        } catch (error) {
          console.log(error);
        }
      })
    );
    res.status(200).json({
      status: "Success",
      msg: `Berhasil menghapus ${success} dari ${jumlah} dan gagal ${fail}`,
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
    });
  }
}

async function createArtikelBulk(req, res) {
  try {
    // const payload = req.body.payload
    const { payload } = req.body;
    payload.map((item, index) => {
      item.userId = req.id;
    });
    await ArtikelModel.bulkCreate(payload);
    res.status(201).json({
      status: "success",
      msg: "Berhasil Create Artikel BULK METHODE",
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "Salah ada kesalahan",
    });
  }
}

async function getAll(req, res) {
  try {
    const artikel = await ArtikelModel.findAll({
      where: {
        userId: req.id,
      },
    });
    res.json({
      status: "Success",
      msg: "Ditemukan",
      data: artikel,
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "Artikel Tidak Ditemukan",
    });
  }
}

async function updateArtikel(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { title, year, description } = payload;
    const artikel = await ArtikelModel.findByPk(id);
    if (artikel === null) {
      res.json({
        status: "Fail",
        msg: "artikel gk ada",
      });
    }
    if (artikel.userId !== req.id) {
      res.json({
        status: "Fail",
        msg: "artikel punya orang lain tidak bisa diupdate",
      });
    }
    await ArtikelModel.update(
      {
        title,
        year,
        description,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({
      status: "Success",
      msg: "Diupdate",
      data: artikel,
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "Artikel Tidak Diupdate",
    });
  }
}
async function deleteteArtikel(req, res) {
  try {
    const { id } = req.params;
    const artikel = await ArtikelModel.findByPk(id);
    if (artikel === null) {
      res.json({
        status: "Fail",
        msg: "artikel gk ada",
      });
    }
    if (artikel.userId !== req.id) {
      res.json({
        status: "Fail",
        msg: "artikel punya orang lain tdk bisa dihapus!",
      });
    } else {
      await ArtikelModel.destroy({
        where: {
          id: id,
        },
      });
      res.json({
        status: "Success",
        msg: "Dihapus",
      });
    }
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "Artikel Tidak Dihapus",
    });
  }
}
module.exports = {
  createArtikel,
  getAll,
  updateArtikel,
  deleteteArtikel,
  createArtikelBulk,
  createArtikelMulti,
  deleteMulti,
};
