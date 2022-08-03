require('dotenv').config();
const mongoose = require('mongoose');
//Connect to the database
mongoose
    .connect(process.env.MONGODB_CONNECTION_DEV_STRING, {})
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log(err));