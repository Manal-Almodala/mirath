const helper = require('./helper');
const kwargs = require('kwargs');

const Alwratha = require("../models/mirath/alwratha");
var alwratha = new Alwratha();

const Tarika = require("../models/mirath/tarika");
var altarika = new Tarika();

module.exports.alwratha = alwratha;
module.exports.altarika = altarika;

const people = require("../models/mirath/people");

module.exports.controllers = 
{
    addAltarikaData: function (req, res) 
    {
        altarika.reset();

        if (req.body["أموال"]) 
        {
            altarika.money = req.body["أموال"];
        }
        if (req.body["عقار"])
        {
            altarika.property = req.body["عقار"];
        }

        helper.sendJsonResponse(res, 201, altarika);
    },

    readAlwrathaList: function (req, res) 
    {
        var alwrathaList = getAlwrathaList();
        if (alwrathaList) 
        {
            helper.sendJsonResponse(res, 200, alwrathaList);
        }
        else 
        {
            helper.sendJsonResponse(res, 500, "No data was found");
        }
    },

    addAlwrathaData: function (req, res) 
    {
        alwratha.data = req.body;
        helper.sendJsonResponse(res, 201, alwratha.data);
    },

    calculateMirath: function (req, res) 
    {
        // Distribution based on default rules
        setFortuneRatio(alwratha);
        distributeFortunes(alwratha);

        var fortuneRatioSum = alwratha.sumRatios();

        var { adjOrigin, shareOrigin } = alwratha.adjShareOrigin();

        // Alawl cases 
        if (fortuneRatioSum > 1) 
        {  
            updateFortuneRatio(alwratha, adjOrigin, shareOrigin, 'alawl');
            
            distributeFortunes(alwratha);
        }
        else if (fortuneRatioSum < 1)
        {
            if(alwratha.hasAsbat)
            {
                calculateTarikaRemainder();

                kwargs(updateFortuneRatio, {alwratha: alwratha, reason: 'altaseb'});
            }
            else
            {
                updateFortuneRatio(alwratha, adjOrigin, shareOrigin, 'alrd');

                distributeFortunes(alwratha);
            }
        }

        helper.sendJsonResponse(res, 200, alwratha.data);
    }
};

function getAlwrathaList() {
    var list = {
        "أصحاب الفروض": [],
        "العصبات": [],
        "أصحاب فروض وعصبات": []
    };

    for (var person in people) {
        var relative = {
            relationship: person,
            isSingular: people[person].isSingular,
        };

        list[people[person].type].push(Object(relative));
    }

    return list;
}


function distributeFortunes(alwratha) {
    /* When the user chooses to enter alwratha data 
       without entering altarika. We set altarika 
       money to 1. Therefore, mirath result come as
       the fortune ratio of each warith 
    */

    if (altarika.isNotEntered) 
    {
        altarika.money = 1;
    }

    for (var person in alwratha.data) 
    {
        let warith = alwratha.data[person];

        warith.fortune.calculate(altarika);
    }
}

function setFortuneRatio(alwratha) 
{
    for (var person in alwratha.data) 
    {
        let warith = alwratha.data[person];

        warith.fortune.ratio = people[person].calculateFotuneRatio();
    }
}

function updateFortuneRatio(alwratha, adjOrigin, shareOrigin, reason) 
{
    switch(reason)
    {
        case String('altaseb'):
        altasebUpdate(alwratha);
        break;

        case String('alrd'):
        alrdUpdate(alwratha, adjOrigin, shareOrigin);
        break;

        case String('alawl'):
        alawlUpdate(alwratha, adjOrigin, shareOrigin);
        break;

    }
}

function alawlUpdate(alwratha, adjOrigin, oldOrigin)
{
    for (var person in alwratha.data) 
    {
        let warith = alwratha.data[person];

        warith.fortune.ratio *= oldOrigin / adjOrigin;
    }
}

function alrdUpdate(alwratha, adjOrigin, oldOrigin)
{
    if(alwratha.size == 1)
    {
        let person = Object.keys(alwratha.data)[0];
        let warith = alwratha.data[person];

        warith.fortune.ratio = 1 / warith.count;
    }
    else
    {
        var shareRatio = 1 / adjOrigin;

        if (alwratha.hasSpouse) 
        {
            var spouse = alwratha.data[alwratha.spouse]
            adjOrigin -= spouse.calcShare(oldOrigin);
            shareRatio = 1 / adjOrigin * (1 - spouse.fortune.ratio);
        }

        for (var person in alwratha.data) 
        {
            if (!["زوج", "زوجة"].includes(person)) 
            {
                let warith = alwratha.data[person];
                warith.fortune.ratio = warith.calcShare(oldOrigin) * shareRatio / warith.count;
            }
        }
    }
}

function altasebUpdate(alwratha) 
{
    for (var person in alwratha.data) 
    {
        let warith = alwratha.data[person];

        if (warith.fortune.hasRemainder) 
        {
            warith.fortune.remainderRatio = people[person].calculateFotuneRatio();

            warith.fortune.addRemainderWorth(altarika);
        }
    }

}

function calculateTarikaRemainder() 
{
    var consumed = 
    {
        money: 0,
        property: 0
    };

    for (var person in alwratha.data) 
    {
        let warith = alwratha.data[person];
        consumed.money += warith.count * warith.fortune.money;
        consumed.property += warith.count * warith.fortune.property;
    }

    altarika.deduct(consumed.money, consumed.property);
}