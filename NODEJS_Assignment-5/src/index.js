var http = require("http");

const httpServer = http.createServer(handleServer);


function handleServer(req, res) {
    if(req.url === '/welcome') {
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.write('Welcome to Dominos!');
        res.end();
    }
    else if(req.url === '/contact') {
        res.writeHead(200, {'Content-Type' : 'application/json'});
        let contact = {
            phone : '18602100000',
            email : 'guestcaredominos@jublfood.com'
        }
        res.write(JSON.stringify(contact));
        res.end();
    }
    else {
        res.writeHead(404, { 'Content-Type': 'error' });
        res.write('Page Not Found');
        res.end();
    }
}

httpServer.listen(8081, function(error) {
    if(error) {
        console.log("Something went wrong ", error );
    }
    else {
        console.log("server is listening at port " + 8081);
    }
});

module.exports = httpServer;.
3.
3