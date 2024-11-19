// https://www.w3schools.com/nodejs/
// https://www.w3schools.com/nodejs/nodejs_intro.asp
// Express is a fast, unopinionated, minimalist web framework for Node.js

let express = require('express');                           // Import the Express framework for creating the server
const app = express();                                      // Initialize the Express application
app.use(express.static('public'));                          // Serve static files from the "public" directory

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

// Define a route for the root URL ('/')
app.get('/', (req, res) => {
    // `req` (request) represents the HTTP request, including data like URL, headers, and query parameters
    // `res` (response) is used to send back the desired HTTP response to the client

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("This is a simple application");   // You can set different statuses: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
});


// Important res methods:
// res.send(): Sends a response body to the client
// res.json(): Sends a JSON response
// res.status(): Sets the HTTP status code of the response
// res.set(): Sets response headers
// res.redirect(): Redirects the client to a different URL


app.get('/set/:text', (req, res) => {
    let val = req.params.text;

    res.send(`This is a simple application receiving ${val}`);
})


app.get('/search', (req, res) => {
    const queryParam = req.query.q;                                                 // Access the query parameter 'q' from the request (domain: /search/?q=test)

    if (queryParam) res.send(`Search query: ${queryParam}`);                        // Respond with the query parameter value
    else res.status(400).send('Query parameter "q" is required');                   // Respond with an error message if 'q' is not provided
});



app.get('/res-methods', (req, res) => {
    res.status(200)
        .set('X-Custom-Header', 'ExpressDemo')
        .json({
            message: "Testing methods",
            redirect_example: "Try visiting /redirect-example",
        });
});

// Route demonstrating req methods

app.get('/req-methods', (req, res) => {
    let data = {
        url: req.url,               // Returns the URL of the request
        method: req.method,         // Returns the HTTP method used (GET, POST, etc.)
        headers: req.headers,       // Returns the headers sent by the client
        query_params: req.query,    // Contains query parameters from the URL (/req-methods/?variable-name=value)
        params: req.params,         // Contains route parameters (e.g., /:text)
        body: req.body              // Contains the parsed body (here x.www-form-urlencoded in postman) of an incoming request that the client sent (must be parsed by middleware) 
    };

    res.status(200).json({
        received: data,
    });
});


// Redirect example
app.get('/redirect-example', (req, res) => {
    res.redirect('/');
});


app.get('/test/a', (req, res, next) => {
    console.log("Response will be handled by next function");
    next() // callback that executes next defined function
}, (req, res) => {
    res.send("Hallo")
})

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);
