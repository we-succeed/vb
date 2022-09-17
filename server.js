require("./database");
import path from 'path';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const port = process.env.PORT || 5000;
const cors = require('cors')
const corsOptions ={
    origin: '*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
const app = express();
app.use(cookieParser());
app.options('*', cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());  //express.json + express.urlencoded()bodyParser

app.use(routes);
//// Step 1: Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, "./client/build")));
}
// Step 2:
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})




