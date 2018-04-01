(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
var toArabicDigits = function() {
    var map = 
                [
                    "&\#1632;","&\#1633;","&\#1634;","&\#1635;","&\#1636;",
                    "&\#1637;","&\#1638;","&\#1639;","&\#1640;","&\#1641;"
                ];
 
    document.body.innerHTML = 
        document.body.innerHTML.replace(
            /\d(?=[^<>]*(<|$))/g, function($0){return map[$0];}
        );
};

function setActiveNav()
{
	// get current URL path and assign 'active' class
	var pathname = window.location.pathname;
	$('.nav-link[href="'+pathname+'"]').parent().addClass("active");
}

window.onload = toArabicDigits();

$(document).ready(setActiveNav()); 
},{}],2:[function(require,module,exports){
require("../general.js");

sessionStorage.clear();
  
},{"../general.js":1}]},{},[2]);
