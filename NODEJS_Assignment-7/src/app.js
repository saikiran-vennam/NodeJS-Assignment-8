const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.get('/mario',async (req,res)=>{
    try {
        const allData = await marioModel.find();
        res.json(allData);
    }
    catch(error) {
        console.log(error.message);
    }
})

app.get('/mario/:id', async (req, res) => {
    try {
        const marioDetails = await marioModel.findById(req.params.id);
        if(marioDetails == null) {
            return res.status(400).json({
                status: "Failed to Get",
                message: "Couldn't find the Character with id " + req.params.id
            })
        }
        else {
            return res.json({
                status: "Success",
                result: marioDetails
            });
        }
    }
    catch(error) {
        res.status(400).json({
            status: "Failed to Get",
            message: error.message
        });
    }
})


app.post('/mario', async (req, res) => {
    const marioData = req.body;
    try{
        const newMario = new marioModel(marioData);
        await newMario.save();
        return res.status(201).json({
            status: "Successfully Added",
            New_Character: newMario
        });
    }
    catch(error) {
        return res.status(400).json({
            status: "Failed to Add",
            message: error.message
        });
    }
})

app.patch('/mario/:id', async (req, res) => {
    try {
        const marioToUpdate = await marioModel.findById(req.params.id);
        if(marioToUpdate == null) {
            return res.status(400).json({
                status: "Failed to Update",
                message: "Couldn't find the Character with id " + req.params.id
            })
        }
        const updates = req.body;
        await marioModel.findByIdAndUpdate(req.params.id, updates);
        const updatedMario = await marioModel.findById(req.params.id);
        return res.json({
            status: "Success",
            result: updatedMario
        });
    }
    catch(error) {
        res.status(400).json({
            status: "Failed to Update",
            message: error.message
        });
    }
})


app.delete('/mario/:id', async (req, res) => {
    try {
        const deletedMario = await marioModel.findById(req.params.id);
        if(deletedMario == null) {
            return res.status(400).json({
                status: "Failed to Delete",
                message: "Couldn't find the Character with id " + req.params.id
            })
        }
        await marioModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: "Success",
            message: "Character Deleted",
            result: deletedMario
        });
    }
    catch(error) {
        return res.status(400).json({
            status: "Failed to Delete",
            message: error.message
        });
    }
})


module.exports = app;