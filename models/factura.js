const { DateTime } = require("luxon");
const { Schema, model } = require("mongoose");

const FacturaSchema = Schema({
  productos: {
    type: [Schema.Types.ObjectId],
    ref: "producto",
    default: [],
  },

  createdAt: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

FacturaSchema.methods.toJSON = function () {
  const { __v, _id, createdAt, ...factura } = this.toObject();
  factura.id = _id;

  factura.createdAt = DateTime.fromISO(createdAt.toISOString());
  const { __v: f__V, _id: u_id, password, ...user } = factura.user;
  user.id = u_id;
  factura.user = user;

  factura.productos = factura.productos.map((elem) => {
    const { __v: p__V, _id: p_id, img, ...producto } = elem;
    producto.id = p_id;
  });

  return factura;
};

module.exports = model("Factura", FacturaSchema);
