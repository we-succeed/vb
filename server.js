require("./database");

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const port = process.env.PORT || 5000;
const cors = require('cors')
const corsOptions ={
    origin: 'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
const app = express();

app.use(cookieParser());
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());  //express.json + express.urlencoded()bodyParser

app.use('/', routes);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})


app.use((err, req, res) => {
    console.error(" handle utils error >> " , err);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})




