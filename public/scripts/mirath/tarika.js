const formValidation =  require("./helper/validation.js");
const Form = require("./helper/form.js");
const utils  = require("./helper/utils.js");

utils.enableTooltips();
utils.clearPlaceholder("input[placeholder=0]", "focus");
utils.toggleInputOnCheckboxChange();

var tarika = new Form("tarikaForm");
// Error message to be displayed when an empty tarika form is submitted  
tarika.emptyFormMsg = "الرجاء إدخال تفاصيل التركة!";
// Error message to be displayed when user submits invalid tarika data   
tarika.invalidDataMsg = "تأكد من إدخال تفاصيل التركة باﻷرقام!";

formValidation.onSubmit(tarika);






/*
$("#submitTarika").on("click", function(){
    var tarikaHtml = $("#tarikaForm").html();
    localStorage.setItem("tarika", tarikaHtml);
});

$(document).ready(function(){
    var tarikaHtml = localStorage.getItem("tarika");
    if(tarikaHtml != null)
    {
        $("#tarikaForm").html(tarikaHtml);
    }
}); 
*/