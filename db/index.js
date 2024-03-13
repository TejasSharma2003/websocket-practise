const { Client } = require("pg");
const client = new Client({
    host: "localhost",
    port: 5432,
    database: "posts",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
});

async function connectDB() {
    try {
       await client.connect();
    } catch (err) {
    }
}

connectDB().then(() => {
    console.log("Database connection successfull")
}).catch(err => {
    console.log(err);
});

module.exports = client;

