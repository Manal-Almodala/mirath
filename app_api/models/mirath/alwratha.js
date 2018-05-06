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
        return this.includes("أم أم") + 
               (!this.includes("أب")) * this.includes("أم ﻷب");
    }

    get hasBrothersOrSisters()
    {
        const brothersAndSisters = ["أخ شقيق", "أخ ﻷب", "أخت شقيقه",
                                 ,"أخت ﻷب", "إخوه ﻷم"];
        var hasBrothersOrSisters = false;
        let count = 0;
        for(var brotherOrSister of brothersAndSisters)
        {
            if(this.includes(brotherOrSister))
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
                if(this.includes(person))
                {
                    isTargetIncluded = true;
                    break;
                }
            }
        }

        return isTargetIncluded;
    }

    includes(person)
    {
        return this.data.hasOwnProperty(person);
    }

    isAlone(warithAndMhgoben)
    {
        var isEligibleAlone = true;
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
                    isEligibleAlone = false;
                    break;
                }
            }
        }
        return isEligibleAlone;   
    }

    get hasParentsAndSpouse()
    {
        var hasParents = this.includes("أب") && 
                            this.includes("أم");

        return (hasParents && this.hasSpouse);
    }

    get hasSpouse()
    {
        const spouse = ["زوج", "زوجه"];
        return this.includesAnyOf(spouse);
    }
};

module.exports = Alwratha;
