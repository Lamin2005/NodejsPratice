import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js'; 

const app = express();
app.use(express.json());
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/users", userRouter);
app.use("/products", productRouter);



app.listen(port, () => {
  console.log("Server is Running at port 3000...");
});














/*
app
  .route("/products")
  .get((req, res) => {
    res.json({ con: true, message: "Success", result: products });
  })
  .post((req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.json({ con: true, message: "Success", result: products });
  })
  .patch((req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const product = products.find((p) => p.id == id);
    if (product) {
      product.name = name;
      res.json({ con: true, message: "Success", result: products });
    } else {
      next(new Error("No found User!"));
    }
  })
  .delete((req, res) => {
    const id = req.body.id;
    const product = products.find(p => p.id == id);
    if (product) {
      const newlist = products.filter((p) => p.id !== id);
      res.json({ con: true, message: "Success", result: newlist });
    }
  });

app.get("/", (req, res) => {
  console.clear();
  res.sendFile(path.join(__dirname, "index.html"));
});



app.get("/users/:name/:age", (req, res, next) => {
  console.clear();
  const name = req.params.name;
  const age = req.params.age;
  users = users.filter((data) => data.name == name || data.age == age);
  if (filter) {
    res.json({ con: true, message: "success", result: users });
  } else {
    next(new Error("Error user not found!"));
  }
});

app.post("/users", (req, res) => {
  console.clear();
  const bodydata = req.body;
  users.push(bodydata);
  res.json({ con: true, message: "success", result: users });
});

app.patch("/users/:id/:age", (req, res, next) => {
  const id = req.params.id;
  const age = req.params.age;
  const result = users.find((data) => data.id == id);

  if (result) {
    result.age = Number(age);
    res.json({ con: true, message: "success", result: users });
  } else {
    next(new Error("Error user not found!"));
  }
});

app.patch("/users", (req, res, next) => {
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

app.delete("/users/:id", (req, res, next) => {
  const id = req.params.id;
  const found = users.some((data) => data.id == id);

  if (found) {
    let filtered = users.filter((data) => data.id != id);
    res.json({ con: true, message: "success", result: filtered });
  } else {
    next(new Error("Error user not found!"));
  }
});
*/