const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

// MongoDB Connection

mongoose.Promise = global.Promise;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongoose database connection established successfully");
});

// ROUTES
const rolesRouter = require('../backend/routes/userRoutes');
const usersRouter = require('../backend/routes/userRoutes');
app.use('/roles', rolesRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});