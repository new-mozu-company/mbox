(function($) {

  /* Input: Array options:  Array of JSON objects {selector, offset, callback, outOfViewCallback, retrigger}
            Bool executeOnLoad:   Force execution of scrollFire on load 
  */
Materialize.scrollFire = function(options, executeOnLoad) {
    'use strict';

    //keep track of last scroll pos so we can tell the scroll direction.
    var last_bottom_scroll_position = window.pageYOffset + window.innerHeight;
    var last_top_scroll_position = window.pageYOffset;
    var ticking = false;

    if(executeOnLoad){
      _onScroll(options, last_top_scroll_position, last_bottom_scroll_position, 'down');
    }

    window.addEventListener("scroll", function(e) {
      var curr_bottom_scroll_position = window.pageYOffset + window.innerHeight;
      var curr_top_scroll_position = window.pageYOffset;

      if (!ticking) {
        window.requestAnimationFrame(function() {

          // determine scroll direction
          var scroll_dir; 
          if(last_top_scroll_position < curr_top_scroll_position){
            scroll_dir = 'down';
          }else{
            scroll_dir = 'up';
          }

          _onScroll(options, curr_top_scroll_position, curr_bottom_scroll_position, scroll_dir);

          //reassign last scroll pos
          last_bottom_scroll_position = curr_bottom_scroll_position;
          last_top_scroll_position = curr_top_scroll_position;
          ticking = false;
        });
      }
      ticking = true;
    });

    ///////////////////////

    function _onScroll(options, window_top, window_bottom, scroll_dir){
      for(var i = 0; i < options.length; i++){
        var value = options[i];
        var selector = value.selector,
            offset = value.offset,
            callback = value.callback,
            outOfViewCallback = value.outOfViewCallback,
            retrigger = value.retrigger || false

        if(value.done && !retrigger){ // if triggered and no need to retrigger
          continue;
        }

        var currentElement = document.querySelector(selector);
        if(currentElement === null) continue; // if no element found, bye.

        // get elements top and bottom position
        var elementTopOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;
        var elementBottomOffset = currentElement.getBoundingClientRect().bottom + window.pageYOffset;

        // if its visibly in view and its already triggered, don't mess with it;
        if(value.done && (window_bottom > elementTopOffset && window_top < elementBottomOffset)){
          continue;
        }

        if(scroll_dir === 'down'){ //scrolling DOWN, set trigger offset from top
          // come into view trigger point
          if((window_bottom > (elementTopOffset + offset)) && window_top < (elementTopOffset)){
            _inViewTrigger(value, callback);
          }else{ // out of view
            _outOfView(value, outOfViewCallback, retrigger);
          }

        }else{ // scrolling UP, set trigger offset from bottom
          // come into view trigger point
          if((window_top < elementBottomOffset - offset) && window_bottom > elementBottomOffset){
            _inViewTrigger(value, callback);
          }else{ // out of view
            _outOfView(value, outOfViewCallback, retrigger);
          }

        }
      }
    }

    // execute when item is in view
    function _inViewTrigger(value, callback){
      value.oovDone = false;

      if(value.done !== true){
        if(typeof(callback) === 'function'){
          callback.call(this);
        }else if(typeof(callback) === 'string'){
          var callbackFunc = new Function(callback);
          callbackFunc();
        }
        value.done = true;
      }
    }

    // execute when item is out of view
    function _outOfView(value, callback, retrigger){
      //if we want to be able to retrigger the inview callback
      if(retrigger){
        value.done = false;
      }

      //if theres an out of view callback, and it needs called
      if(value.oovDone !== true){
        if(typeof(callback) === 'function'){
          callback.call(this);
        }else if(typeof(callback) === 'string'){
          var callbackFn = new Function(callback);
          callbackFn();
        }

        value.oovDone = true;
      }
    }
  };

})(jQuery);