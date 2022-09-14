const fs = require('fs');
var http = require('http');
fs.writeFile('index.html','<h1> Hello World </h1> <p> This is Saikiran Vennam </p>',(err)=>{
    if(err){
        console.log(err);
    }
})

let server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let Data = fs.readFileSync('index.html')
    res.write(Data);
    res.end();
});


server.listen(5000, (error) => {
    if(error) {
        console.log("Something went wrong ", error );
    }
    else {
        console.log("server is listening at port " + 5000);
    }
})