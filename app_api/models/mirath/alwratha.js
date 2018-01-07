const Warith = require("./warith");

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
            ]
        }
        return alwrathaList;
    }
};
module.exports = Alwratha;
