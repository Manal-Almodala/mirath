var request = require('request');

var apiOptions = {
    _server : "https://loc8r-yasso.herokuapp.com",
    
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
        render.dataPage(req,res);
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
        });
    },

    dataPage: function(req, res, content)
    {
        res.render('mirath-data', {
            pageHeader: 
            {
                title: 'إدخال الورثه'
            }
        });
    },

    resultPage: function(req, res, content)
    {
        res.render('mirath-result', { 
            pageHeader:{
                title: 'اﻷنصبه',
            },
            alwratha:[
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

    detailPage: function(req, res, content)
    {
        res.render('mirath-detail', { 
            pageHeader:{
                title: 'تفاصيل حساب اﻷنصبه',
            },
            alwratha:[
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
