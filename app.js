import express from 'express';
import path, { dirname } from 'path'; 
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.listen(port, () => {
  console.log("Server is Running at port 3000...");
});

app.get('/', (req, res) => {
  console.clear();
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  console.clear();
  res.json({ name: "John", age: 30, city: "New York" });
});
