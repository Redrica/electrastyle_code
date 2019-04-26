 $(function() {      
      $("#test").swipe( {
        swipeStatus:function(event, phase, direction, distance , duration , fingerCount) {
           $('#swipe_text').text("direction " + direction + ' px ' + " swiped " + distance + ' px');
           if(phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL) {
             //The handlers below fire after the status, 
             // so we can change the text here, and it will be replaced if the handlers below fire
             $('#swipe_text').text("No swipe was made");
           }
        },
        pinchStatus:function(event, phase, direction, distance , duration , fingerCount, pinchZoom) {
          $('#pinch_text').text("phase " + phase + " px " + " direction " + direction + " px " + " distance " + distance + " px "+ " duration " + duration + " px ");
          if(phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL) {
             //The handlers below fire after the status, 
             // so we can change the text here, and it will be replaced if the handlers below fire
             $('#pinch_text').text("No pinch was made");
           }
        },
        swipe:function(event, direction, distance, duration, fingerCount) {
           $('#swipe_text').text("You swiped " + direction + " with " + fingerCount + " fingers");
        },
        pinchIn:function(event, direction, distance, duration, fingerCount, pinchZoom) {
          $('#pinch_text').text("You pinched " +direction + " by " + distance +"px, zoom scale is "+pinchZoom +" duration "+duration); 
        },
        pinchOut:function(event, direction, distance, duration, fingerCount, pinchZoom) {
          $('#pinch_text').text("You pinched " +direction + " by " + distance +"px, zoom scale is "+pinchZoom +" duration "+duration);
        },
        fingers:$.fn.swipe.fingers.ALL  
      });
    });

 /*
  обертка pswp__zoom-wrap свойства transform: translate3d(0px, -214px, 0px) scale(1);

для картинки
{
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  cursor: zoom-in;
  max-width: none;
  position: absolute;
  left: 0;
  top: 0;
  width: auto;
  height: auto;
}

//изменять параметр transform: translate3d(29px, 44px, 0px) scale(1);
.pswp__zoom-wrap {
  overflow: hidden;
  -ms-touch-action: none;
  touch-action: none;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;  
  -webkit-backface-visibility: hidden;
  position: absolute;
  width: 100%;
  -webkit-transform-origin: left top;
  transform-origin: left top;
  transition: -webkit-transform 333ms cubic-bezier(.4,0,.22,1);
  transition: transform 333ms cubic-bezier(.4,0,.22,1);
  transition: transform 333ms cubic-bezier(.4,0,.22,1),-webkit-transform 333ms cubic-bezier(.4,0,.22,1);
}


  ВЛЕВО изменяется первый параметр со знаком --
  ВПРАВО изменяется первый параметр со знаком +
  картинка перемещается ВВЕРХ втрой параметр со знаком минус --
  картинка перемещается ВНИЗ втрой параметр со знаком +++
 */