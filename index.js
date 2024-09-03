import express from 'express';
import dbConnection from './databases/dbConnection.js';
const app = express();

const port = 5000;

dbConnection();
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})