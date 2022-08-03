const express = require('express');

const app = express();

const prof = require('./routes/dashprof');
const cord = require('./routes/dashcord');
const login = require('./routes/login');

app.use('/dashboard/dashprof', prof)
app.use('/dashboard/dashcord', cord)
app.use('/dashboard/', login)


app.all('*', (req, res) => {
    res.status(404).send('perdido?')
})

// localhost:5000
app.listen(5000);