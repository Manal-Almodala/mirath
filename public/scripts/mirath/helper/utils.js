var crossPageUtilities = {
    enableTooltips: function(){
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });
    },

    clearPlaceholder: function(selector, event){
        $(selector).on(event, function() {
            $(this).attr("placeholder", " ");
        });
    }, 
    
    toggleInputOnCheckboxChange: function(){
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
    }
};
module.exports = crossPageUtilities;