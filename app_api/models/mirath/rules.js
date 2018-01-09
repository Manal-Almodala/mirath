const alwratha = require("../../controllers/mirath").model;

module.exports = 
{
    get "ابن"(){
        var fortune  = 0;
        return fortune 
    },

    get "ابن ابن"(){
        var fortune = 0;
        return fortune 
    },
    get "زوج"(){
        var fortune = 0.5;

        if(alwratha.hasDirectChild || alwratha.hasSonsChild)
        {
            fortune = 0.25;
        }

        return fortune;
    },
};

