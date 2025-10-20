import express from "express";
import { all, add, modify, cancle } from "../controller/usercontroller.js";
const router = express.Router();

router.get("/:name/:age", all);

router.post("/", add);

router.patch("/:id/:age", modify);

router.delete("/:id", cancle);

/*
router.patch("/", (req, res, next) => {
  const id = req.body.id;
  const salary = req.body.salary;
  const result = users.find((data) => data.id == id);

  if (result) {
    result.salary = salary;
    res.json({ con: true, message: "success", result: users });
  } else {
    next(new Error("Error user not found!"));
  }
});
*/

export default router;
