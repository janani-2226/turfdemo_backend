const express = require("express")
const cors = require("cors")
const { MongoClient } = require("mongodb");
const app = express();
app.use(express.json());

const url = "mongodb://localhost:27017";

app.use(
    cors({
        origin: "http://localhost:3000"
    })
)
app.post("/", async (req, res) => {
    try {
        const connection = await MongoClient.connect(url);
        const db = connection.db("details");
        await db.collection("info").insertOne(req.body);
        await connection.close();
        res.json({ mesaage: "Info Posted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ mesaage: "something went wrong" })

    }
})

app.get("/", async (req, res) => {
    try {
        const connection = await MongoClient.connect(url);
        const db = connection.db("details");
        const array = await db.collection("info").find().toArray();
        await connection.close();
        res.json(array);
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
    }
});

app.listen(3004)
