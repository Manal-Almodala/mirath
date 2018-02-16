var mongoose = require('mongoose');
const helper = require('./helper');

var Ayat = mongoose.model('Ayat');

module.exports = {
    createAyat: function(req, res){
        Ayat.create(req.body, function(error, ayat) 
        {
            if(helper.isResError(error, res, 400))
            { 
                return;
            }

            helper.sendJsonResponse(res, 201, ayat);
        });
    },

    readList: function(req, res)
    {
        helper.isIDInRequest(req, res, 
            "topic", "No ayat topic in request");
        var document = {'topic': req.params.topic};
        Ayat
            .findOne(document)
            .select("-_id ayat")
            .exec(function(error, ayat)
            {
                if(helper.isResError(error, res, 404))
                {
                    return; 
                }
                if(helper.isNoDocumentFound(res, ayat, 
                    "Ayat of this topic were not found"))
                {
                    return;
                }

                helper.sendJsonResponse(res, 200, ayat);
            });   
    },

    deleteAyat: function(req, res)
    {
        helper.isIDInRequest(req, res, 
            "topic", "No ayat topic in request");
        var document = {'topic': req.params.topic};
        Ayat.findOneAndRemove(document, function(error, ayat)
        {
            if(helper.isResError(error, res, 404))
            {
                return;
            }
            if(helper.isNoDocumentFound(res, ayat, 
                "Ayat of this topic were not found"))
            {
                return; 
            }
                
            helper.sendJsonResponse(res, 204, {
                message: "Ayat were successfully deleted"
            });    
        });
    }
};



