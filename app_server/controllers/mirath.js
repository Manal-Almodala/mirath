const request = require('request');
const helper = require("./helper");

var navs = [];

module.exports = 
{
    getHome: function(req, res)
    {
        helper.requestApi(req, res, "/navbar/mirath", function(navsObj){
            navs = navsObj.navs;

            helper.requestApi(req, res, "/ayat/mirath", 
                function(ayatObj)
                {
                    render.home(req, res, ayatObj.ayat);
                }
            );
        });
    },

    getAltarikaPage: function(req, res)
    {
        render.altarikaPage(req, res);
    },

    getAlwrathaPage: function(req, res)
    {
        helper.requestApi(req, res, "/mirath/alwratha", 
            function(content)
            {
                render.alwrathaPage(req, res, content);
            }
        );
    },

    processAltarikaData: function(req, res)
    { 
        helper.requestApi(req, res, "/mirath/altarika", 
            function(content)
            {
                res.redirect(helper.serverUrl + "/mirath/alwratha");
            }
        );  
    },

    processAlwrathaData: function(req, res)
    { 
        helper.requestApi(req, res, "/mirath/alwratha", 
            function(content)
            {
                res.redirect(helper.serverUrl + "/mirath/result");
            }
        );  
    },

    getResultPage: function(req, res)
    {
        helper.requestApi(req, res, "/mirath/result", 
            function(content)
            {
                render.resultPage(req, res, content);
            }
        );    
    },

    getDetailPage: function(req, res)
    {
        render.detailPage(req,res);
    }
};

var render = {
    home: function(req, res, content)
    {
        res.render('mirath-home', { 
            title: "الميراث",
            navbar: navs,
            ayat: content          
        });
    },

    altarikaPage: function(req, res)
    {
        res.render('mirath-tarika', {
            title: "إدخال التركة",
            navbar: navs 
        });
    },

    alwrathaPage: function(req, res, content)
    {
        res.render('mirath-wratha', {
            title: "إدخال الورثة",
            navbar: navs,  
            listOfAlwartha: content
        });
    },

    resultPage: function(req, res, content)
    {
        res.render('mirath-result', { 
            title: 'اﻷنصبة',
            navbar: navs,          
            result: content
        });
    },

    detailPage: function(req, res, content)
    {
        res.render('mirath-detail', { 
            title: 'تفاصيل حساب اﻷنصبة',
            navbar: navs            
        });
    },
};
