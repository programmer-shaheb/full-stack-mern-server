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
  const orderCollection = client.db("hungryhelpersdb").collection("orders");

  app.get("/products", (req, res) => {
    productCollection.find().toArray((err, items) => {
      res.send(items);
    });
  });

  app.get("/products/:id", (req, res) => {
    const findProduct = req.params.id;
    productCollection
      .find({ _id: ObjectId(findProduct) })
      .toArray((err, items) => {
        res.send(items);
      });
  });

  app.post("/addProduct", (req, res) => {
    const newProduct = req.body;
    productCollection.insertOne(newProduct).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.post("/addOrder", (req, res) => {
    const newOrder = req.body;
    orderCollection.insertOne(newOrder).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/orderInfo", (req, res) => {
    const email = req.query.email;
    orderCollection.find({ isLoggedIn: email }).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.delete("/delete/:id", (req, res) => {
    const deleteProduct = req.params.id;
    productCollection
      .deleteOne({ _id: ObjectId(deleteProduct) })
      .then((result) => {
        res.send(result.deletedCount > 0);
      });
  });
});

app.listen(port, () => console.log(`Listening To Port ${port}`));
