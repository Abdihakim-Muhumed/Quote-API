const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');


app.use(express.static('public'));

// get random quotes;
app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    res.send({
        quote: randomQuote,
    });
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});