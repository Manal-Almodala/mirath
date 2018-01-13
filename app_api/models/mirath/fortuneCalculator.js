const alwratha = require("../../controllers/mirath").alwratha;

module.exports = 
{
    get "ابن"(){
        var fortuneRatio = 0;
        return fortuneRatio;
    },

    get "أب"(){
        var fortuneRatio = 0;
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
        else if(!alwratha.hasAshabFroad("أم"))
        {
            if(alwratha.data["أم"].fortune.hasRemainder)
            {
                fortuneRatio = 1; 
            }
            alwratha.data["أم"].fortune.hasRemainder = true;
        }
        return fortuneRatio;
    },
};
