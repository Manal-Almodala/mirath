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

var printPage = function(){
    // Hide elements that are not needed for printing 
    $("#appSummary").hide();
    $("#appNavs").hide();
    $("#buttons").hide();

    window.print();
}
