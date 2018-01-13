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
            ]
        }
        return alwrathaList;
    }

    get hasDirectChild()
    {
        var directChildren = ["بنت", "ابن"];
        this._hasDirectChild = false;
        directChildren.forEach(child => {
            if(this.data.hasOwnProperty(child))
            {
                this._hasDirectChild = true;
                return;
            }
        });
        return this._hasDirectChild;
    }

    get hasSonsChild()
    {
        this._hasSonsChild = this.data.hasOwnProperty("ابن ابن");
        return this._hasSonsChild;
    }

    get hasBrothersOrSisters()
    {
        const brothersSisters = ["أخ شقيق", "أخ ﻷب", "أخت شقيقه",
                                 ,"أخت ﻷب", "إخوه ﻷم"];
        this._hasBrothersOrSisters = false;
        let count = 0;
        brothersSisters.forEach(brotherOrSister => {
            if(this.data.hasOwnProperty(brotherOrSister))
            {
                count += this.data[brotherOrSister].count;
                if(count > 1)
                {
                    this._hasBrothersOrSisters = true;
                    return;
                }  
            }
        });
        return this._hasBrothersOrSisters;
    }

    hasAshabFroad(excludedWarith)
    {
        var ashabFroad = this.getList()["أصحاب الفروض"];
        ashabFroad.splice(ashabFroad.indexOf(excludedWarith),1);
        
        var hasAshabFroad = false;
        ashabFroad.forEach(person => {
            if(this.data.hasOwnProperty(person.relationship))
            {
                hasAshabFroad = true;
                return;
            }
        });
        return hasAshabFroad;
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
