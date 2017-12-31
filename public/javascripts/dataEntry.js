$("#alwrathaData").submit(function(event) {
   event.preventDefault();
});

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





