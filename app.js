const dotenv = require("dotenv");

dotenv.config();

const express = require("express")
const db = require("./db");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const ws = new WebSocketServer({ server });

ws.on("connection", (socket) => {
    console.log("Client is connected");
    socket.send("Welcome who ever this is");
})

app.post("/create-post", async (req, res) => {
    try {
        const { name, message } = req.body;
        if (!name || !message) {
            return res.json({
                status: 400,
                data: "Name and message should be filled"
            })
        }
        const query = "INSERT INTO posts(name, message) VALUES($1, $2)";
        await db.query(query, [name, message]);
        res.json({
            status: 201,
            data: null
        })
    } catch (err) {
        res.json({
            status: 500,
            data: "Server is down"
        })
    }
})

app.get("/posts", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posts ORDER BY created_at DESC");
        const data = result.rows;
        res.json({
            status: 200,
            data
        })
    } catch (err) {
        console.log(err);
    }
})

server.listen(3000, () => {
    console.log("Server is running on port 3000");
})

