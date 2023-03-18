require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const port = process.env.PORT || 8010;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1', router);
app.use(errorHandler);

// For unit testing purpose
if(process.env.NODE_ENV != "test"){
    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`)
    });
}
module.exports = app;