const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearFactura,
  getFacturas,
} = require("../controllers/factura.controller");
const { userByIdExists } = require("../helpers/db-validators");

const { validateFields, validateJWT } = require("../middlewares");

const router = Router();

router.get("/", getFacturas);

router.post(
  "/",
  [
    check("user", "El usuario es requerido").not().isEmpty(),
    check("productos", "Debe ser  una Array de ids de producto").isArray(),
    check("productos", "Debe haber minimo un producto").isLength({ min: 1 }),
    validateFields,
  ],
  crearFactura
);

module.exports = router;
