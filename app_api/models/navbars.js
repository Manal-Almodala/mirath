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
	"name": "mirath",
	"navs":
	[
	    {
	        "name":"الميراث",
	        "url": "/mirath"  
	    },
	    {
	        "name":"إدخال التركة",
	        "url": "/mirath/altarika"
        },
        {
	        "name":"إدخال الورثة",
	        "url": "/mirath/alwratha"
	    },
	    {
	        "name":"شاشة اﻷنصبة",
	        "url": "/mirath/result"
	    },
	    {
	        "name":"الشاشة الرئيسية",
	        "url": "/"  
	    }
	]
}

{
	"name": "main",
	"navs":
	[
		{
            "name":"الشاشة الرئيسية",
            "url": "/"  
        },        
        {
            "name":"الميراث",
            "url": "/mirath"
        },
        {
            "name":"الزكاة",
            "url": "/zakah"
        },
        {
        	"name":"الديات",
            "url": "/deya"
        },
        {
            "name":"الفيء",
            "url": "/faye'"
        },
        {
            "name":"عن البرنامج",
            "url": "/about"  
		},
	]
}
*/
