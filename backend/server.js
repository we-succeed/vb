require("./database");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 5002;
const cors = require('cors')

app.use(cors()) //prevent for cors error

app.use(bodyParser.json());  //express.json + express.urlencoded()
app.use(routes);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.use((err, req, res, next) => {
    console.error(" handle middleware error >> " , err);
    res.status(500).json({err: 'error'});
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})




