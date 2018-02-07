var request = require('request');
const helper = require("./helper");

module.exports = 
{
    getHome: function(req, res)
    {
        helper.requestApi(req, res, "/navbar/main", function(content){
            render.home(req, res, content);
        });
        
    },

    getAboutPage: function(req, res)
    {
        render.about(req,res);
    },
};

var render = {
    home: function(req, res, content)
    {
        res.render('home', { 
            title: 'اﻹستحقاقات القرءأنيه',
            navbar: content.navs
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
};


