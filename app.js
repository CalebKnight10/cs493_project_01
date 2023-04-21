// Server work
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const jsonParser = bodyParser.json();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


// Businesses
const business =  [
    {
        name: "",
        address: "",
        city: "",
        state: "", 
        zip: "",
        phone: "",
        type: "",
        email: "",
        website: ""
    }
]

// Businesses Functions
app.get('/business', (req, res) => {
    res.status(200).json({
        pageNumber: 1,
        totalPages: 100,
        pageSize: 10,
        totalCount: business.length,
        businesses: [],
        links: {
            nextPage: 'business?page=2',
            lastPage: '/business?page=100'
        }

    });
});

// Reviews
const review = [
    {
        star: "",
        price: "", 
        review: ""
    }
]

// Reviews Functions
app.get('/review', (req, res, next) => {
    res.status(200).send("Hello world");
});

// Photos
const photo = [
    {
        file: "",
        caption: ""
    }
]

// Photos Functions
app.get('/photo', (req, res, next) => {
    res.status(200).send("Hello world");
});