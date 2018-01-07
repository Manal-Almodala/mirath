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
                    render.dataPage(req, res, listOfAlwratha);
                }
                else
                {
                    console.log("API returned an error");
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
                    console.log("API returned an error");
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
                    console.log("API returned an error");
                }
            }
        );    
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

    resultPage: function(req, res, mirathResult)
    {
        res.render('mirath-result', { 
            pageHeader:{
                title: 'اﻷنصبه',
            },
            items: navItems,            
            result: mirathResult
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
