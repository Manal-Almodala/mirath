var request = require('request');

var apiOptions = {
    _server : "https://estihgagat.herokuapp.com",
    
    get server() {
            if (process.env.NODE_ENV !== 'production') { 
                this._server = "http://localhost:3000";
            }
            return this._server;
    }
}

module.exports = 
{
    getHome: function(req, res)
    {
        render.home(req,res);
    },

    getDataPage: function(req, res)
    {
        var listOfAlwratha = 
        { 
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
        };
        render.dataPage(req, res, listOfAlwratha);
    },

    processAlwrathaData: function(req, res)
    { 
        res.send();
    },

    getResultPage: function(req, res)
    {
        render.resultPage(req,res);
    },

    getDetailPage: function(req, res)
    {
        render.detailPage(req,res);
    }
};

var render = 
{
    home: function(req, res, content)
    {
        res.render('mirath-home', { 
            pageHeader:
            {
                title: 'الميراث',
            },
            items: navItems           
        });
    },

    dataPage: function(req, res, alwratha)
    {
        res.render('mirath-data', {
            pageHeader: 
            {
                title: 'إدخال الورثه'
            },
            items: navItems,
            listOfAlwartha: alwratha
        });
    },

    resultPage: function(req, res, result)
    {
        res.render('mirath-result', { 
            pageHeader:{
                title: 'اﻷنصبه',
            },
            items: navItems,            
            result:{
                "ابن":
                { 
                    count:"3",
                    fortune: "النصف"
                },
                "أب":
                {
                    count:"1",
                    fortune: "الربع"
                },
                "بنت":
                {
                    count:"3",
                    fortune: "الربع"
                }
            }
        });
    },

    detailPage: function(req, res, content)
    {
        res.render('mirath-detail', { 
            pageHeader:{
                title: 'تفاصيل حساب اﻷنصبه',
            },
            items: navItems,            
            alwrathaDetail:[
                {
                    relationship: "ابن",
                    count:"3",
                    fortune: "النصف"
                },
                {
                    relationship: "أب",
                    count:"1",
                    fortune: "الربع"
                },
                {
                    relationship: "بنت",
                    count:"3",
                    fortune: "الربع"
                }
            ]
        });
    },
}

var navItems = [
    {
        name:"الميراث",
        url: "/mirath"  
    },
    {
        name:"إدخال الورثه",
        url: "/mirath/data-entry"
    },
    {
        name:"شاشة اﻷنصبه",
        url: "/mirath/result"
    },
    {
        name:"الشاشه الرئيسيه",
        url: "/"  
    },
];
