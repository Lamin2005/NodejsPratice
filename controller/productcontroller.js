import { ObjectId } from "mongodb";
import { getConn } from "../database/db.js";

const all = (req, res) => {
  let product = [];
  const db = getConn();

  if (!db) {
    return res
      .status(503)
      .json({ con: false, mes: "Database not connected", result: [] });
  }

  db.collection("products")
    .find()
    .forEach((p) => {
      product.push(p);
    })
    .then(() => {
      res
        .status(200)
        .json({ con: true, mes: "Get Products success", result: product });
    })
    .catch((err) => {
      console.log("Error is ", err);
      res
        .status(500)
        .json({ con: false, mes: "Get Products fail", result: [] });
    });
};

const add = (req, res) => {
  const newProduct = req.body;

  const db = getConn();

  if (!db) {
    return res
      .status(503)
      .json({ con: false, mes: "Database not connected", result: [] });
  }

  db.collection("products")
    .insertMany(newProduct)
    .then(() => {
      res
        .status(201)
        .json({ con: true, mes: "Add Products success", result: newProduct });
    })
    .catch((err) => {
      console.log("Error is ", err);
      res
        .status(500)
        .json({ con: false, mes: "Add Products fail", result: [] });
    });
};

const modify = (req, res) => {
  const price = Number(req.params.price);
  //const id = ObjectId.createFromHexString(req.params.id);
  const obj = req.body;

  const db = getConn();

  if (!db) {
    return res
      .status(503)
      .json({ con: false, mes: "Database not connected", result: [] });
  }

  db.collection("products")
    .updateMany({ price: { $eq: price } }, {$currentDate : { created : true} })
    .then(() => {
      res.json({
        con: true,
        mes: "Update Products success",
      });
    })
    .catch((err) => {
      console.log("Error is ", err);
      res.json({ con: false, mes: "Update Products fail", result: [] });
    });
};

const cancle = (req, res) => {
  const id = ObjectId.createFromHexString(req.params.id);

  const db = getConn();

  if (!db) {
    return res
      .status(503)
      .json({ con: false, mes: "Database not connected", result: [] });
  }

  db.collection("products")
    .deleteOne({ _id: id })
    .then(() => {
      res.json({
        con: true,
        mes: "Delete Products success",
      });
    })
    .catch((err) => {
      console.log("Error is ", err);
      res.json({ con: false, mes: "Delete Products fail" });
    });
};

export { all, add, modify, cancle };
