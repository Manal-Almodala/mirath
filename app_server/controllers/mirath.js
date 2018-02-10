const request = require('request');
const helper = require("./helper");

var isAltarikaProcessed = false;
var navs = [];

module.exports = 
{
    getHome: function(req, res)
    {
        helper.requestApi(req, res, "/navbar/mirath", function(content){
            navs = content.navs;
            render.home(req, res);
        });
    },

    getDataPage: function(req, res)
    {
        helper.requestApi(req, res, "/mirath/alwratha", function(content){
            render.dataPage(req, res, content);
            isAltarikaProcessed = false;
        });
    },

    processAltarikaData: function(req, res)
    { 
        helper.requestApi(req, res, "/mirath/altarika", function(content){
            isAltarikaProcessed = true;
            res.redirect("back");
        });  
    },

    processAlwrathaData: function(req, res)
    { 
        helper.requestApi(req, res, "/mirath/alwratha", function(content){
            res.redirect(helper.serverUrl + "/mirath/result");
        });  
    },

    getResultPage: function(req, res)
    {
        helper.requestApi(req, res, "/mirath/result", function(content){
            render.resultPage(req, res, content);
        });    
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
}
