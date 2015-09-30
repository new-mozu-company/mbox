/*
 ___________________________
|                           |
|       08-26-2015          |
|  Author: John Stamatakos  |  
|   New GA Tracking Code    |
|___________________________|

*/


function setGAdata() {
  var title;
  var GAdebug = false;
  //Check URL for 'gadebug'
  var url = window.location.href;
  if(window.location.href.indexOf('gadebug') != -1){
    GAdebug = true;
  }
  //Make div for GAdebug text
  if(GAdebug == true){
    jQuery( '<div class="gaDebugWindow" style="position: fixed; top: 0; left: 0; padding: .5em; color: #000; background: #BBB; font-size: 14px; z-index:1000;"></div>' ).appendTo( 'body' );
  }
  /*** Anchor Tags ***/
  jQuery('a').each(function() {
    /*If GA tracking attribute not present, create 
    it based on innerText, img alt tag, title, name, id, or href */ 
    if(!jQuery(this).attr("data-aData")){
      var text = jQuery(this).context.innerText.toLowerCase();
      text = text.replace(/[^\w\s]/gi, '');
      if(text != undefined && text.length > 1 && text.length < 75 && text != 'buy now' && text != 'request a consultation' && text != 'apply now' && text != 'sign up' && text != 'more info' && text.indexOf('read more') == -1 && text != 'learn more'){
        title = 'link_'+text;
      }
      else if(jQuery(this).attr("title")){
        title = 'link_'+jQuery(this).attr("title");
      }
      else if (jQuery(this).html().indexOf('<img')!=-1){
        title = 'link_'+jQuery(this).find('img').attr('alt')+ ' img';
      }
      else if(jQuery(this).attr("name")){
        title = 'link_'+jQuery(this).attr("name");
      }
      else if(jQuery(this).attr("id")){
        title = 'link_'+jQuery(this).attr("id");
      }
      else if(jQuery(this).attr("href")){
        title = 'link_'+jQuery(this).attr("href");
      }
      else{
        title = "link_NoTrackingData";
      }
      //Prepend navigation or footer to title of elements in those areas
      if (jQuery(this).closest(".top-bar").length>0 || jQuery(this).closest(".sliding-drawer").length>0 || jQuery(this).closest(".sticky-wrapper").length>0 || jQuery(this).closest("#main-nav").length>0){
        title = "navigation_"+title;
      }
      if (jQuery(this).closest("footer").length>0){
        title = "footer_"+title;
      }
      //Regex GA string
      title = title.replace(/\s/g , "-");
      //Set aData attribute
      jQuery(this).attr('data-aData',title);
    }
    if(GAdebug == true){
      jQuery(this).hover(
        function(){
          jQuery('.gaDebugWindow').text(jQuery(this).attr('data-aData'));
        }, function(){
          jQuery('.gaDebugWindow').text("");
        }
      );
    }
  });
  /*** Buttons ***/
  jQuery('button').each(function() {
    /*If GA tracking attribute not present, create 
    it based on innerText, img alt tag, title, name, or id */ 
    if(!jQuery(this).attr("data-aData")){
      var text = jQuery(this).context.innerText;
      if(text != undefined && text.length > 1 && text.length < 50){
        title = 'button_'+text;
      }
      else if (jQuery(this).html().indexOf('<img')!=-1){
        title = 'button_'+jQuery(this).find('img').attr('alt')+ ' img';
      }
      else if(jQuery(this).attr("title")){
        title = 'button_'+jQuery(this).attr("title");
      }
      else if(jQuery(this).attr("name")){
        title = 'button_'+jQuery(this).attr("name");
      }
      else if(jQuery(this).attr("id")){
        title = 'button_'+jQuery(this).attr("id");
      }
      else{
        title = "button_NoTrackingData";
      }
      //Prepend navigation or footer to title of elements in those areas
      if (jQuery(this).closest(".top-bar").length>0 || jQuery(this).closest(".sliding-drawer").length>0 || jQuery(this).closest(".sticky-wrapper").length>0 || jQuery(this).closest("#main-nav").length>0){
        title = "navigation_"+title;
      }
      if (jQuery(this).closest("footer").length>0){
        title = "footer_"+title;
      }
      //Regex GA string
      title = title.replace(/\s/g , "-");
      //Set aData attribute
      jQuery(this).attr('data-aData',title);
    }
    if(GAdebug == true){
      jQuery(this).hover(
        function(){
          jQuery('.gaDebugWindow').text(jQuery(this).attr('data-aData'));
        }, function(){
          jQuery('.gaDebugWindow').text("");
        }
      );
    }
  });
  /*** Selects ***/
  jQuery('select').each(function() {
    /*If GA tracking attribute not present, create 
    it based on name, id, or option:selected value */
    if(!jQuery(this).attr("data-aData")){
      if(jQuery(this).attr("name")){
        title = 'selectInput_'+jQuery(this).attr("name");
      }
      else if(jQuery(this).attr("ng-model")){
        title = 'selectInput_'+jQuery(this).attr("ng-model");
      }
      else if(jQuery(this).attr("id")){
        title = 'selectInput_'+jQuery(this).attr("id");
      }
      else if(jQuery("option:selected", this)){
        title = 'selectInput_'+jQuery("option:selected", this)[0].value;
      }
      else{
        title = "selectInput_NoTrackingData";
      }
      //Regex GA string
      title = title.replace(/\s/g , "-");
      //Set aData attribute
      jQuery(this).attr('data-aData',title);
    }
    if(GAdebug == true){
      jQuery(this).hover(
        function(){
          jQuery('.gaDebugWindow').text(jQuery(this).attr('data-aData'));
        }, function(){
          jQuery('.gaDebugWindow').text("");
        }
      );
    }
  });
  /*** Inputs ***/
  jQuery('input').each(function() {
    /* If GA tracking attribute not present, create 
    it based on name, title, id, or placeholder */
    if(!jQuery(this).attr("data-aData")){
      var type = jQuery(this).attr("type");
      if(type == undefined || type == ""){
        type = "unknownType";
      }
      if(jQuery(this).attr("name")){
        title = type+'Input_'+jQuery(this).attr("name");
      }
      else if(jQuery(this).attr("title")){
        title = type+'Input_'+jQuery(this).attr("title");
      }
      else if(jQuery(this).attr("id")){
        title = type+'Input_'+jQuery(this).attr("id");
      }
      else if(jQuery(this).attr("placeholder")){
        title = type+'Input_'+jQuery(this).attr("placeholder");
      }
      else{
        title = type+"Input_NoTrackingData";
      }
      //Regex GA string
      title = title.replace(/\s/g , "-");
      //Set aData attribute
      jQuery(this).attr('data-aData',title);
    }
    if(GAdebug == true){
      jQuery(this).hover(
        function(){
          jQuery('.gaDebugWindow').text(jQuery(this).attr('data-aData'));
        }, function(){
          jQuery('.gaDebugWindow').text("");
        }
      );
    }
  });  
   /*** FAQs ***/
  jQuery('.field-faq-column h3').each(function() {
    /* add GA data tag to FAQ elements */
    var text = jQuery(this).first().contents().text().substr(0,50);
    console.log(text);
    title = "faq_"+text;
    //Regex GA string
    title = title.replace(/\s/g , "-").replace(/\+/g, "");
    //Set aData attribute
    jQuery(this).find('a').attr('data-aData',title);
    if(GAdebug == true){
      jQuery(this).hover(
        function(){
          jQuery('.gaDebugWindow').text(jQuery(this).attr('data-aData'));
        }, function(){
          jQuery('.gaDebugWindow').text("");
        }
      );
    }
  });
  /*** Unordered Lists ***/
  jQuery('li').each(function() {
    //Only mark li elements with fancy select dropdown styles
    if(jQuery(this).attr('data-raw-value')){
      /* If GA tracking attribute not present, create 
      it based on name, title, id, or placeholder */
      if(!jQuery(this).attr("data-aData")){
        var text = jQuery(this).context.innerText;
        if(text != undefined && text.length > 1 && text.length < 50){
          title = 'li_'+text;
        }
        else if(jQuery(this).attr("data-raw-value")){
          title = 'li_'+jQuery(this).attr("data-raw-value");
        }
        else if(jQuery(this).attr("name")){
          title = 'li_'+jQuery(this).attr("name");
        }
        else if(jQuery(this).attr("title")){
          title = 'li_'+jQuery(this).attr("title");
        }
        else if(jQuery(this).attr("id")){
          title = 'li_'+jQuery(this).attr("id");
        }
        else{
          title = "li_NoTrackingData";
        }
        //Regex GA string
        title = title.replace(/\s/g , "-");
        //Set aData attribute
        jQuery(this).attr('data-aData',title);
      }
    }
    if(GAdebug == true){
      jQuery(this).hover(
        function(){
          jQuery('.gaDebugWindow').text(jQuery(this).attr('data-aData'));
        }, function(){
          jQuery('.gaDebugWindow').text("");
        }
      );
    }
  }); 
}

//Call setGAdata function on window load
//Calls again after 3 seconds to ensure that all elements are accounted for
jQuery(window).load(function(){ 
  setGAdata();
  setTimeout(setGAdata,3000);
});
