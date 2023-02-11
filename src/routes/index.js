const express = require("express");
const router = express.Router();
//use filename+fuction
const validationResultMiddleware = require("../middleware/validationResultMiddleware");
const jwtValidateMiddleware = require("../middleware/jwtValidateMiddleware");
const { register, login} = require("../controllers/latiahnController");
const { createMateri, updateMateri, deleteMateriMulti } = require("../controllers/materiController");
//urutan (Untuk pembacaan code dari atas ke bawah)berpenaruh
//register
router.post('/register', register)
//login
router.post("/login", login);

//implementasi jwt middleware
router.use(jwtValidateMiddleware);

//materi
router.post('/materi/create/multi', createMateri);
router.put("/materi/update/:id", updateMateri);
router.delete("/materi/multi/delete", deleteMateriMulti);

module.exports = router;
