var mongoose = require('mongoose');

const navSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    url: {
        type: String,
        required: true,
    },
});

const navbarSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    navs: [navSchema]
});

mongoose.model('Navbar', navbarSchema, 'Navbars');

/* Example data 
{
	"name": "main",
	"navs":
	[
	    {
	        "name":"الميراث",
	        "url": "/mirath"  
	    },
	    {
	        "name":"إدخال الورثه",
	        "url": "/mirath/data-entry"
	    },
	    {
	        "name":"شاشة اﻷنصبه",
	        "url": "/mirath/result"
	    },
	    {
	        "name":"الشاشه الرئيسيه",
	        "url": "/"  
	    }
	]
}
*/
