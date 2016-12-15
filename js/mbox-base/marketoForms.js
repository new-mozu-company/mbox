// *************************
// Marketo Form Formater
// Katie Garcia 06/2015
// *************************
//
// USAGE
// -------
// Add this script to your html, adjusting the options to fit your needs.
// You do not need to include Marketo embed code. Just add the form ID in the options below.
// <div class="marketo-form-x marketo-form"></div>
// <script>
// jQuery(document).ready(function(){
//     formatForm.init({
//         formContainerClass: 'marketo-form-x',
//         formMarketoID: '32',
//         onSubmitShowClass: 'marketo-form-thank-you',
//         onSubmitHideClass: 'mktoForm',
//         dataLayerOnOff: true,
//         dataLayerEvent: 'track',
//         dataLayerEventWhat: 'Lead Form Submitted',
//         dataLayerEventWhere: 'Main Content',
//         dataLayerEventHow: 'Click Submit',
//         dataLayerContactType: 'Partner',
//         dataLayerContactTypeFieldID: '#Inquiry_type__c',
//         onLoadFunction: null,
//         onSubmitFunction: null
//     });
// });
// </script>
//
// OPTIONS
// -------
// formContainerClass:  form wrapper class; default is 'marketo-form'
// formMarketoID:       id of form coming from marketo; default is 32
// onSubmitShowClass:   wrapper class around thank you message; default is 'marketo-form-thank-you'
// onSubmitHideClass:   wrapper class around form or form container you want to hide on submit; default is 'mktoForm'
// dataLayerOnOff:      whether to push to dataLayer; default is true
// dataLayerEvent:      populates 'event' in dataLayer; default is 'track'
// dataLayerEventWhat:  populates 'eventWhat' in dataLayer; default is 'Lead Form Submitted'
// dataLayerEventWhere: populates 'eventWhere' in dataLayer; default is 'Main Content'
// dataLayerEventHow:   populates 'eventHow' in dataLayer; default is 'Click Submit'
// dataLayerContactType: optional; static value to populate 'contactType' in dataLayer; default is null
// dataLayerContactTypeFieldID: optional; dynamic value from field with this ID to populate 'contactType' in dataLayer; default is null
// onLoadFunction: accepts function to be run once form is fully loaded on page; default is null
// onSubmitFunction: accepts function to be run once form is submitted; defualt is null
//

formatForm = (function(){
    var s = {
        setOptions: function (options) {
            var options = options || {};
            var formContainerClass = options.formContainerClass || 'marketo-form';
            var formMarketoID = options.formMarketoID || '32';
            var onSubmitShowClass = options.onSubmitShowClass || 'marketo-form-thank-you';
            var onSubmitHideClass = options.onSubmitHideClass || 'mktoForm';
            var dataLayerOnOff = options.dataLayerOnOff || true;
            var dataLayerEvent = options.dataLayerEvent || 'track';
            var dataLayerEventWhat = options.dataLayerEventWhat || 'Lead Form Submitted';
            var dataLayerEventWhere = options.dataLayerEventWhere || 'Main Content';
            var dataLayerEventHow = options.dataLayerEventHow || 'Click Submit';
            var dataLayerContactType = options.dataLayerContactType || null;
            var dataLayerContactTypeFieldID = options.dataLayerContactTypeFieldID || null;
            var onLoadFunction = options.onLoadFunction || null;
            var onSubmitFunction = options.onSubmitFunction || null;
            return options;
        }
    };
    //if not using https, prepend script links with "https"
    var currURL = [location.protocol, '//', location.host, location.pathname].join('');
    var newProtocol = "";
    var currProtocol = window.location.protocol;
    if (currProtocol != "https:") {
        newProtocol = "https:";
    }
    //init function
    my = {};
    my.init = function(options) {
        s.setOptions(options);

        //BASIC MARKETO SETUP
        // 0. hide thank you message
        hideThankYou(options);
        // 1. load marketo script forms2.min.js
        loadMarketoScript(options);
        // 2. wait for marketo script to load
        // 3. add html form element
        // 4. call MktoForms2.loadForm
        // 5. on form load, swap select menus
        // 6. on form submit, show thank you message
        // 7. on from submit, write to data layer
    }
    hideThankYou = function(options){
        var thankYouArray = document.getElementsByClassName(options.onSubmitShowClass);
        for (index=0; index<thankYouArray.length; index++) {
            thankYouArray[index].style.display = 'none';
        }
    }
    loadMarketoScript = function(options){
        //load marketo forms2.js
        jQuery.getScript(newProtocol+"//app-ab17.marketo.com/js/forms2/js/forms2.min.js", function() {
            postLoadFunctions(options);
        });
    }
    postLoadFunctions = function(options) {
        //add html for form shell with form id from custom attribute
        addFormCode(options);
        //call marketo loadForm method with id from custom attribute
        callFormMethod(options);
    }
    addFormCode = function(options){
        var classArray = document.getElementsByClassName(options.formContainerClass);
        if (typeof classArray !== 'undefined' && classArray.length > 0) {
            for (index=0; index<classArray.length; index++) {
                var currElem = classArray[index];
                currElem.innerHTML = currElem.innerHTML + "<form id='mktoForm_"+options.formMarketoID+"'></form>";
            }
        }
    }
    callFormMethod = function(options){
        MktoForms2.loadForm(newProtocol+"//app-ab17.marketo.com", "032-GWP-783", options.formMarketoID, function(form){
            //OnLoad actions
            removeColons();
            //removePlaceholders();
            swapSelectMenu(options);
            if (options.onLoadFunction!=null && options.onLoadFunction!='') {
                options.onLoadFunction();
            }


            //OnSuccess actions
            form.onSuccess(function(values, followUpUrl){
                //push to data layer
                if (options.dataLayerOnOff != false){
                    pushDataLayer(options);
                }
                //if follow up url exists, redirect to that url
                if (followUpUrl.indexOf(currURL) == -1) {
                    window.location = followUpUrl;
                } else {
                    //show thank you messgae
                    showThankYou(options);
                }
                if (options.onSubmitFunction!=null && options.onSubmitFunction!='') {
                    options.onSubmitFunction();
                }
                //prevent default behavior
                return false;
            });
        });
    }
    removePlaceholders = function(){
        var placeholderArray = document.getElementsByTagName('input');
        for (index=0; index<placeholderArray.length; index++) {
            placeholderArray[index].placeholder = "";
        }
    }
    removeColons = function(){
        var labelArray = document.getElementsByClassName('mktoLabel');
        for (index=0; index<labelArray.length; index++) {
            labelArray[index].innerHTML = labelArray[index].innerHTML.replace(':','');
        }
    }
    swapSelectMenu = function(options){
        var formName = "mktoForm_" + options.formMarketoID;
        var selectsArray = document.forms[formName].getElementsByTagName("select");
        if (typeof selectsArray !== 'undefined' && selectsArray.length > 0) {
                for (index=0; index<selectsArray.length; index++) {
                var currElem = selectsArray[index];
                currElem.className = currElem.className + " fancy-select";
            }
        }
        jQuery('.fancy-select').fancySelect();
    }
    showThankYou = function(options){
        //var formElemID = "mktoForm_" + options.formMarketoID;
        //jQuery("#"+formElemID).hide(300);
        var showClassName = options.onSubmitShowClass;
        var hideClassName = options.onSubmitHideClass;
        jQuery("."+hideClassName).hide(300);
        jQuery("."+showClassName).show(300);
    }
    pushDataLayer = function(options) {
        var formElemID = "#mktoForm_" + options.formMarketoID;
        var contactType = options.dataLayerContactType;
        var contactTypeID = options.dataLayerContactTypeFieldID;
        var contactTypeVal;
        //if contact type is not empty or null, populate data layer with its value
        //else if contact type field id is not empty or null, get value and populate data layer
        //else populate data layer with contactType = ''
        if (contactType!=null && contactType!='') {
            contactTypeVal = contactType;
        }
        else if (contactTypeID!=null && contactTypeID!='') {
            //add # if not present
            if (contactTypeID.substring(0, 1) != "#") {
                contactTypeID="#"+contactTypeID;
            }
            //get value from field
            contactTypeVal=jQuery(formElemID+" "+contactTypeID).val();
        } else {
            contactTypeVal = "";
        }

        dataLayer.push({
            'event': options.dataLayerEvent,
            'eventWhat': options.dataLayerEventWhat,
            'eventWhere': options.dataLayerEventWhere,
            'eventHow': options.dataLayerEventHow,
            'contactType': contactTypeVal
        });
    }

    return my;

}());

