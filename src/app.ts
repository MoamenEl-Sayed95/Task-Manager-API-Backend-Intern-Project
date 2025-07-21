import express from "express";

const app = express();


app.get("/", (req, res) => {
    res.send("Task Manager API is running...");
});

export default app;