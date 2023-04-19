// Server work
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const jsonParser = bodyParser.json();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

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

const review = [
    {
        star: "",
        price: "", 
        review: ""
    }
]