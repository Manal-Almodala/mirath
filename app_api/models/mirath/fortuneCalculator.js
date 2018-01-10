const alwratha = require("../../controllers/mirath").alwratha;
const altarika = require("../../controllers/mirath").altarika;
const Fortune = require("./warith").fortune;

module.exports = 
{
    get "ابن"(){
        var fortune = new Fortune();
        return fortune;
    },

    get "ابن ابن"(){
        var fortune = new Fortune();
        return fortune ;
    },

    get "زوج"(){
        var fortune = new Fortune();
        fotune.ratio = 0.5;

        if(alwratha.hasDirectChild || alwratha.hasSonsChild)
        {
            fotune.ratio = 0.25;
        }

        return fortune;
    },

    get "زوجه"(){
        var fortune = new Fortune();
        fotune.ratio = 0.25;

        if(alwratha.hasDirectChild || alwratha.hasSonsChild)
        {
            fotune.ratio = 0.125;
        }

        fotune.ratio /= alwratha.data["زوجه"].count;
        fortune
        return fortune  
    },

    get "أم"(){
        var fortune = new Fortune();
        fotune.ratio = 0.333;

        if(alwratha.hasBrothersOrSisters || alwratha.hasDirectChild 
            || alwratha.hasSonsChild)
        {
            fotune.ratio = 0.167;
        }
        
        /* Add two more cases 
         * 1. 1/3 + the remainder 
         * 2. 1/3 of the remainder 
        */

        return fortune;
    },
};

function SetMoneyAndProperty(ratio)
{

}