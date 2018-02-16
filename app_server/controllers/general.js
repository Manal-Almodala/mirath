var request = require('request');
const helper = require("./helper");

var navs = [];

module.exports = 
{
    getHome: function(req, res)
    {
        helper.requestApi(req, res, "/navbar/main", 
            function(navsObj)
            {
                navs = navsObj.navs;
                render.home(req, res);
            }
        );
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
            navbar: navs
        });
    },

    about: function(req, res, content)
    {
        res.render('about', { 
            title: 'نبذه عن التطبيق',
            navbar: navs
        });
    },
};


