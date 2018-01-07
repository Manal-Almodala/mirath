class Alwratha 
{
    constructor()
    {
        this.data = {};
        this.result = {};
    }

    get data()
    {
        return this._data;
    }

    set data(alwrathaData)
    {
        this._data = alwrathaData;
        for (var person in this._data) {
            if (this._data.hasOwnProperty(person)) {
                this.setEmptyCountToOne(person);
                this._data[person] = parseInt(this._data[person], 10);
            }
        };
    }

    get result()
    {
        return this._result;
    }

    set result(value)
    {
        this._result = value;
    }

    setEmptyCountToOne(person)
    {
        if(this.data[person] === "")
        {
            this._data[person] = 1;
        }
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
