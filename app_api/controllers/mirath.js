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
        giveFortunes(alwratha);

        calculateTarikaRemainder();
        giveRemainderToAsabat(alwratha);

        calculateTarikaRemainder();
        if(altarika.hasRemainder)
        {
            giveForodRemainder(alwratha);
        }
        
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
    /* When the user chooses to enter alwratha data 
       without entering altarika. We set altarika 
       money to 1. Therefore, mirath result come as
       the fortune ratio of each warith 
    */
    if(altarika.isNotEntered)
    {
        altarika.money = 1;
    }

    for (var person in alwratha.data) 
    {
        let warith = alwratha.data[person];

        warith.fortune.ratio = people[person].calculateFotuneRatio();
        warith.fortune.calculate(altarika);
    }
}

function giveRemainderToAsabat(alwratha)
{
    for(var person in alwratha.data)
    {
        let warith = alwratha.data[person];

        if(warith.fortune.hasRemainder)
        {
            warith.fortune.remainderRatio = 
                        people[person].calculateFotuneRatio();

            warith.fortune.addRemainderWorth(altarika);
        }
    }

}

function giveForodRemainder(alwratha)
{
    var sharesOrigin = getTotalShares(alwratha);
    var shareRatio = 1 / sharesOrigin;

    if(alwratha.hasSpouse)
    {
        var spouse = alwratha.data[alwratha.spouse]
        shareRatio = 1 / sharesOrigin * (1 - spouse.fortune.ratio);
    }

    for (var person in alwratha.data) 
    {
        if(!["زوج", "زوجة"].includes(person))
        {
            let warith = alwratha.data[person];
            warith.fortune.ratio = warith.share * shareRatio / warith.count;         
            warith.fortune.calculate(altarika); 
        } 
    }  
}

function getTotalShares(alwratha)
{
    var totalShares = 0;
    for(var warith in alwratha.data)
    {
        if(!["زوج", "زوجة"].includes(warith))
        {
            totalShares += alwratha.data[warith].share; 
        }              
    }

    return Math.floor(totalShares);
}

function calculateTarikaRemainder()
{
    var consumed = {
        money: 0,
        property: 0
    };

    for(var person in alwratha.data)
    {
        let warith = alwratha.data[person];
        consumed.money += warith.count * warith.fortune.money;
        consumed.property += warith.count * warith.fortune.property;
    }

    altarika.deduct(consumed.money, consumed.property);
}