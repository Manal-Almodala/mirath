const formValidation =  require("./helper/validation.js");
const Form = require("./helper/form.js");
const utils  = require("./helper/utils.js");

utils.enableTooltips();
utils.clearPlaceholder("input[placeholder=0]", "focus");
utils.toggleInputOnCheckboxChange();

var wratha = new Form("wrathaForm");
// Error message to be displayed when an empty wratha form is submitted  
wratha.emptyFormMsg = "الرجاء إدخال معلومات الورثة!";
// Error message to be displayed when user submits invalid wratha counts   
wratha.invalidDataMsg = "تأكد من إدخال عدد كل من الورثة باﻷرقام!";
// When the user returns to page by clicking back button 
// This restores the data that had been entered by user 
wratha.restoreState();

formValidation.onSubmit(wratha);

$("input[aria-label='زوج']").change(function() {
    if(this.checked)
    {
        $("input[name='زوجه']").val(0);
        $("input[aria-label='زوجه']").prop("checked", false);
        $("input[name='زوجه']").attr("disabled", true);
    }  
});

$("input[aria-label='زوجه']").change(function() {
    if(this.checked)
    {
        $("input[aria-label='زوج']").prop("checked", false);
    }  
});