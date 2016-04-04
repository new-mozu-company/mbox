//begin custom materialboxgallery
(function($) {


  $.fn.materialboxgallery = function() {

    var overlayActive = false;
    var doneAnimating = true;
    var inDuration = 350;
    var outDuration = 250;
    var imageArray = $('.materialboxedgallery');
    var touchTarget = $('.touch .materialboxedgallery');
		var touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
    var placeholder = $('<div></div>').addClass('material-placeholder');
    var nextBtn = $('<a href="#" class="gallery-btn gallery-next">Next</a>');
    var prevBtn = $('<a href="#" class="gallery-btn gallery-prev">Prev</a>');
    var originalWidth = 0;
    var originalHeight = 0;
    var ancestorObject;
    var currGallery;
    var currImageIndex;
    var prevImageIndex;
    var prevImage;
    var nextImageIndex;
    var nextImage;


    this.each(function() {
      if ($(this).hasClass('initialized')) {
        return;
      }
      $(this).addClass('initialized');
      $(this).wrap(placeholder);
    });//each

    /*****************************
    * *   TRIGGERS    * *
    ******************************/
    //Open image on click
    imageArray.each(function( index ) {
      $(this).on('click', function(){
        if ( $(this).hasClass( "active" ) ) {
          closeEverything($(this));
        } else {
          openEveything($(this));
        }
      });
    });

    // Return on ESC
    $(document).keyup(function(e) {
      if (e.keyCode === 27 && doneAnimating === true) { // ESC key
        if (overlayActive) {
          var currImage = getActiveImage();
          closeImage(currImage);
          removeOverlay();
          removeBtns();
        }
      }
    });

    // Return on x button click or touch
    $("body").on('touchstart', '#materialbox-close', function (e) {
      $( "#materialbox-close" ).trigger( "click" );
    });

    $("body").on('click', '#materialbox-close', function (e) {
      if (overlayActive) {
        var currImage = getActiveImage();
        closeImage(currImage);
        removeOverlay();
        removeBtns();
      }
    });

    //Advance on "next" button click
    $("body").on('click', '.gallery-next', function (e) {
      advanceToNext();
    });

    //Retreat on "prev" button click
    $("body").on('click', '.gallery-prev', function (e) {
      retreatToPrev();
    });

    //Swipe left and right
    touchTarget.hammer().on("panend", function(e) {
        var direction = e.gesture.direction;
        if ($('#materialbox-overlay')) {         
          if (direction == 2) {
            //alert('swiped left');
            advanceToNext();
          } else if (direction == 4) {
            //alert('swiperd right');
            retreatToPrev();
          }
        }
    });

    /*****************************
    * *   Helper Functions    * *
    ******************************/
    //Advance to next
    function advanceToNext(){
      var currImage = getActiveImage();
      
      getCurrIndices(currImage);

      if (nextImage.length > 0) {
        closeImage(currImage);
        waitForIt(nextImage);
      } else {
        closeEverything(currImage);
      }
    }

    //Retreat to previous
    function retreatToPrev(){
      var currImage = getActiveImage();
      
      getCurrIndices(currImage);

      if ((prevImage.length > 0) && (currImageIndex >= 0)) {
        closeImage(currImage,'right');
        waitForIt(prevImage, 'left');
      } else {
        closeEverything(currImage);
      }
    }

    //waitForIt
    function waitForIt(forWhat, fromDirection){
      if (doneAnimating == false) {
          setTimeout(function(){
            waitForIt(forWhat, fromDirection)
          },100);
      } else {
        openImage(forWhat, fromDirection);
      };
    }//waitForIt

    //Get Active Image
    function getActiveImage(){
      return $( '.materialboxedgallery.active' );
    }

    //Get Active Gallery
    function getActiveGallery(currImage){
      var currGallery = $(currImage).closest('[data-gallery]').data("gallery");
      return currGallery;
    }

    function closeEverything(currImage){
      closeImage(currImage);
      removeOverlay();
      removeBtns();
    }

    function openEveything(currImage){
      openImage(currImage);
      addOverlay();
      addBtns();
    }

    function updateAncestor(currAncestorsChanged){
      ancestorObject = currAncestorsChanged;
      return ancestorObject;
    }

    function getBtnStatus(currImage){

      getCurrIndices(currImage);
      
      if (nextImage.length <= 0) {
        nextBtn.hide();
      } else {
        nextBtn.show();
      }
      
      if ((prevImage.length <= 0) || (currImageIndex == 0)) {
        prevBtn.hide();
      } else {
        prevBtn.show();
      }
    }

    function getCurrIndices(currImage){
      currGallery = getActiveGallery(currImage);
      currImageIndex = $("[data-gallery='"+currGallery+"'] .materialboxedgallery" ).index(currImage);
      prevImageIndex = currImageIndex - 1;
      prevImage = $("[data-gallery='"+currGallery+"'] .materialboxedgallery:eq("+prevImageIndex+")");
      nextImageIndex = currImageIndex + 1;
      nextImage = $("[data-gallery='"+currGallery+"'] .materialboxedgallery:eq("+nextImageIndex+")");
    }

    /*****************************
    * *   Functions    * *
    ******************************/

    function openImage(currImage, fromDirection){

      var origin = currImage;
      var ancestorsChanged;
      var ancestor;
      var placeholder = origin.parent('.material-placeholder');
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var originalWidth = origin.width();
      var originalHeight = origin.height();
      if (!fromDirection) {
      	fromDirection = 'right';
      }

      // Set states
      origin.addClass('active');
      
      // Set positioning for placeholder
      placeholder.css({ 
        width: placeholder[0].getBoundingClientRect().width, 
        height: placeholder[0].getBoundingClientRect().height,
        position: 'relative', top: 0, left: 0
      });

      //Check next/prev btn status and hide if one should be inactive
      getBtnStatus(origin);

      // Find ancestor with overflow: hidden; and remove it
      ancestorsChanged = undefined;
      ancestor = placeholder[0].parentNode;
      var count = 0;
      while (ancestor !== null && !$(ancestor).is(document)) {
        var curr = $(ancestor);
        if (curr.css('overflow') === 'hidden') {
          curr.css('overflow', 'visible');
          if (ancestorsChanged === undefined) {
            ancestorsChanged = curr;
          } else {
            ancestorsChanged = ancestorsChanged.add(curr);
          }
        }
        ancestor = ancestor.parentNode;
      }
      updateAncestor(ancestorsChanged);

      // Set css on origin
      origin.css({
        position: 'fixed',
        'z-index': 1000
      });
      origin.data('width', originalWidth);
      origin.data('height', originalHeight);

      // Add and animate caption if it exists
      if (origin.data('caption') !== "") {
        var $photo_caption = $('<div class="materialbox-caption"></div>');
        $photo_caption.text(origin.data('caption'));
        $('body').append($photo_caption);
        $photo_caption.css({
          "display": "inline"
        });
        $photo_caption.velocity({
          opacity: 1
        }, {
          duration: inDuration,
          queue: false,
          easing: 'easeOutQuad'
        });
      }

      // Resize Image
      var ratio = 0;
      var widthPercent = originalWidth / windowWidth;
      var heightPercent = originalHeight / windowHeight;
      var newWidth = 0;
      var newHeight = 0;

      if (widthPercent > heightPercent) {
        ratio = originalHeight / originalWidth;
        newWidth = windowWidth * 0.9;
        newHeight = windowWidth * 0.9 * ratio;
      } else {
        ratio = originalWidth / originalHeight;
        newWidth = (windowHeight * 0.9) * ratio;
        newHeight = windowHeight * 0.9;
      }

      var leftPos =  (windowWidth - newWidth) / 2;
      var topPos =  (windowHeight - newHeight) / 2;

      var leftPosOrigin;
      
      if (fromDirection == 'left') {
      	leftPosOrigin =  ((-1) * originalWidth) + 'px';
      } else {
      	leftPosOrigin =  windowWidth;
      }

      // Add and animate x btn
      var $xBtn = $('<i id="materialbox-close" class="material-icons">close</i>');
			$('body').append($xBtn);
      $xBtn.css({
      	opacity : 0,
        "display": "fixed",
        bottom: topPos + newHeight + "px",
        left: leftPos + newWidth + "px",
        color: "white"
      });
      $xBtn.velocity({
        opacity: 1
      }, {
        duration: inDuration,
        queue: false,
        easing: 'easeOutQuad'
      });


      // Animate image + set z-index
      if (origin.hasClass('responsive-img')) {
        origin.velocity({
          'max-width': newWidth,
          'width': originalWidth
        }, {
          duration: 0,
          queue: false,
          complete: function() {
            origin.css({ 
              height: originalHeight, 
              width: originalWidth, 
              left: leftPosOrigin, 
              top: ((windowHeight - originalHeight) / 2)
            }).velocity({ 
              height: newHeight, 
              width: newWidth, 
              left: leftPos, 
              top: topPos
            }, {
              duration: inDuration,
              queue: false,
              easing: 'easeOutQuad',
              complete: function() {
              }
            });
          } // End Complete
        }); // End Velocity
      } else {
        origin.css({ 
          height: originalHeight, 
          width: originalWidth, 
          left: leftPosOrigin, 
          top: ((windowHeight - originalHeight) / 2)
        }).velocity({ 
          height: newHeight, 
          width: newWidth, 
          left: leftPos, 
          top: topPos
        }, {
          duration: inDuration,
          queue: false,
          easing: 'easeOutQuad',
          complete: function() {}
        }); // End Velocity
      }
      
    }// End openImage

    // This function returns the modaled image to the original spot
    function closeImage(currImage, toDirection){

      var origin = currImage;
      var ancestorsChanged = ancestorObject;
      var ancestor;
      var placeholder = origin.parent('.material-placeholder');
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var originalWidth = origin.data('width');
      var originalHeight = origin.data('height');
      if (!toDirection) {
      	toDirection = 'left';
      }

      origin.velocity("stop", true);
      doneAnimating = false;

      var leftPosEnd;
      if (toDirection == 'right') {
      	leftPosEnd = windowWidth
	    } else {
	    	leftPosEnd = (-1) * (originalWidth);
	    }
      
      // Resize Image
      origin.velocity({
        width: originalWidth,
        height: originalHeight,
        left: leftPosEnd,
        top: ((windowHeight - originalHeight) / 2),
        opacity: 0
      },{ 
        duration: outDuration,
        queue: false,
        easing: 'easeOutQuad'
      });

      // Remove Caption + reset css settings on image
      $('#materialbox-close').velocity("stop", true);
      $('#materialbox-close').velocity({ opacity: 0 });
      $('.materialbox-caption').velocity("stop", true);
      $('.materialbox-caption').velocity({ opacity: 0 },
      {
        duration: outDuration, // Delay prevents animation overlapping
        queue: false,
        easing: 'easeOutQuad',
        complete: function() {
          placeholder.css({ 
            height: '',
            width: '',
            position: '',
            top: '',
            left: ''
          });
          origin.css({ 
            height: '',
            top: '',
            left: '',
            width: '',
            'max-width': '',
            position: '',
            'z-index': '',
            opacity: ''
          });
          // Remove class
          origin.removeClass('active');
          $(this).remove();
          $('#materialbox-close').remove();

          // Remove overflow overrides on ancestors
          if (ancestorsChanged) {
	          $.each(ancestorsChanged, function( index, value ) {
	            $(this).css('overflow', '');
	          });
	          updateAncestor('');
	        }

          doneAnimating = true;
        }//complete
      });
      
    }//closeImage

    // Add overlay
    function addOverlay(){
      overlayActive = true;
      var overlay = $('<div id="materialbox-overlay"></div>')
        .css({
          opacity: 0
        })
        .click(function() {
          var currImage = getActiveImage();
          closeImage(currImage);
          removeOverlay();
          removeBtns();
        });
      // Animate Overlay
      $('body').append(overlay);
      overlay.velocity({
        opacity: 1
      }, {
        duration: inDuration,
        queue: false,
        easing: 'easeOutQuad'
      });
      return overlayActive;
    }//addOverlay

    function addBtns(){
      nextBtn.css({
        opacity: 0,
        position: 'fixed',
        right:0, top: '50%',
        zIndex: 1000
      });

      prevBtn.css({
        opacity: 0,
        position: 'fixed', left:0, top: '50%',
        zIndex: 1000
      });

      //Animate buttons in
      $('body').append(nextBtn);
      nextBtn.velocity({
        opacity: 1
      }, {
        duration: inDuration,
        queue: false,
        easing: 'easeOutQuad'
      });

      $('body').append(prevBtn);
      prevBtn.velocity({
        opacity: 1
      }, {
        duration: inDuration,
        queue: false,
        easing: 'easeOutQuad'
      });

    }//addBtns

    function removeOverlay(){
      $('#materialbox-overlay').velocity("stop", true);
      $('#materialbox-overlay').velocity({
        opacity: 0
      }, {
        duration: outDuration,
        queue: false,
        easing: 'easeOutQuad',
        complete: function() {
          overlayActive = false;
          $(this).remove();
        }
      });
      //return overlayActive;
    }//removeOverlay


    function removeBtns(){
      nextBtn.velocity("stop", true);
      nextBtn.velocity({
        opacity: 0
      }, {
        duration: outDuration,
        queue: false,
        easing: 'easeOutQuad',
        complete: function() {
          $(this).remove();
        }
      });
      prevBtn.velocity("stop", true);
      prevBtn.velocity({
        opacity: 0
      }, {
        duration: outDuration,
        queue: false,
        easing: 'easeOutQuad',
        complete: function() {
          $(this).remove();
        }
      });
    }//removeBtns

  };

  $(document).ready(function() {
    $('.materialboxedgallery').materialboxgallery();
  });

}(jQuery));
//end custom materialboxgallery