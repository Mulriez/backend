const express = require("express");
const router = express.Router();
const {
  getListUser,
  createUser,
  getDetailUserById,
  getDetailUserByParams,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  getProdList,
  createProd,
  getDetailProdByParams,
  getDetailProdById,
  updateProd,
} = require("../controllers/produkController");
const validationResultMiddleware = require("../middleware/validationResultMiddleware");
//use filename+fuction
const UserValidator = require("../validators/userValidator");
const ProdukValidator = require("../validators/produkValidator");
const jwtValidateMiddleware = require("../middleware/jwtValidateMiddleware");
const { register, login } = require("../controllers/authController");

//urutan (Untuk pembacaan code dari atas ke bawah)berpenaruh
//produk
router.get("/produk/list", getProdList),
  router.get("/produk/detail/:id", getDetailProdById),
  router.get("/produk/list/:brand", getDetailProdByParams),
  router.post(
    "/produk/create",
    ProdukValidator.createProdValidator,
    validationResultMiddleware,
    createProd
  ),
  router.put(
    "/produk/update/:id",
    ProdukValidator.updateUserValidator,
    validationResultMiddleware,
    updateProd
  ),

//register
router.post("/register", register);
//login
router.post("/login", login);

//implementasi jwt middleware
router.use(jwtValidateMiddleware);

//user
router.get("/user/list", getListUser),
  router.get("/user/detail/:id", getDetailUserById),
  router.get("/user/list/:email", getDetailUserByParams),
  router.post(
    "/user/create",
    UserValidator.createUserValidator,
    validationResultMiddleware,
    createUser
  ),
  router.put(
    "/user/update/:id",
    UserValidator.updateUserValidator,
    validationResultMiddleware,
    updateUser
  ),
  router.delete("/user/delete/:id", deleteUser);


  module.exports = router;
