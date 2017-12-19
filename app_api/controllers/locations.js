var mongoose = require('mongoose');
const helperModule = require('./shared-functions');

var LocationModel = mongoose.model('Location');

module.exports = {
    readLocationsList: function(req, res){
        LocationModel.find()
            .exec(function(error, locations){
                if(helperModule.isResError(error, res, 400)){ 
                    return; 
                };
                if(helperModule.isNoDocumentFound(res, locations, "Did not find any location!")){ 
                    return;
                };

                helperModule.sendJsonResponse(res, 200, locations);
            });
    },

    createLocation: function(req, res){
        LocationModel
            .create(req.body, function(error, location) {
                if(helperModule.isResError(error, res, 400)){ 
                    return;
                };

                helperModule.sendJsonResponse(res, 201, location);
        });
    },

    readOne: function(req, res){
        helperModule.isIDInRequest(req, res, "locationID", "No location ID in request");
        LocationModel.findById(req.params.locationID)
            .exec(function(error, location){
                if(helperModule.isResError(error, res, 404)){
                    return; 
                };
                if(helperModule.isNoDocumentFound(res, location, 'Location was not found')){
                    return;
                };

                helperModule.sendJsonResponse(res, 200, location);
            });   
    },

    updateOne: function(req, res){
        // find the document 
        LocationModel
            .findById(req.params.locationID)
            .select("-rating -reviews -coordinates")
            .exec(function(error, location){
                if(helperModule.isResError(error, res, 400)){
                    return;
                }
                if(helperModule.isNoDocumentFound(res, location, 'Location was not found')){
                    return;
                }

                updateLocationData(req, location, req.body.paths);
                helperModule.sendJsonResponse(res, 201, location);
            }); 
    },

    deleteOne: function(req, res){
        helperModule.isIDInRequest(req, res, "locationID", "No location ID in request");
        LocationModel
            .findByIdAndRemove(req.params.locationID, function(error, location){
                if(helperModule.isResError(error, res, 404)){
                    return;
                };
                if(helperModule.isNoDocumentFound(res, location, "Location was not found")){
                    return; 
                };
                
                helperModule.sendJsonResponse(res, 204, {
                    message: "Location was successfully deleted"
                });
            });
    }
}

/**
 * Updates the values of the paths specified in 
 * "paths" into the document "location"
 * @param {Object} req http request
 * @param {Object} location The location document 
 * which its data paths will be updated
 * @param {String} paths Space separated document's
 * properties to be updated 
 */
function updateLocationData(req, location){
    Object.getOwnPropertyNames(req.body)
        .forEach(function(property){
            if(property in location){
                location[property] = req.body[property];
            }
    });

    location.save(function(error){
        if (error) {
            console.log(error);
        } else {
            console.log("Location updated successfully!");
        }
    });
};

