const express = require('express');
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App Started at Port: ${PORT}`);
})

app.use(express.json());

const user = require('./routes/auth');
app.use('/api/v1', user);

const { dbConnect } = require('./config/database');
dbConnect();