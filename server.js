const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');


app.use(express.static('public'));

// get random quote;
app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    res.send({
        quote: randomQuote,
    });
})

// get all quotes
app.get('/api/quotes', (req, res) => {
    if(Object.keys(req.query).length === 0){
        res.send({
            quotes: quotes
        });
    }
    const requestedQuotes = quotes.filter(quote => quote.person == req.query.person);
    if(!requestedQuotes){
        res.send({
            quotes: []
        })
    }
    res.send({
        quotes: requestedQuotes
    })    
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});