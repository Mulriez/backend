const NilaiModel = require("../models").nilai;
const models = require("../models");
const { Op } = require("sequelize");
const { checkQuery } = require("../utils");

async function getListNilai(req, res) {
  const { page, pageSize } = req.query;
  try {
    const nilai = await NilaiModel.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: models.user,
          require: true,
          as: "user",
          attributes: ["nama"],
        },
      ],
    });
    res.json({
      status: "Success",
      msg: "Nilai Ditemukan",
      pagination: {
        currentPage: page,
        pageSize: pageSize,
      },
      data: nilai,
      query: {
        pageSize,
        page,
      },
    });
  } catch (error) {
    res.status(403).json({
      status: "FAIL",
      msg: "ADA KESALAHAN",
    });
  }
}

module.exports = getListNilai;
