const products = [
  {
    id: "p1",
    name: "Bike",
    color: ["red", "green", "blue"],
  },
  {
    id: "p2",
    name: "Dress",
    color: ["red", "green", "blue"],
  },
  {
    id: "p3",
    name: "Hat",
    color: ["red", "green", "blue"],
  },
  {
    id: "p4",
    name: "T-shirt",
    color: ["red", "green", "blue"],
  },
  {
    id: "p5",
    name: "Chair",
    color: ["red", "green", "blue"],
  },
];

const all = (req, res) => {
  res.json({ con: true, message: "Success", result: products });
};

const add = (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.json({ con: true, message: "Success", result: products });
};

const modify = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const product = products.find((p) => p.id == id);
  if (product) {
    product.name = name;
    res.json({ con: true, message: "Success", result: products });
  } else {
    next(new Error("No found User!"));
  }
};

const cancle = (req, res) => {
  const id = req.params.id;
  const product = products.find((p) => p.id == id);
  if (product) {
    const newlist = products.filter((p) => p.id !== id);
    res.json({ con: true, message: "Success", result: newlist });
  }
};

export { all, add, modify, cancle };
