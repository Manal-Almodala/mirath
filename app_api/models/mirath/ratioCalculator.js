const alwratha = require("../../controllers/mirath").alwratha;
const helper = require("./helper");

module.exports = 
{
    get "ابن"(){
        var fortuneRatio = 0;
        return fortuneRatio;
    },

    get "أب"(){
        var fortuneRatio = 0;

        if(alwratha.isFatherTheOnlyWarith)
        {
            fortuneRatio = 1;
        }
        else if(helper.isObjectHasSecond(alwratha.data, ["ابن", "ابن ابن"]))
        {
            fortuneRatio = 0.167;
        }
        else if(alwratha.hasAshabFroad(["جد", "أم ﻷب", "إخوه ﻷم", 
            "أخت ﻷب","أخت شقيقه"]))
        {
            if(alwratha.data["أب"].fortune.hasRemainder)
            {
                fortuneRatio = 1; 
            }
            alwratha.data["أب"].fortune.hasRemainder = true;
        }

        return fortuneRatio;
    },

    get "ابن ابن"(){
        var fortuneRatio = 0;
        return fortuneRatio;
    },

    get "زوج"(){
        var fortuneRatio = 0.5;

        if(alwratha.hasDirectChild || alwratha.hasSonsChild)
        {
            fortuneRatio = 0.25;
        }

        return fortuneRatio;
    },

    get "زوجه"(){
        var fortuneRatio = 0.25;

        if(alwratha.hasDirectChild || alwratha.hasSonsChild)
        {
            fortuneRatio = 0.125;
        }
        fortuneRatio /= alwratha.data["زوجه"].count;

        return fortuneRatio; 
    },

    get "أخ شقيق"(){
        var fortuneRatio = 0;
        return fortuneRatio; 
    },
    
    get "أم"(){
        var fortuneRatio = 0.333;

        if(alwratha.hasBrothersOrSisters || alwratha.hasDirectChild 
            || alwratha.hasSonsChild)
        {
            fortuneRatio = 0.167;
        }
        else if(alwratha.hasFatherAndSpouse)
        {
            fortuneRatio *= alwratha.data["أم"].fortune.hasRemainder; 
            alwratha.data["أم"].fortune.hasRemainder = true;
        }
        else if(!alwratha.hasAshabFroad(["أم", "أم أم", "أم ﻷب"]))
        {
            if(alwratha.data["أم"].fortune.hasRemainder)
            {
                fortuneRatio = 1; 
            }
            alwratha.data["أم"].fortune.hasRemainder = true;
        }
        return fortuneRatio;
    },

    get "أم أم"(){
        var fortuneRatio = 0.167;

        if(alwratha.data.hasOwnProperty("أم"))
        {
            fortuneRatio = 0;
        }
        else if(!alwratha.hasAshabFroad(["أم أم", "أم ﻷب"]))
        {
            if(alwratha.data["أم أم"].fortune.hasRemainder)
            {
                fortuneRatio = 1; 
            }
            alwratha.data["أم أم"].fortune.hasRemainder = true;
        }

        if(!alwratha.data.hasOwnProperty("أب") && 
            alwratha.data.hasOwnProperty("أم ﻷب"))
        {
            fortuneRatio *= 0.5;
        }

        return fortuneRatio; 
    },

    get "أم ﻷب"(){
        var fortuneRatio = 0.167;

        if(alwratha.data.hasOwnProperty("أم") ||
            alwratha.data.hasOwnProperty("أب"))
        {
            fortuneRatio = 0;
        }
        else if(!alwratha.hasAshabFroad(["أم أم", "أم ﻷب"]))
        {
            if(alwratha.data["أم ﻷب"].fortune.hasRemainder)
            {
                fortuneRatio = 1; 
            }
            alwratha.data["أم ﻷب"].fortune.hasRemainder = true;
        }

        if(!alwratha.data.hasOwnProperty("أم") && 
            alwratha.data.hasOwnProperty("أم أم"))
        {
            fortuneRatio *= 0.5;
        }

        return fortuneRatio; 
    },
};
