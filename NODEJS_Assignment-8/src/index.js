const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

const studentArray = require('./InitialData.js');

let cn = studentArray.length;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get('/api/student', (req, res) => {
    return res.json({
        status: "Success",
        result: studentArray
    });
})

app.get('/api/student/:id', (req, res) => {
    let id = parseInt(req.params.id);
    for(let i=0; i<studentArray.length; i++) {
        if(studentArray[i].id === id) {
            return res.json({
                status: "Success",
                result: studentArray[i]
            })
        }
    }
    return res.status(404).json({
        status: "Failed to Fetch",
        message: "The id entered is invalid OR NOT FOUND"
    });
})

app.post('/api/student', (req, res) => {
    let detailsGiven = req.body
    let name = req.body.name;
    let currentClass = req.body.currentClass;
    let division =  req.body.division;
    let fields = ["name", "currentClass", "division"]
    for(let i in detailsGiven) {
        if(!fields.includes(i)) {
            return res.status(400).json({
                status: "Failed to Add",
                message:"Invalid Fields Given"
            });
        }
    }
    if(!name || !currentClass || !division) {
        return res.status(400).json({
            status: "Failed to Add",
            message:"Missing Fields"
        });
    }
    if(isNaN(detailsGiven.currentClass) || parseInt(detailsGiven.currentClass) <= 0 ) {
        return res.status(400).json({
            status: "Failed to Add",
            message:"currentClass should be an integer and greater than 0"
        });
    }
    cn = cn + 1;
    let newStudent = {
        id : cn,
        name: name,
        currentClass: parseInt(currentClass),
        division: division
    }
    studentArray.push(newStudent);
    return res.json({
        status: "Successfully Added",
        result: newStudent
    });

})

app.put('/api/student/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let detailsById;
    let index;
    let detailsGiven = req.body;
    for(let i=0; i<studentArray.length; i++) {
        if(studentArray[i].id === id) {
            detailsById = studentArray[i]
            index = i;
        }
    }
    if(!detailsById ) {
        return res.status(400).json({
            status: "Failed to Update",
            message:"Invalid Id Given OR ID Not Found"
        });
    }
    let fields = ["name", "currentClass", "division"]
    for(let i in detailsGiven) {
        if(!fields.includes(i)) {
            return res.status(400).json({
                status: "Failed to Update",
                message:"Invalid Update Fields Given"
            });
        }
    }
    if(detailsGiven.currentClass && (isNaN(detailsGiven.currentClass) || parseInt(detailsGiven.currentClass) <= 0 )) {
        return res.status(400).json({
            status: "Failed to Update",
            message:"currentClass should be an integer and greater than 0"
        });
    }
    for(let i in detailsGiven) {
        if(i === "name") {
            studentArray[index].name = detailsGiven.name;
        }
        else if(i === "currentClass") {
            studentArray[index].currentClass = parseInt(detailsGiven.currentClass);
        }
        else {
            studentArray[index].division = detailsGiven.division;
        }
    }
    return res.json({
        status : "Successfully Updated",
        result : studentArray[index]
    })
    
})

app.delete('/api/student/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let index;
    let detalsById;
    for(let i=0; i<studentArray.length; i++) {
        if(studentArray[i].id === id) {
            index = i;
            detalsById = studentArray[i];
        }
    }
    if(!index) {
        return res.status(404).json({
            status: "Failed to Delete",
            message:"Invalid Id Given OR ID Not Found"
        });
    }
    studentArray.splice(index, 1);
    return res.json({
        status : "Successfully Deleted",
        result : detalsById
    });
    
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   