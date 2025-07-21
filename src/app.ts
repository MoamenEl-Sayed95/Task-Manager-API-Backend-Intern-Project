import express from "express";

const app = express();


app.get("/", (req, res) => {
    res.send("Task Manager API is runing...");
});

export default app;