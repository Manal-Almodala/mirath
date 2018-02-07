const request = require('request');

module.exports = {
    get serverUrl() 
    {
        if (process.env.NODE_ENV !== 'production')  
            return "http://localhost:3000";
        else
            return "https://estihgagat.herokuapp.com";      
    },

    requestApi: function(req, res, route, callBack)
    {
        var requestOptions, apiUri;
        apiUri = serverUrl + '/api' + route;
        requestOptions = {
            method: req.method,
            json: req.body,
            qs: req.params
        }
    
        request(apiUri, requestOptions, 
            function(error, response)
            {
                if(response.statusCode <= 204){
                    callBack(response.body);
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
         
};



