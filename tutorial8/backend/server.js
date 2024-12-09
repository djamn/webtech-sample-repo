const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

const bikeRoutes = require('./routes/bike');


app.use('/api/bikes', bikeRoutes);

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('Test API Service for WebDev Tutorial');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});