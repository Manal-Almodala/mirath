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

    getList()
    {
        var alwrathaList = {
            "العصبات": 
            [
                {
                    relationship: "ابن",
                    singular: false
                },
                {
                    relationship: "ابن ابن",
                    singular: false
                },
                {
                    relationship: "أخ شقيق",
                    singular: false
                },
                {
                    relationship: "أخ ﻷب",
                    singular: false
                },
                {
                    relationship: "ابن أخ شقيق",
                    singular: false
                },
                {
                    relationship: "ابن أخ ﻷب",
                    singular: false
                },
                {
                    relationship: "عم شقيق",
                    singular: false
                },
                {
                    relationship: "عم ﻷب",
                    singular: false
                },
                {
                    relationship: "ابن عم شقيق",
                    singular: false
                },
                {
                    relationship: "ابن عم ﻷب",
                    singular: false
                },
            ], 
            "أصحاب فروض وعصبات": 
            [
                {
                    relationship: "أب",
                    singular: true
                },
                {
                    relationship: "جد",
                    singular: true
                }
            ],
            "أصحاب الفروض": 
            [
                {
                    relationship: "زوج",
                    singular: true
                }, 
                {
                    relationship: "زوجه",
                    singular: false
                }, 
                {
                    relationship: "أخت شقيقه",
                    singular: false
                }, 
                {
                    relationship: "أخت ﻷب",
                    singular: false
                }, 
                {
                    relationship: "بنت",
                    singular: false
                }, 
                {
                    relationship: "بنت ابن",
                    singular: false
                }, 
                {
                    relationship: "أم",
                    singular: true
                }, 
                {
                    relationship: "أم أم",
                    singular: true
                }, 
                {
                    relationship: "أم ﻷب",
                    singular: true
                }, 
                {
                    relationship: "إخوه ﻷم",
                    singular: false
                }, 
            ],
            "أصحاب فروض وعصبات": 
            [
                {
                    relationship: "أب",
                    singular: true
                },
                {
                    relationship: "جد",
                    singular: true
                }
            ],
        }
        return alwrathaList;
    }

    getAshabAlfroad()
    {
        var tempArray = this.getList()["أصحاب الفروض"];
        var ashabFroad = [];

        for(var object of tempArray)
        {
            ashabFroad.push(object.relationship);
        }

        for(var object of this.getList()["أصحاب فروض وعصبات"])
        {
            ashabFroad.push(object.relationship);
        }
      
        return ashabFroad
    }

    get hasDirectChild()
    {
        const directChildren = ["بنت", "ابن"];
        return helper.isObjectHasSecond(this.data, directChildren);
    }

    get hasSonsChild()
    {
        return this.data.hasOwnProperty("ابن ابن");
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

    hasAshabFroad(excludedWaratha)
    {
        var tempArray = this.getAshabAlfroad();
        var ashabFroad = [];

        tempArray.forEach(person => {
            if(excludedWaratha.indexOf(person) == -1)
            {
                ashabFroad.push(person);
            }
        });

        return helper.isObjectHasSecond(this.data, ashabFroad);
    }

    get hasFatherAndSpouse()
    {
        var hasFatherAndHusband = this.data.hasOwnProperty("أب") 
            && this.data.hasOwnProperty("زوج");
        var hasFatherAndWife = this.data.hasOwnProperty("أب") 
            && this.data.hasOwnProperty("زوجه"); 

        return (hasFatherAndHusband || hasFatherAndWife);
    }
};
module.exports = Alwratha;
