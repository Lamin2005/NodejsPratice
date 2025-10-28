import { getConn } from "../database/db.js";
import { ObjectId } from "mongodb";

const all = (req, res) => {
  let users = [];
  const db = getConn();

  if (!db) {
    return res
      .status(503)
      .json({ con: false, mes: "Database not connected", result: [] });
  }
  db.collection("users")
    .find()
    .project({name:1,_id:0})
    .forEach((user) => users.push(user))
    .then(() => {
      console.log("Users : ", users);
      res
        .status(200)
        .json({ con: true, mes: "Get User success", result: users });
    })
    .catch((err) => {
      console.log("Error is ", err);
      res.status(500).json({ con: false, mes: "Get User fail", result: [] });
    });
};

const add = (req, res) => {
  let obj = req.body;
  const db = getConn();

  if (!db) {
    return res
      .status(503)
      .json({ con: false, mes: "Database not connected", result: [] });
  }
  db.collection("users")
    .insertOne(obj)
    .then(() => {
      console.log("New Users Created : ", obj);
      res.status(201).json({ con: true, mes: "User created success" });
    })
    .catch((err) => {
      console.log("Error is ", err);
      res.status(500).json({ con: false, mes: "User created fail" });
    });
};

const modify = (req, res) => {
  let ages = Number(req.params.age);
  let name = req.body;
  const db = getConn();

  if (!db) {
    return res
      .status(503)
      .json({ con: false, mes: "Database not connected", result: [] });
  }
  db.collection("users")
    .updateMany({ age:ages }, { $set: name })
    .then(() => {
      res.json({ con: true, mes: "User Update success" });
    })
    .catch((err) => {
      res.json({ con: false, mes: "User Update fail" });
    });
};

const cancle = (req, res) => {
  let ages = Number(req.params.age);
  const db = getConn();

  if (!db) {
    return res
      .status(503)
      .json({ con: false, mes: "Database not connected", result: [] });
  }
  db.collection("users")
    .deleteMany({ age : ages })
    .then(() => {
      res.json({ con: true, mes: "User Delete success" });
    })
    .catch((err) => {
      res.json({ con: false, mes: "User Delete fail" });
    });
};


export { all, add, modify, cancle };
