const { check } = require("express-validator");

const createProdValidator = [
  check("nama")
    .isLength({ min: 1 })
    .withMessage("Wajib isi, minimal satu lah..."),
  check("brand")
    .isLength({ min: 1 })
    .withMessage("Wajib isi, minimal satu lah..."),
    check("tipe")
    .isLength({ min: 1 })
    .withMessage("Kasih tipenya..."),
    check("deskripsi")
    .isLength({ min: 10 })
    .withMessage("deskripsinya apa bang messi? "),    
];
const updateUserValidator = [
  check("tipe")
    .isLength({ min: 1 })
    .withMessage("Tipenya bang messi"),
];


module.exports = { createProdValidator, updateUserValidator };
