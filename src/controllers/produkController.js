const ProdukModel = require("../models").produk;

async function getProdList(req, res) {
  try {
    const produk = await ProdukModel.findAll();
    res.json({
      status: "Success",
      msg: "DITEMUKAN",
      data: produk,
    });
  } catch (error) {
    res.status(403).json({
      status: "FAIL",
      msg: "ADA KESALAHAN",
    });
  }
}

//create data into database

async function createProd(req, res) {
  try {
    const payload = req.body;
    let { nama, brand, tipe, deskripsi, stok, harga, rilis } = payload;
    await ProdukModel.create({
      nama: nama,
      brand: brand,
      tipe: tipe,
      deskripsi: deskripsi,
      stok: stok,
      harga: harga,
      rilis: rilis,
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

async function getDetailProdById(req, res) {
  try {
    const { id } = req.params;
    const prod = await ProdukModel.findByPk(id);
    if (prod === null) {
      res.status(404).json({
        status: "Fail",
        msg: `Produk Tidak ditemukan`,
      });
    }
    res.json({
      status: "Success",
      msg: "Berhasil kaka :D",
      data: prod,
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "THERE WAS A PROBLEM :(",
    });
  }
}

async function getDetailProdByParams(req, res) {
  try {
    const { brand } = req.params;
    const prod = await ProdukModel.findOne({
      where: {
        brand: brand,
      },
    });
    if (prod === null) {
      res.status(404).json({
        status: "Fail",
        msg: `Produk Tidak ditemukan`,
      });
    }
    res.json({
      status: "Success",
      msg: "Produk Ditemukan :D",
      data: prod,
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "THERE WAS A PROBLEM :(",
    });
  }
}

async function updateProd(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { harga, tipe, stok } = payload;
    const prod = await ProdukModel.findByPk(id);
    if (prod === null) {
      res.status(404).json({
        status: "Fail",
        msg: `Produk Tidak ditemukan`,
      });
    }
    await ProdukModel.update(
      {
        harga,
        tipe,
        stok,
        
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({
      status: "Success",
      msg: "Product Updated :D",
      data: prod,
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "THERE WAS A PROBLEM :(",
    });
  }
}

module.exports = {
  getProdList,
  createProd,
  getDetailProdById,
  getDetailProdByParams,
  updateProd
};
