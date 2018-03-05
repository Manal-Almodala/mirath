const formValidation =  require("./helper/validation.js");
const Form = require("./helper/form.js");

var alwratha = new Form("alwrathaData");
var altarika = new Form("altarikaData");

formValidation.onSubmit(alwratha);
formValidation.onSubmit(altarika);

$("input[type='checkbox']").change(function() {
    if(this.checked)
    {
        $(this).closest("span").siblings().last().attr("disabled", false);
    }  
    else
    {
        $(this).closest("span").siblings().last().val(0);
        $(this).closest("span").siblings().last().attr("disabled", true);  
    }
});

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

