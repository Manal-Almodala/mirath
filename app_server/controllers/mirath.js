const request = require('request');
const helper = require("./helper");

var isAltarikaProcessed = false;
var navs = [];

module.exports = 
{
    getHome: function(req, res)
    {
        helper.requestApi(req, res, "/navbar/mirath", function(navbar){
            navs = navbar.navs;

            helper.requestApi(req, res, "/ayat/mirath", 
                function(ayat)
                {
                    //render.home(req, res, ayat);
                }
            );
        });
    },

    getDataPage: function(req, res)
    {
        helper.requestApi(req, res, "/mirath/alwratha", 
            function(content)
            {
                render.dataPage(req, res, content);
                isAltarikaProcessed = false;
            }
        );
    },

    processAltarikaData: function(req, res)
    { 
        helper.requestApi(req, res, "/mirath/altarika", 
            function(content)
            {
                isAltarikaProcessed = true;
                res.redirect("back");
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
            navbar: navs           
        });
    },

    dataPage: function(req, res, content)
    {
        res.render('mirath-data', {
            title: "إدخال الورثه",
            navbar: navs,  
            listOfAlwartha: content,
            isAltarikaProcessed: isAltarikaProcessed
        });
    },

    resultPage: function(req, res, content)
    {
        res.render('mirath-result', { 
            title: 'اﻷنصبه',
            navbar: navs,          
            result: content
        });
    },

    detailPage: function(req, res, content)
    {
        res.render('mirath-detail', { 
            pageHeader:{
                title: 'تفاصيل حساب اﻷنصبه',
            },
            navbar: content.navbar            
        });
    },
};

function requstAya(req, res, ayaNumber, callback)
{
    const quranApi = "http://api.alquran.cloud/ayah/";
    var requestOptions, uri;
    uri = quranApi + ayaNumber[0] + ":" + ayaNumber[1];
    requestOptions = {
        method: req.method,
        json: req.body,
        qs: req.params
    }    
    
    request(apiUri, requestOptions, 
        function(error, response)
        {
            if(response.statusCode <= 204){
                callBack(response.body.text);
            }
            else
            {
                res.render('error', error);
            }
        }
    );    
};

function getAyat(req, res, ayatNumbers)
{
    for(ayaNumber in ayatNumbers)
    {
        requstAya(req,res, ayaNumber, 
            function(aya)
            {
                console.log(aya);
            }
        );
    }
}
