// Server work
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const jsonParser = bodyParser.json();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


// Business collection
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

// Businesses API endpoints
app.get('/business', (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var numPerPage = 10;
    var lastPage = Math.ceil(lodgings.length / numPerPage);
    page = page < 1 ? 1 : page;
    page = page > lastPage ? lastPage : page;
    var start = (page - 1) * numPerPage;
    var end = start + numPerPage;
    var pageBusinesses = lodgings.slice(start, end);
    var links = {};
    if (page < lastPage) {
        links.nextPage = '/business?page=' + (page + 1);
        links.lastPage = '/business?page=' + lastPage;
    }
    if (page > 1) {
        links.prevPage = '/business?page=' + (page - 1);
        links.firstPage = '/business?page=1';
    }
    res.status(200).json({
        pageNumber: page,
        totalPages: lastPage,
        pageSize: numPerPage,
        totalCount: business.length,
        businesses: pageBusinesses,
        links: links
    });
});

// Create new business
app.use(express.json());
app.post('/business', (req, res) => {
    if (req.body && req.body.name) {
        business.push(req.body.name)
        res.json({"status" : "ok"})
    } else {
        res.status(400).json({
            err: "Request needs a JSON body with a name field"
        });
    }
    var id = business.length - 1;
    res.status(201).json({
        id: id,
        links: {
            lodging: '/business/' + id
        }
    });
});

//Single Specific Business Endpoint
app.get('/business/:businessID', (req, res, next) => {
    var businessID = parseInt(req.params.lodgingID);
    if (business[businessID]) {
        res.status(200).json(business[businessID]);
    } else {
        next();
    }
});

// Endpoint to update info on a single Business
app.put('/business/:businessID', (req, res, next) => {
    var businessID = parseInt(req.params.businessID);
    if (business[businessID]) {
        if (req.body && req.body.name) {
            business[businessID] = req.body;
            res.status(200).json({
            links: {
            business: '/business/' + businessID
            }
        });
        } else {
            res.status(400).json({
            err: "Request needs a JSON body with a name field"
            });
        }
    } else {
        next();
    }
});

// Endpoint to delete a specified business
app.delete(
    '/business/:businessID', (req, res, next) => {
        var businessID = parseInt(req.params.businessID);
        if (business[businessID]) {
            business[businessID] = null;
            res.status(204).end();
        } else {
            next();
        }
    }
  );


// Reviews
const review = [
    {
        star: "",
        price: "", 
        review: ""
    }
]

// Reviews Functions
app.post('/review', jsonParser, (req, res) => {
    if (req.body && req.body.starRating && req.body.dollarRating) {
        reviews.push(req.body);
        res.json({"status": "ok"});
    } else {
        res.status(400).json({
            err: "Request needs a JSON body with a star rating field and dollar rating field"
        });
    }

    var id = review.length - 1;
    res.status(201).json({
        id: id,
        links: {
            review: '/review/' + id
        }
    });
});

// Put request for reviewing business
app.put('/review/:reviewID', (req, res, next) => {
    var reviewID = parseInt(req.params.reviewID);
    if (review[reviewID]) {
        if (req.body && req.body.starRating && req.body.dollarRating) {
            review[reviewID] = req.body;
            res.status(200).json({
                links: {
                    review: '/review/' + reviewID
                }
        });
        } else {
            res.status(400).json({
                err: "Request needs a JSON body with a star rating field and dollar rating field"
            });
        }
    } else {
        next();
    }
});

// Delete request for reviews
app.delete('/review/:reviewID', (req, res, next) => {
    var reviewID = parseInt(req.params.reviewID);
    if (review[reviewID]) {
        review[reviewID] = null;
        res.status(204).end();
    } else {
        next();
    }
});

// Photos
const photo = [
    {
        file: "",
        caption: ""
    }
]

// View all reviews
app.get('/photo/:photoID/reviews', (req, res, next) => {
    var photoID = parseInt(req.params.photoID);
    var page = parseInt(req.query.page) || 1;
    var numPerPage = 10;
    var lastPage = Math.ceil(reviews.length / numPerPage);
    page = page < 1 ? 1 : page;
    page = page > lastPage ? lastPage : page;
    var start = (page - 1) * numPerPage;
    var end = start + numPerPage;
    var pagereviews = reviews.slice(start, end);
    var links = {};

    if (page < lastPage) {
        links.nextPage = '/photo/:photoID/reviews?page=' + (page + 1);
        links.lastPage = '/photo/:photoID/reviews?page=' + lastPage;
    }
    if (page > 1) {
        links.prevPage = '/photo/:photoID/reviews?page=' + (page - 1);
        links.firstPage = '/photo/:photoID/reviews?page=1';
    }  
    
    if (photo[photoID]) {
        res.status(200).json({
        pageNumber: page,
        totalPages: lastPage,
        pageSize: numPerPage,
        totalCount: reviews.length,
        reviews: pagereviews[photoID],
        links: links});
    } else {
        next();
    }
});

// View all businesses
app.get('/photo/:photoID/businesses', (req, res, next) => {
    var photoID = parseInt(req.params.photoID);
    var page = parseInt(req.query.page) || 1;
    var numPerPage = 10;
    var lastPage = Math.ceil(businesses.length / numPerPage);
    page = page < 1 ? 1 : page;
    page = page > lastPage ? lastPage : page;
    var start = (page - 1) * numPerPage;
    var end = start + numPerPage;
    var pageBusinesses = businesses.slice(start, end);
    var links = {};

    if (page < lastPage) {
        links.nextPage = '/photo/:photoID/businesses?page=' + (page + 1);
        links.lastPage = '/photo/:photoID/businesses?page=' + lastPage;
    }
    if (page > 1) {
        links.prevPage = '/photo/:photoID/businesses?page=' + (page - 1);
        links.firstPage = '/photo/:photoID/businesses?page=1';
    }  
    
    if (photo[photoID]) {
        res.status(200).json({
        pageNumber: page,
        totalPages: lastPage,
        pageSize: numPerPage,
        totalCount: businesses.length,
        businesses: pageBusinesses[photoID],
        links: links});
    } else {
        next();
    }
});

// View all photos
app.get('/photo', (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var numPerPage = 10;
    var lastPage = Math.ceil(photo.length / numPerPage);
    page = page < 1 ? 1 : page;
    page = page > lastPage ? lastPage : page;
    var start = (page - 1) * numPerPage;
    var end = start + numPerPage;
    var pagephoto = photo.slice(start, end);
    var links = {};
    if (page < lastPage) {
        links.nextPage = '/photo?page=' + (page + 1);
        links.lastPage = '/photo?page=' + lastPage;
    }
    if (page > 1) {
        links.prevPage = '/photo?page=' + (page - 1);
        links.firstPage = '/photo?page=1';
    }  
    
    res.status(200).json({
        pageNumber: page,
        totalPages: lastPage,
        pageSize: numPerPage,
        totalCount: photo.length,
        photo: pagephoto,
        links: links
    });
});