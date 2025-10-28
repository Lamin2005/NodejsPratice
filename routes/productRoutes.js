import express from "express";
import { all, add, modify, cancle } from "../controller/productcontroller.js";
const router = express.Router();

router.get("/", all);

router.post("/", add);

router.patch("/:price", modify);

router.delete("/:id", cancle);

export default router;
