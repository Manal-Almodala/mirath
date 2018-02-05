var request = require('request');
require("./helper");

var isAltarikaProcessed = false;

module.exports = 
{
    getHome: function(req, res)
    {
        var content = {};
        content.navbar = getNavbar(req, res,"main")
        render.home(req,res, content);
    },

    getDataPage: function(req, res)
    {
        var requestOptions, apiUri;
        apiUri = apiOptions.server + '/api/mirath/alwratha';
        requestOptions = {
            method: 'GET',
            json: {},
            qs: {}
        }
        
        request(apiUri, requestOptions, 
            function(error, response, listOfAlwratha)
            {
                if(response.statusCode === 200){
                    render.dataPage(req, res, listOfAlwratha, 
                                    isAltarikaProcessed);
                    isAltarikaProcessed = false;
                }
                else
                {
                    res.render('error', error);
                }
            }
        );    
    },

    processAltarikaData: function(req, res)
    { 
        var requestOptions, apiUri;
        apiUri = apiOptions.server + '/api/mirath/altarika';
        requestOptions = {
            method: 'POST',
            json: req.body,
            qs: {}
        }
        
        request(apiUri, requestOptions, 
            function(error, response)
            {
                if(response.statusCode === 201){
                    isAltarikaProcessed = true;
                    res.redirect("back");
                }
                else
                {
                    res.render('error', error);
                }
            }
        );    
    },

    processAlwrathaData: function(req, res)
    { 
        var requestOptions, apiUri;
        apiUri = apiOptions.server + '/api/mirath/alwratha';
        requestOptions = {
            method: 'POST',
            json: req.body,
            qs: {}
        }
        
        request(apiUri, requestOptions, 
            function(error, response)
            {
                if(response.statusCode === 201){
                    res.redirect(apiOptions.server + "/mirath/result")
                }
                else
                {
                    res.render('error', error);
                }
            }
        );    
    },

    getResultPage: function(req, res)
    {
        var requestOptions, apiUri;
        apiUri = apiOptions.server + '/api/mirath/result';
        requestOptions = {
            method: 'GET',
            json: {},
            qs: {}
        }
        
        request(apiUri, requestOptions, 
            function(error, response, mirathResult)
            {
                if(response.statusCode === 200){
                    render.resultPage(req, res, mirathResult);
                }
                else
                {
                    res.render('error', error);
                }
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
            navbar: content.navbar           
        });
    },

    dataPage: function(req, res, content)
    {
        res.render('mirath-data', {
            title: "إدخال الورثه",
            navbar: content.navbar,  
            listOfAlwartha: content.alwratha,
            isAltarikaProcessed: isAltarikaProcessed
        });
    },

    resultPage: function(req, res, content)
    {
        res.render('mirath-result', { 
            pageHeader:{
                title: 'اﻷنصبه',
            },
            navbar: content.navbar,          
            result: content.mirathResult
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
}
