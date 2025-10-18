import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

const users = [
  {
    id: "1",
    name: "MgMg",
    age: 16,
    salary: 100000,
  },

  {
    id: "2",
    name: "MaMa",
    age: 18,
    salary: 300000,
  },

  {
    id: "3",
    name: "MyoKyaw",
    age: 26,
    salary: 120000,
  },

  {
    id: "4",
    name: "MyaMya",
    age: 15,
    salary: 50000,
  },

  {
    id: "5",
    name: "UAung",
    age: 36,
    salary: 130000,
  },
];

app.listen(port, () => {
  console.log("Server is Running at port 3000...");
});

app.get("/", (req, res) => {
  console.clear();
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/users/:name/:age", (req, res, next) => {
  console.clear();
  const name = req.params.name;
  const age = req.params.age;
  const filter = users.filter((data) => data.name == name || data.age == age);
  if (filter) {
    res.json({ con: true, message: "success", result: filter });
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
