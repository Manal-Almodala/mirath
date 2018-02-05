const request = require('request');

module.exports = {
    getNavbar: function(req, res, name)
    {
        var requestOptions, apiUri;
        apiUri = apiOptions.server + '/api/navbar/' + name;
        requestOptions = {
            method: 'GET',
            json: {},
            qs: {}
        }
    
        request(apiUri, requestOptions, 
            function(error, response, navbar)
            {
                if(response.statusCode === 200){
                    return navbar.navs;
                }
                else
                {
                    res.render('error', error);
                }
            }
        );    
    },
};

var apiOptions = {
    get server() 
    {
        if (process.env.NODE_ENV !== 'production')  
            return "http://localhost:3000";
        else
            return "https://estihgagat.herokuapp.com";      
    }           
};



