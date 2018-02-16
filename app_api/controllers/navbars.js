var mongoose = require('mongoose');
const helper = require('./helper');

var Navbar = mongoose.model('Navbar');

module.exports = {
    createOne: function(req, res){
        Navbar.create(req.body, function(error, navbar) 
        {
            if(helper.isResError(error, res, 400)){ 
                return;
            }

            helper.sendJsonResponse(res, 201, navbar);
        });
    },

    readOne: function(req, res)
    {
        helper.isIDInRequest(req, res, 
            "navbarName", "No navbar name in request");
        var document = {'name': req.params.navbarName};
        Navbar
            .findOne(document)
            .select("-_id navs")
            .exec(function(error, navbar)
            {
                if(helper.isResError(error, res, 404))
                {
                    return; 
                }
                if(helper.isNoDocumentFound(res, navbar, 
                    'Navbar was not found'))
                {
                    return;
                }

                helper.sendJsonResponse(res, 200, navbar);
            });   
    },

    deleteOne: function(req, res)
    {
        helper.isIDInRequest(req, res, 
            "navbarName", "No navbar name in request");
        var document = {'name': req.params.navbarName};
        Navbar.findOneAndRemove(document, function(error, navbar)
        {
            if(helper.isResError(error, res, 404))
            {
                return;
            }
            if(helper.isNoDocumentFound(res, navbar, 
                "Navbar was not found"))
            {
                return; 
            }
                
            helper.sendJsonResponse(res, 204, {
                message: "Navbar was successfully deleted"
            });    
        });
    }
};


