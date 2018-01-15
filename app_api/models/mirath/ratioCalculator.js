const alwratha = require("../../controllers/mirath").alwratha;

module.exports = 
{
    get "زوج"(){
        var fortuneRatio = 0.5;

        if(alwratha.includesAnyOf(["بنت", "ابن", "ابن ابن"]))
        {
            fortuneRatio = 0.25;
        }

        return fortuneRatio;
    },

    get "زوجه"(){
        var fortuneRatio = 0.25;

        if(alwratha.includesAnyOf(["بنت", "ابن", "ابن ابن"]))
        {
            fortuneRatio = 0.125;
        }
        fortuneRatio /= alwratha.data["زوجه"].count;

        return fortuneRatio; 
    },

    get "أب"(){
        var fortuneRatio = 0;

        if(alwratha.isFatherTheOnlyWarith)
        {
            fortuneRatio = 1;
        }
        else if(alwratha.includesAnyOf(["ابن", "ابن ابن"]))
        {
            fortuneRatio = 0.167;
        }
        else if(alwratha.hasAshabFroad(["أب", "جد", "أم ﻷب", "إخوه ﻷم", 
            "أخت ﻷب","أخت شقيقه"]))
        {
            fortuneRatio = setRemainderRatio("أب", fortuneRatio, 1);
        }

        return fortuneRatio;
    },

    get "أم"(){
        var fortuneRatio = 0.333;

        if(alwratha.isEligibleAlone(["أم", "أم أم", "أم ﻷب"]))
        {
            fortuneRatio = setRemainderRatio("أم", fortuneRatio, 1);
        }
        else if(alwratha.hasFatherAndSpouse && alwratha.size == 3)
        {
            fortuneRatio *= alwratha.data["أم"].fortune.hasRemainder; 
            alwratha.data["أم"].fortune.hasRemainder = true;
        }
        else if(!alwratha.hasBrothersOrSisters && 
            !alwratha.includesAnyOf(["بنت", "بنت ابن", "ابن", "ابن ابن"]))
        {
            fortuneRatio = 0.333;
        }
        else
        {
            fortuneRatio = 0.167;
        }
        
        return fortuneRatio;
    },

    get "جد"(){
        var fortuneRatio = 0;

        if(alwratha.data.hasOwnProperty("أب"))
        {
            fortuneRatio = 0;
        }
        else if(alwratha.isGrandfatherTheOnlyWarith)
        {
            fortuneRatio = 1;
        }
        else if(alwratha.includesAnyOf(["ابن", "ابن ابن"]))
        {
            fortuneRatio = 0.167;
        }
        else if(alwratha.hasAshabFroad(["جد", "إخوه ﻷم", 
            "أخت ﻷب","أخت شقيقه"]))
        {
            fortuneRatio = setRemainderRatio("جد", fortuneRatio, 1);
        }

        return fortuneRatio;
    },

    get "أم أم"(){
        var fortuneRatio = 0.167;

        if(alwratha.data.hasOwnProperty("أم"))
        {
            fortuneRatio = 0;
        }
        if(alwratha.isEligibleAlone(["أم أم", "أم ﻷب"]))
        {
            fortuneRatio = setRemainderRatio("أم", fortuneRatio, 1);
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
        else if(alwratha.isEligibleAlone(["أم أم", "أم ﻷب"]))
        {
            fortuneRatio = setRemainderRatio("أم ﻷب", fortuneRatio, 1);
        }

        if(!alwratha.data.hasOwnProperty("أم") && 
            alwratha.data.hasOwnProperty("أم أم"))
        {
            fortuneRatio *= 0.5;
        }

        return fortuneRatio; 
    },

    /********TBD*********/
    get "ابن"(){
        var fortuneRatio = 0;
        return fortuneRatio;
    },

    /********TBD*********/
    get "بنت"(){
        var fortuneRatio = 0;
        return fortuneRatio;
    },

    /********TBD*********/
    get "ابن ابن"(){
        var fortuneRatio = 0;
        return fortuneRatio;
    },
   
    /********TBD*********/
    get"بنت ابن"(){
        var fortuneRatio = 0;
        return fortuneRatio;
    },
    
    /********TBD*********/
    get "أخ شقيق"(){
        var fortuneRatio = 0;
        return fortuneRatio; 
    },

    /********TBD*********/
    get "أخ ﻷب"(){
        var fortuneRatio = 0;
        return fortuneRatio;
    },

    get "إخوه ﻷم"(){
        var fortuneRatio = 0;
        const count = alwratha.data["إخوه ﻷم"].count;
        const isNoOthers = alwratha.size == 1;

        if(alwratha.includesAnyOf(["أب", "جد", "ابن", 
            "ابن ابن", "بنت", "بنت ابن"]))
        {
            fortuneRatio = 0;
        }
        else if(count == 1)
        {
            fortuneRatio = 0.167;
            if(isNoOthers)
            {
                fortuneRatio = setRemainderRatio("إخوه ﻷم", fortuneRatio, 1);
            }
        }
        else if(count > 1)
        {
            fortuneRatio = 0.333;
            if(isNoOthers)
            {
                fortuneRatio = setRemainderRatio("إخوه ﻷم", fortuneRatio, 1);
            }
        }

        return fortuneRatio / count;
    },

    get "ابن أخ شقيق"(){
        var fortuneRatio = 0;
        const count = alwratha.data["ابن أخ شقيق"].count;

        if(alwratha.includesAnyOf(["ابن", "ابن ابن", "أب", "جد", 
            "أخ شقيق", "أخ ﻷب", "أخت شقيقه", "أخت ﻷب", "بنت", "بنت ابن"]))
        {
            fortuneRatio = 0;
        }
        else if(alwratha.isEligibleAlone(["ابن أخ شقيق", "ابن أخ ﻷب",
            "عم شقيق", "عم ﻷب", "ابن عم شقيق", "ابن عم ﻷب"]))
        {
            fortuneRatio = 1;
        }
        else
        {
            fortuneRatio = setRemainderRatio("ابن أخ شقيق", fortuneRatio, 1);
        }

        return fortuneRatio / count;
    },

    /********TBD*********/
    get "ابن أخ ﻷب"(){
        var fortuneRatio = 0;
        return fortuneRatio;
    },

    get "عم شقيق"(){
        var fortuneRatio = 0;
        const count = alwratha.data["عم شقيق"].count;

        if(alwratha.includesAnyOf(["ابن", "ابن ابن", "أب", "جد", 
            "أخ شقيق", "أخ ﻷب", "أخت شقيقه", "أخت ﻷب", "بنت", 
            "بنت ابن", "ابن أخ ﻷب", "ابن أخ شقيق"]))
        {
            fortuneRatio = 0;
        }
        else if(alwratha.isEligibleAlone(["عم شقيق", "عم ﻷب", 
            "ابن عم شقيق", "ابن عم ﻷب"]))
        {
            fortuneRatio = 1;
        }
        else
        {
            fortuneRatio = setRemainderRatio("عم شقيق", fortuneRatio, 1);
        }

        return fortuneRatio / count;
    },

    get "عم ﻷب"(){
        var fortuneRatio = 0;
        const count = alwratha.data["عم ﻷب"].count;

        if(alwratha.includesAnyOf(["ابن", "ابن ابن", "أب", "جد", 
            "أخ شقيق", "أخ ﻷب", "أخت شقيقه", "أخت ﻷب", "بنت", 
            "بنت ابن", "ابن أخ ﻷب", "ابن أخ شقيق", "عم شقيق"]))
        {
            fortuneRatio = 0;
        }
        else if(alwratha.isEligibleAlone(["عم ﻷب", 
            "ابن عم شقيق", "ابن عم ﻷب"]))
        {
            fortuneRatio = 1;
        }
        else
        {
            fortuneRatio = setRemainderRatio("عم ﻷب", fortuneRatio, 1);
        }

        return fortuneRatio / count;
    },

    /********TBD*********/
    get "ابن عم شقيق"(){
        var fortuneRatio = 0;
        return fortuneRatio;
    },

    /********TBD*********/
    get "ابن عم ﻷب"(){
        var fortuneRatio = 0;
        return fortuneRatio;
    },
};

function setRemainderRatio(person, fortuneRatio, value)
{
    if(alwratha.data[person].fortune.hasRemainder)
    {
        fortuneRatio = value; 
    }
    alwratha.data[person].fortune.hasRemainder = true;

    return fortuneRatio;
}
