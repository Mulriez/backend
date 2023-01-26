'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  produk.init({
    nama: DataTypes.STRING,
    brand: DataTypes.STRING,
    tipe: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    stok: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    rilis: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'produk',
  });
  return produk;
};