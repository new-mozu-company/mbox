// ------------
// Class Toggler
// ------------
// Lets you create clickable elements that add and remove classes targeted elements on click
// Katie Garcia 05/2015

// ------------
// Example
// ------------
// Trigger:
// <a class="js-class-toggler" data-target-class="targetme" data-toggle-class="active">Click Me</a>
// Target Element:
// <div class="targetme"></div>

var classTogglerModule = {
    toggleFunction: function(){
      jQuery('.js-class-toggler').removeAttr("href");
      jQuery('.js-class-toggler').click(function(e) {
        var classToTarget = jQuery(this).data("targetClass");
        var classToAdd = jQuery(this).data("toggleClass");
        if(classToTarget){
            jQuery('.'+classToTarget).toggleClass(classToAdd);
        }
      });
    },
    initializeModule: function() {
      classTogglerModule.toggleFunction();
    }
};
classTogglerModule.initializeModule();
