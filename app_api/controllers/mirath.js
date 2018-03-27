const helper = require('./helper');

const Alwratha = require("../models/mirath/alwratha");
var alwratha = new Alwratha();

const Tarika = require("../models/mirath/tarika");
var altarika = new Tarika();

module.exports.alwratha = alwratha;
module.exports.altarika = altarika;

const people = require("../models/mirath/people");

module.exports.controllers = {
    addAltarikaData: function(req, res){
        altarika.reset();
        
        if(req.body["أموال"]){
            altarika.money = req.body["أموال"];
        }
        if(req.body["عقار"]){
            altarika.property = req.body["عقار"];
        }

        helper.sendJsonResponse(res, 201, altarika);
    },

    readAlwrathaList: function(req, res){
        var alwrathaList = getAlwrathaList();
        if(alwrathaList)
        {
            helper.sendJsonResponse(res, 200, alwrathaList);
        }
        else
        {
            helper.sendJsonResponse(res, 500, "No data was found");
        }     
    },

    addAlwrathaData: function(req, res){
        alwratha.data = req.body;
        helper.sendJsonResponse(res, 201, alwratha.data);
    },

    calculateMirath: function(req, res)
    {
        /* When the user chooses to enter alwratha data 
           without entering altarika. We set altarika 
           money to 1. Therefore, mirath result come as
           the fortune ratio of each warith 
        */
        if(altarika.isNotEntered)
        {
            altarika.money = 1;
        }

        giveFortunes(alwratha);
        calculateTarikaRemainder();
        giveRemainderFotunes(alwratha);
        
        helper.sendJsonResponse(res, 200, alwratha.data);
    }
};

function getAlwrathaList()
{
    var list = {
        "أصحاب الفروض":[],
        "العصبات": [],
        "أصحاب فروض وعصبات": []
    };

    for(var person in people)
    {
        var relative = {
            relationship: person,
            isSingular: people[person].isSingular,
        };

        list[people[person].type].push(Object(relative));
    }

    return list;
}

function giveFortunes(alwratha)
{
    for (var warith in alwratha.data) 
    {
        alwratha.data[warith].fortune.ratio = 
                    people[warith].calculateFotuneRatio();

        alwratha.data[warith].fortune.calculate(altarika);
    }
}

function giveRemainderFotunes(alwratha)
{
    for(var warith in alwratha.data)
    {
        if(alwratha.data[warith].fortune.hasRemainder)
        {
            alwratha.data[warith].fortune.ratio = 
                        people[warith].calculateFotuneRatio();

            alwratha.data[warith].fortune.addRemainderWorth(altarika);
        }
    }

}

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


