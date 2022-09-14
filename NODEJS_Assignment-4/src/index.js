const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 5000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes her
app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.post("/add", (req, res) => {
    a = req.body.num1;
    b = req.body.num2;
    let response = {};
    let result = a+b;
    if(typeof(a) === "string" || typeof(b) === "string") {
        response.status = "error",
        response.message = "Invalid Data Types"
    }
    else if(a < -1000000 || b < -1000000 ||  result < -1000000) {
        response.status = "error";
        response.message = "Underflow";
    }
    else if(a > 1000000 || b > 1000000 ||  result > 1000000) {
        response.status = "error";
        response.message = "Overflow";
    }
    else {
        response.status = "success";
        response.message = "the sum of given two numbers";
        response.sum = result;
    }
    console.log(response);
    res.send(response);
})

app.post("/sub", (req, res) => {
    a = req.body.num1;
    b = req.body.num2;
    let response = {};
    let result = a-b;
    if(typeof(a) === "string" || typeof(b) === "string") {
        response.status = "error",
        response.message = "Invalid Data Types"
    }
    else if(a < -1000000 || b < -1000000 ||  result < -1000000) {
        response.status = "error";
        response.message = "Underflow";
    }
    else if(a > 1000000 || b > 1000000 ||  result > 1000000) {
        response.status = "error";
        response.message = "Overflow";
    }
    else {
        response.status = "success";
        response.message = "the difference of given two numbers";
        response.differnce = result;
    }
    console.log(response);
    res.send(response);
})

app.post("/multiply", (req, res) => {
    a = req.body.num1;
    b = req.body.num2;
    let response = {};
    let result = a*b;
    if(typeof(a) === "string" || typeof(b) === "string") {
        response.status = "error",
        response.message = "Invalid Data Types"
    }
    else if(a < -1000000 || b < -1000000 ||  result < -1000000) {
        response.status = "error";
        response.message = "Underflow";
    }
    else if(a > 1000000 || b > 1000000 ||  result > 1000000) {
        response.status = "error";
        response.message = "Overflow";
    }
    else {
        response.status = "success";
        response.message = "the product of given two numbers";
        response.result = result;
    }
    console.log(response);
    res.send(response);
})

app.post("/divide", (req, res) => {
    a = req.body.num1;
    b = req.body.num2;
    let response = {};
    let result = a/b;
    if(typeof(a) === "string" || typeof(b) === "string") {
        response.status = "error",
        response.message = "Invalid Data Types"
    }
    else if(b === 0) {
        response.status = "error",
        response.message = "Cannot divide by zero"
    }
    else if(a < -1000000 || b < -1000000 ||  result < -1000000) {
        response.status = "error";
        response.message = "Underflow";
    }
    else if(a > 1000000 || b > 1000000 ||  result > 1000000) {
        response.status = "error";
        response.message = "Overflow";
    }
    else {
        response.status = "success";
        response.message = "the division of given two numbers";
        response.result = result;
    }
    console.log(response);
    res.send(response);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;