var mongoose = require('mongoose');
const helper = require('./helper');

var LocationModel = mongoose.model('Location');

module.exports = {
    addReview: function(req, res){
        if(helper.isIDInRequest(req, res , "locationID", "No location ID in request")){
            return;
        }
        LocationModel
            .findById(req.params.locationID)
            .select("reviews rating")
            .exec(function(error, location){
                if(helper.isResError(error, res, 400)){ 
                    return; 
                };
                if(helper.isNoDocumentFound(res, location, 'Location was not found')){
                    return; 
                };
                // Add the review
                doAddReview(req.body, location, res); 
            });
    },

    readOne: function(req, res){
        if(helper.isIDInRequest(req, res , "locationID", "No location ID in request")){
            return;
        }
        if(helper.isIDInRequest(req, res , "reviewID", "No review ID in request")){
            return;
        }
        // Find the parent document 
        LocationModel
            .findById(req.params.locationID)
            .select("reviews")
            .exec(function(error, location){
                if(helper.isResError(error, res, 400)){ 
                    return; 
                };
                if(helper.isNoDocumentFound(res, location, 'Location was not found')){
                    return; 
                };

                if(!(location.reviews && location.reviews.length > 0)){
                    helper.sendJsonResponse(res, 404, "This location has no reviews");
                    return;
                }
                var review = location.reviews.id(req.params.reviewID);
                helper.isNoDocumentFound(res, review, "No review matches the given ID");
                helper.sendJsonResponse(res, 200, review);
            });  
    },

    updateOne: function(req, res){
        if(helper.isIDInRequest(req, res , "locationID", "No location ID in request")){
            return;
        }
        if(helper.isIDInRequest(req, res , "reviewID", "No review ID in request")){
            return;
        }

        // Find the parent document 
        LocationModel
            .findById(req.params.locationID)
            .select("reviews rating")
            .exec(function(error, location){
                if(helper.isResError(error, res, 400)){ 
                    return; 
                };
                if(helper.isNoDocumentFound(res, location, 'Location was not found')){
                    return; 
                };

                if(!(location.reviews && location.reviews.length > 0)){
                    helper.sendJsonResponse(res, 404, "This location has no reviews");
                    return;
                };
                var reviewID = req.params.reviewID;
                // update the review 
                doUpdateReview(reviewID, location, req, res);
                helper.sendJsonResponse(res, 201, location.reviews.id(reviewID));
            });
    },

    deleteOne: function(req, res){
        if(helper.isIDInRequest(req, res , "locationID", "No location ID in request")){
            return;
        }
        if(helper.isIDInRequest(req, res , "reviewID", "No review ID in request")){
            return;
        }
        // Find the parent document 
        LocationModel
            .findById(req.params.locationID)
            .select("reviews rating")
            .exec(function(error, location){
                if(helper.isResError(error, res, 400)){ 
                    return; 
                };
                if(helper.isNoDocumentFound(res, location, 'Location was not found')){
                    return; 
                };

                // Remove subdocument and save the parent 
                doRemoveReview(req.params.reviewID, location, res);

                helper.sendJsonResponse(res, 204, null);
            });
        
    }
};

/**
* Removes review from the given location document, updates
* the overall rating and then saves the document 
* @param {ObjectId} reviewID ID of the review subdocument 
* @param {Object} location The location document from which 
* the targetted review will be deleted
* @param {Object} res http response  
*/
function doRemoveReview(reviewID, location, res){
    location.reviews.remove(reviewID); 
    // Save the parent document 
    location.save(function(error, location){
        if(helper.isResError(error, res, 400)){ 
            return;
        };
        updateRating(location);
    });
}

/**
* Update review by id, updates the overall location rating 
* and then saves the document 
* @param {String} reviewID The new location review object
* @param {Object} location The location document whose 
* review will be updated  
* @param {Object} req http request  
* @param {Object} res http response
*/
function doUpdateReview(reviewID, location, req, res){
    var review = location.reviews.id(reviewID);
    helper.isNoDocumentFound(res, review, "No review matches the given ID");

    Object.getOwnPropertyNames(req.body)
        .forEach(function(property){
            if(property in review){
                review[property] = req.body[property];
            }
    });
    
    // save the document
    location.save(function(error, location){
        if(helper.isResError(error, res, 400)){ 
            return;
        };
        updateRating(location);
    });  
};

/**
* Adds review to the given location, updates the 
* overall location rating and then saves the document 
* @param {Object} review The new location review object
* @param {Object} location The location document to which 
* the new review will be added 
* @param {Object} res http response  
*/
function doAddReview(review, location, res){
    location.reviews.push(review);
    // save the document
    location.save(function(error, location){
        if(helper.isResError(error, res, 400)){ 
            return;
        };
        updateRating(location);
        var thisReview = location.reviews[location.reviews.length - 1];
        helper.sendJsonResponse(res, 201, thisReview);
    });  
};

function updateRating(location){
    if(location.reviews && location.reviews.length > 0){
        var reviewsCount = location.reviews.length;
        var avgRating = 0;
        location.reviews.forEach(function(review){
            avgRating += review.rating;
        });
        avgRating = parseInt(avgRating / reviewsCount, 10);
        location.rating = avgRating;
        location.save(function(error) {
            if (error) {
            console.log(error);
            } else {
                console.log("Average rating updated to", avgRating);
            }
        });
    }; 
};