import express from 'express';
import dbConnection from './databases/dbConnection.js';
import bootstrap from './src/bootstrap.js';
const app = express();

const port = 5000;
app.use(express.json());
bootstrap(app);
dbConnection();
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})