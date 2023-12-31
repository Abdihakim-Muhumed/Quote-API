const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;
const { quotes, addQuote } = require('./data');
const { getRandomElement, getIndexById, updateElement} = require('./utils');


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

// post a quote
app.post('/api/quotes', (req, res) => {
    if(req.query.quote.length == 0 || req.query.person.length == 0){
        console.log('Must have both quote and author!')
        res.status(400).send()
    }
    console.log(req.query.person)
    console.log(req.query.quote)
    const quoteToAdd = {
        quote : req.query.quote,
        person: req.query.person
    }
    addQuote(quoteToAdd);
    res.send({
        quote: quoteToAdd
    })
})

//update a quote;
app.put('/api/quotes/:id', (req, res) => {
    const index = getIndexById(req.params.id, quotes);
    if(index == -1){
        res.status(400).send()
    }
    const updatedElement = updateElement(req.params.id, req.query, quotes);
    res.send({
        quote: updateElement
    })
    
})

//delete a quote
app.delete('/api/quotes/:id', (req, res) => {
    const index = getIndexById(req.params.id, quotes)
    if(index == -1){
        res.status(400).send()
    }
    const removedQuote = quotes.splice(index, 1)
    res.send({
        quote: removedQuote
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});