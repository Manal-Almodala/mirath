const Warith = require("./warith").warith;

class Alwratha 
{
    constructor()
    {
        this.data = {};
    }

    get data()
    {
        return this._data;
    }

    set data(alwrathaForm)
    {
        var alwrathaData = {};
        for(var person in alwrathaForm)
        {
            let warith = new Warith();
            warith.count = parseInt(alwrathaForm[person], 10);
            alwrathaData[person] = warith;
        }
        this._data = alwrathaData;
    }

    get size()
    {
        var count  = 0;
        for(var warith in this.data)
        {
            count++;
        }
        return count;
    }

    get grandMothersCount()
    {
        return this.data.hasOwnProperty("أم أم") + 
                    (!this.data.hasOwnProperty("أب")) *
                    this.data.hasOwnProperty("أم ﻷب");
    }

    get hasBrothersOrSisters()
    {
        const brothersAndSisters = ["أخ شقيق", "أخ ﻷب", "أخت شقيقه",
                                 ,"أخت ﻷب", "إخوه ﻷم"];
        var hasBrothersOrSisters = false;
        let count = 0;
        for(var brotherOrSister of brothersAndSisters)
        {
            if(this.data.hasOwnProperty(brotherOrSister))
            {
                count += this.data[brotherOrSister].count;
                if(count > 1)
                {
                    hasBrothersOrSisters = true;
                    break;
                }  
            }
        }

        return hasBrothersOrSisters;
    }

    includesAnyOf(people)
    {
        var isTargetIncluded = false;
        if(people.length > 0)
        {
            for(var person of people)
            {
                if(this.data.hasOwnProperty(person))
                {
                    isTargetIncluded = true;
                    break;
                }
            }
        }

        return isTargetIncluded;
    }

    isAlone(warithAndMhgoben)
    {
        var isAlone = true;
        if(this.size > warithAndMhgoben.length)
        {
            isEligibleAlone = false;
        }
        else
        {
            for(var warith in this.data)
            {
                if(!warithAndMhgoben.includes(warith))
                {
                    isAlone = false;
                    break;
                }
            }
        }
        return isAlone;   
    }

    get hasParentsAndSpouse()
    {
        const spouse = ["زوج", "زوجه"];

        var hasParents = this.includesAnyOf(["أب"]) && 
                            this.includesAnyOf(["أم"]);

        var hasSpouse = this.includesAnyOf(spouse);

        return (hasParents && hasSpouse);
    }
};

module.exports = Alwratha;
