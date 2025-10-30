import express from "express";
import { all, add, modify, cancle, aggre } from "../controller/productcontroller.js";
const router = express.Router();

//router.get("/", all);

router.post("/", add);

router.patch("/:type", modify);

router.delete("/:id", cancle);

router.get("/", aggre)

export default router;
