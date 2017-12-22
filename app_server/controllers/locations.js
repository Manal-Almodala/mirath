var request = require('request');

var apiOptions = {
    _server : "https://loc8r-yasso.herokuapp.com",
    
    get server() {
            if (process.env.NODE_ENV !== 'production') { 
                this._server = "http://localhost:3000";
            }
            return this._server;
    }
}

/* GET 'locations list' page. */
module.exports.locationsList = function(req, res)
{
    var requestOptions, apiUri;
    apiUri = apiOptions.server + '/api/location';
    requestOptions = {
        method: 'GET',
        json: {},
        qs: {}
    }

    request(apiUri, requestOptions, function(error, response, nearbyLocations){
        if(response.statusCode === 200){
            renderHomePage(req, res, nearbyLocations);
        }
        console.log("API returned an error");
    });
};

function renderHomePage(req, res, nearbyLocations){
    res.render('locations-list', { 
        pageHeader:{
        title: 'Loc8r',
        strapLine: 'Find places to work with wifi near you!'
        },
        locations: nearbyLocations,
        sidebar: 'Looking for wifi and a seat?\n'
        + 'Loc8r helps you find places to work when out and about.'
        + 'Perhaps with coffee, cake or a pint?'
        + "Let Loc8r help find the place you're looking for."
    });
}

/* GET 'location info page. */
module.exports.locationInfo = function(req, res)
{
    getLocation(req, res, renderDetailPage);
};

function renderDetailPage(req, res, locationDetail){
    locationDetail.coordinates = {
        lat: locationDetail.coordinates[0],
        lng: locationDetail.coordinates[1]
    }
    res.render('location-info', 
    { 
        title: 'Location Info',
        location: locationDetail,
        panelsTitle: 
        {
            openingHours: 'Opening Hours',
            map: 'Location Map',
            facilities: 'Facilities',
            reviews: 'Customer reviews'
        },
        sidebar: "Simon's cafe is on Loc8r because it has accessible wifi" + 
                 "and space to sit down with your laptop and get some work done.",
        reviewInvitation: "If you've been and you like it - or if you don't" +
                          "- please leave a review to help other people just like you.",
    }); 
}

/* GET 'new review form' page. */
module.exports.addReviewForm = function(req, res)
{
    getLocation(req, res, renderReviewForm);
};

function renderReviewForm(req, res, location){
    res.render('location-review-form', 
    { 
        title: 'Review ' + location.name + ' on Loc8r',
        pageHeader: { title: 'Review ' + location.name}
    });
}

function getLocation(req, res, renderPage){
    var requestOptions, apiUri;
    apiUri = apiOptions.server + '/api/location/' 
                + req.params.locationID;
    requestOptions = {
        method: 'GET',
        json: {},
        qs: {}
    }
    
    request(apiUri, requestOptions, function(error, response, location){
        if(response.statusCode === 200){
            renderPage(req, res, location);
        }
        console.log("API returned an error");
    });
}

/* POST 'new review'. */
module.exports.addReview = function(req, res){
    var requestOptions, apiUri, locationID;
    locationID = req.params.locationID;
    apiUri = apiOptions.server + '/api/location/' 
                + locationID + '/review';
    requestOptions = {
        method: 'POST',
        json: {
            rating: parseInt(req.body.rating, 10),
            author: req.body.name,
            text: req.body.review 
        },
        qs: {}
    }
    
    request(apiUri, requestOptions, function(error, response){
        if(response.statusCode === 201){
            console.log("Posted!")
            res.redirect('/location/' + locationID);
        }
        console.log("API returned an error");
    });
}
