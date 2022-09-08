require("./database");

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const port = process.env.PORT || 5000;
const cors = require('cors')

const app = express();

app.use(cookieParser());  //
app.use(cors({ origin: "http://localhost:3000", credentials: true }));//prevent for cors error
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());  //express.json + express.urlencoded()bodyParser

app.use('/api', routes);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})
app.use((err, req, res, next) => {
    console.error(" handle utils error >> " , err);
    res.status(500).json({err: 'error'});
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})




