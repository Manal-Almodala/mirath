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

/* GET mirath page 1 */
module.exports.getFirstPage = function(req, res)
{
    renderFirstPage(req,res,)
};

function renderFirstPage(req, res, content){
    res.render('mirath-page1', { 
        pageHeader:{
        title: 'Loc8r',
        strapLine: 'Find places to work with wifi near you!'
        },
        sidebar: 'Looking for wifi and a seat?\n'
        + 'Loc8r helps you find places to work when out and about.'
        + 'Perhaps with coffee, cake or a pint?'
        + "Let Loc8r help find the place you're looking for."
    });
}