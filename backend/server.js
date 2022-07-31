require("./database");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 5002

//middleware
app.use(bodyParser.json());  //express.json + express.urlencoded()
app.use(routes);


//handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})


//handling error
app.use((req, res, next) => {
    console.log("handle 404 error");
    res.status(404).send('404');
})
app.use((err, req, res, next) => {
    console.error(" handle middleware error >> " , err);
    res.status(500).json({err: 'error'});
})


app.get('/admin', (req,res) => {
    res.send('Admin Page')
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})



