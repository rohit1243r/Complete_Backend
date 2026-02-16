const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const Student = require("./models/Student");

app.get("/", (req, res) => {
    res.send("Express + MongoDB Backend Running");
});

//CREATE student
app.post("/students", async (req, res) => {
    try{
        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
        console.log("New User Created");
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});
//READ ALL students
app.get("/students", async(req, res) => {
    const students = await Student.find();
    res.json(students);
})
//UPDATE student
app.put("/students/:id", async (req, res) => {
    const updated = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.json(updated);
    console.log("User Updated");
});

app.delete("/student/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({message: "Student deleted"});
    console.log("User Deleted");
})
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
