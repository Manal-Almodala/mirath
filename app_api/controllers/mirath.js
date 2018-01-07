const helperModule = require('./shared-functions');
const Alwratha = require("../models/mirath/alwratha");

var alwratha = new Alwratha();

module.exports = {
    readAlwrathaList: function(req, res){
        var alwrathaList = alwratha.getList();
        if(alwrathaList)
        {
            helperModule.sendJsonResponse(res, 200, alwrathaList);
        }
        else
        {
            helperModule.sendJsonResponse(res, 500, "No data was found");
        }     
    },

    addAlwrathaData: function(req, res){
        alwratha.data = req.body;
        helperModule.sendJsonResponse(res, 201, alwratha.data);
    },

    calculateMirath: function(req, res){
        alwratha.result = {
            "ابن":
            { 
                count:"3",
                fortune: "النصف"
            },
            "أب":
            {
                count:"1",
                fortune: "الربع"
            },
            "بنت":
            {
                count:"3",
                fortune: "الربع"
            }
        };
        
        helperModule.sendJsonResponse(res, 200, alwratha.result);
    },
};