(function(){
  
    $('.shopping-cart').each(function() {
      var delay = $(this).index() * 50 + 'ms';
      $(this).css({
          '-webkit-transition-delay': delay,
          '-moz-transition-delay': delay,
          '-o-transition-delay': delay,
          'transition-delay': delay
      });
    });
    $('#cart, .shopping-cart').hover(function(e) {
      $(".shopping-cart").stop(true, true).addClass("active");
    }, function() {
      $(".shopping-cart").stop(true, true).removeClass("active");
    });  
  })();