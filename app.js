const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Task1: initiate app and run server at 3000
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist', 'FrontEnd')));

// Task2: create mongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.log("MongoDB connection error:", err));

// Employee Schema
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: String,
    position: String,
    salary: Number
});

const Employee = mongoose.model('Employee', employeeSchema);

//TODO: get data from db using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//TODO: get single data from db using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        location: req.body.location,
        position: req.body.position,
        salary: req.body.salary
    });

    try {
        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.json({ message: "Employee deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//TODO: Update a employee data from db by using api '/api/employeelist/:id'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                location: req.body.location,
                position: req.body.position,
                salary: req.body.salary
            },
            { new: true }
        );
        if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//! dont delete this code. it connects the front end file.
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'FrontEnd', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
