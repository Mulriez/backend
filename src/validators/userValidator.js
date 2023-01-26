const { check } = require("express-validator");
const UserModel = require("../models").user;

const createUserValidator = [
  check("nama")
    .isLength({ min: 1 })
    .withMessage("Wajib isi, minimal satu lah..."),
  check("email")
    .isEmail()
    .withMessage("Pakai format email lah...")
    .custom((value) => {
      return UserModel.findOne({
        where: {
          email: value,
        },
      }).then((user) => {
        if (user) {
          return Promise.reject("E-mail nya udah kepake");
        }
      });
    }),
];
const updateUserValidator = [
  check("nama")
    .isLength({ min: 1 })
    .withMessage("Wajib isi, minimal satu lah..."),
];
const registerValidator = [
  check("email")
    .isLength({ min: 1 })
    .withMessage("Wajib isi, minimal satu lah..."),
];

module.exports = { createUserValidator, updateUserValidator };
