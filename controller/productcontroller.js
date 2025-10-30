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
  const typepara = req.params.type;
  //const id = ObjectId.createFromHexString(req.params.id);
  //const obj = req.body;

  const db = getConn();

  if (!db) {
    return res
      .status(503)
      .json({ con: false, mes: "Database not connected", result: [] });
  }

  db.collection("products")
    .updateMany({ type: typepara }, { $currentDate: { created: true } })
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

//aggregation

const aggre = (req, res) => {
  const db = getConn();
  let products = [];

  if (!db) {
    return res
      .status(503)
      .json({ con: false, mes: "Database not connected", result: [] });
  }

  db.collection("products")
    .aggregate([
      { $match: { range: { $gte: 10 } } },
      {
        $project: {
          name: 1,
          price: 1,
          _id: 0,
          range : 1,
          total: { $multiply: ["$price", "$range"] },

        },
      },
      {
        $sort : { range : 1}
      },
      {
        $skip : 3
      },
      {
        $limit : 3
      }

      // {
      //   $group: {
      //     _id: "$type",
      //     count: { $sum: 1 },
      //     total: { $sum: "$price" },
      //     avragePrice: { $avg: "$price" },
      //     minPrice: { $min: "$price" },
      //     maxPrice : {$max : "$price"}
      //   },
      // },
    ])
    .forEach((p) => products.push(p))
    .then(() => {
      res.json({
        con: true,
        mes: "Aggregate Products success",
        result: products,
      });
    })
    .catch((err) => {
      console.log("Error is ", err);
      res.json({ con: false, mes: "Aggregrate Products fail" });
    });
};

export { all, add, modify, cancle, aggre };
