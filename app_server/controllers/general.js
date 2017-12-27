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

    getAboutPage: function(req, res)
    {
        render.about(req,res);
    },
};

var render = 
{
    home: function(req, res, content)
    {
        res.render('home', { 
            pageHeader:{
                title: 'اﻹستحقاقات القرءأنيه',
            },
            items: [
                {
                    name:"الميراث",
                    url: "/mirath"
                },
                {
                    name:"الذكاة",
                    url: "/zakah"
                },
                {
                    name:"الديات",
                    url: "/deya"
                },
                {
                    name:"الفي",
                    url: "/faye'"
                }
            ]
        });
    },

    about: function(req, res, content)
    {
        res.render('about', { 
            pageHeader:{
            title: 'نبذه عن التطبيق',
            strapLine: 'Find places to work with wifi near you!'
            },
            sidebar: 'Looking for wifi and a seat?\n'
            + 'Loc8r helps you find places to work when out and about.'
            + 'Perhaps with coffee, cake or a pint?'
            + "Let Loc8r help find the place you're looking for."
        });
    },
}
