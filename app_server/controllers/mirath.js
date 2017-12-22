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
                strapLine: 'Find places to work with wifi near you!'
            },
            sidebar: 'Looking for wifi and a seat?\n'
            + 'Loc8r helps you find places to work when out and about.'
            + 'Perhaps with coffee, cake or a pint?'
            + "Let Loc8r help find the place you're looking for."
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
            strapLine: 'Find places to work with wifi near you!'
            },
            sidebar: 'Looking for wifi and a seat?\n'
            + 'Loc8r helps you find places to work when out and about.'
            + 'Perhaps with coffee, cake or a pint?'
            + "Let Loc8r help find the place you're looking for."
        });
    },
}
