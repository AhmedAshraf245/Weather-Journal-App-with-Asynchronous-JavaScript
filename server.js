// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const Express = require("express");

// Start up an instance of app
const app = Express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const Cors = require("cors");
app.use(Cors());

// Initialize the main project folder
app.use(Express.static('website'));

// Setup Server
const port = 8000;
const SERVER = app.listen(port,()=>console.log("running on localhost:" + port));

app.get('/all',(req,res)=>{
    res.send(projectData);
});
// Seting up the POST Route
app.post('/add',(req,res)=>{
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
});