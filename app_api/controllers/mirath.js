const helperModule = require('./shared-functions');
const Alwratha = require("../models/mirath/alwratha");
const Tarika = require("../models/mirath/tarika");

var alwratha = new Alwratha();
var altarika = new Tarika();

module.exports.alwratha = alwratha;
module.exports.altarika = altarika;

const fortuneCalculator = require("../models/mirath/fortuneCalculator");

module.exports.controllers = {
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

    calculateMirath: function(req, res)
    {
        for (var warith in alwratha.data) 
        {
            alwratha.data[warith].fortune = fortuneCalculator[warith];
        }
        
        helperModule.sendJsonResponse(res, 200, alwratha.data);
    },
};


