const { urlencoded } = require('express');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const notRoute = require('./routes/notRoute');
const kullaniciRoute = require('./routes/kullaniciRoute');
const { hataYakalama } = require('./middlewares/errorMiddleware');
const baglan = require('./config/db');
const color = require('colors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/notlar', notRoute);
app.use('/api/kullanicilar', kullaniciRoute);

app.use(hataYakalama);

baglan();
app.listen(PORT, () => console.log(` Server ${PORT} üzerinden yayinda`.magenta.italic));
