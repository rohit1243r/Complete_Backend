const express = require('express');
require("dotenv").config();
const app = express();
app.use(express.json());

let students = [
    {id: 1, name: "Rohit", course: "CSE"},
    {id: 2, name: "Amit", course: "IT"}
];

app.get('/', (req, res) => {
    res.send("Welcome to root page API");
});

app.get("/students", (req, res) => {
    res.json(students);
});

app.post("/students", (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        course: req.body.course
    }

    students.push(newStudent);
    res.status(201).json(newStudent);
})
app.listen(3000, () => {
    console.log("Server running on port 8080");
});