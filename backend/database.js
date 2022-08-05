require('dotenv').config();
const mongoose = require('mongoose');
//Connect to the database
mongoose
    .connect(process.env.MONGODB_LOCAL, {useUnifiedTopology: false})
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log(err));