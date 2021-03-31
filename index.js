const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const port = process.env.PORT || 5055;
const ObjectId = require("mongodb").ObjectID;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ly73p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

client.connect((err) => {
  const productCollection = client.db("hungryhelpersdb").collection("products");

  app.post("/addProduct", (req, res) => {
    const newProduct = req.body;
    console.log("adding new product", newProduct);
  });
});

app.get("/", (req, res) => {
  res.send("hello u !!");
});

app.listen(port, () => console.log(`Listening To Port ${port}`));
