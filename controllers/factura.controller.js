const { request, response } = require("express");
const { use } = require("express/lib/application");
const { isObjectId } = require("../helpers");
const { Factura, User } = require("../models");

// Consultar y agregar populate
const getFacturas = async (req = request, res = response) => {
  try {
    const query = { status: true };

    const [facturas, total] = await Promise.all([
      Factura.find(query).populate("user").populate("producto"),

      Factura.countDocuments(query),
    ]);

    res.json({
      total,
      quantity,
      facturas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const crearFactura = async (req = request, res = response) => {
  try {
    const { user: userId, productos: productosIds } = req.body;

    if (!isObjectId(userId)) {
      return res.status(400).json({
        msg: "debe pasar un id de mongo valido",
      });
    }

    const user = await User.findById(userId);
    if (!use) {
      return res.status(400).json({
        msg: `No existe un usuario con el id ${userId}`,
      });
    }
    productosIds.map((productoId) => {
      if (!isObjectId(productoId, index)) {
        return res.status(400).json({
          msg: "debe pasar un id de mongo valido - productos",
          index,
        });
      }
    });

    // const factura = new Factura(req.body);
    // await factura.save();

    res.status(201).json({
      //   factura,
      user,
      productos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

module.exports = {
  getFacturas,
  crearFactura,
};
