import express from 'express';
import dbConnection from './databases/dbConnection.js';
import bootstrap from './src/bootstrap.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const port = 5000;
app.use(express.json());
app.use(morgan("dev"));
bootstrap(app);
dbConnection();
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})