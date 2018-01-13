const helperModule = require('./shared-functions');

const Alwratha = require("../models/mirath/alwratha");
var alwratha = new Alwratha();

const Tarika = require("../models/mirath/tarika");
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
        altarika.money = 10;
        altarika.property = 15;
        helperModule.sendJsonResponse(res, 201, alwratha.data);
    },

    calculateMirath: function(req, res)
    {
        for (var warith in alwratha.data) 
        {
            alwratha.data[warith].fortune.ratio = fortuneCalculator[warith];
            alwratha.data[warith].fortune.calculate(altarika);
        }

        calculateTarikaRemainder();

        for(var warith in alwratha.data)
        {
            if(alwratha.data[warith].fortune.hasRemainder)
            {
                alwratha.data[warith].fortune.ratio = fortuneCalculator[warith];
                alwratha.data[warith].fortune.addRemainderWorth(altarika);
            }
        }

        helperModule.sendJsonResponse(res, 200, alwratha.data);
    },
};

function calculateTarikaRemainder()
{
    var consumed = {
        money: 0,
        property: 0
    };

    for(var warith in alwratha.data)
    {
        let count = alwratha.data[warith].count;
        consumed.money += count * alwratha.data[warith].fortune.money;
        consumed.property += count * alwratha.data[warith].fortune.property;
    }

    altarika.remainder.money = altarika.money - consumed.money;
    altarika.remainder.property = altarika.property - consumed.property;
}


