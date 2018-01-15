const helper = require("../models/mirath/helper");
function isEligibleAlone(warithAndMhgoben, ref)
{
    var isEligibleAlone = true;
    if(ref.length > warithAndMhgoben.length)
    {
        isEligibleAlone = false;
    }
    else
    {
        for(var warith of ref)
        {
            if(!warithAndMhgoben.includes(warith))
            {
                isEligibleAlone = false;
                break;
            }
        }
    }
    return isEligibleAlone;   
}

console.log(isEligibleAlone(["1", "2"], ["1"]));
console.log(isEligibleAlone(["1", "2"], ["1", "5"]));

    