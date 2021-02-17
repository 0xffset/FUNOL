(function ($) {

  $(document).ready(function () {

    $(window).scroll(function () {
      // Change mobile nav color   
      var aboutsection = $('#about').offset().top;
      var gallerysection = $('#gallery').offset().top;
      if ($(document).scrollTop() >= aboutsection && $(document).scrollTop() < gallerysection) {
        $('#nav-btn span').addClass('black');
      } else {
        $('#nav-btn span').removeClass('black');
      }
      // Sticky menu 
      if ($(window).scrollTop() > 80) {
        $('.main-head-2').addClass('sticky');
      } else {
        $('.main-head-2').removeClass('sticky');
      }
    });

    // Search button 
    $('.fa.fa-search').click(function () {
      $('.button-search').toggleClass('hidden');
      $('.button-search-one').toggleClass('hidden');
      $('.two').toggleClass('hidden');
      $('.search-icon-menu').toggleClass('hidden');
    });

    // Gallery rotator 
    $('.dot-buttons li').click(function () {
      var $this = $(this),
        $siblings = $this.parent().children(),
        position = $siblings.index($this);
      $('.photo-container').removeClass('active-gallery').eq(position).addClass('active-gallery');
      $siblings.removeClass('active-gallery');
      $this.addClass('active-gallery');
    });

    // Page scroll to active class add menu
    var lastId,
      topMenu = $(".main-nav"),
      topMenuHeight = topMenu.outerHeight() + 15,
      menuItems = topMenu.find("a"),
      scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });

    $(window).scroll(function () {
      var fromTop = $(this).scrollTop() + topMenuHeight;
      var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop)
          return this;
      });
      cur = cur[cur.length - 1];
      var id = cur && cur.length ? cur[0].id : "";
      if (lastId !== id) {
        lastId = id;
        menuItems
          .parent().removeClass("active")
          .end().filter("[href=#" + id + "]").parent().addClass("active");
      }
    });

    // Testimonials rotator
    $('.client-control-next, .client-control-previous').click(function () {
      var $this = $(this),
        activeClient = $('.clients-units').find('.active-client'),
        position = $('.clients-units').children().index(activeClient),
        numClient = $('.client-unit').length;
      if ($this.hasClass('.client-control-next')) {
        if (position < numClient - 1) {
          $('.active-client').removeClass('active-client').next().addClass('active-client');
        } else {
          $('.client-unit').removeClass('active-client').first().addClass('active-client');
        }
      } else {
        if (position === 0) {
          $('.client-unit').removeClass('active-client').last().addClass('active-client');
        } else {
          $('.active-client').removeClass('active-client').prev().addClass('active-client');
        }
      }
    });

    // Responsive menu
    $('#nav-btn').click(function () {
      $(this).toggleClass('close');
      $('.main-head').toggleClass('open');
    });
    $('.main-head li a').click(function () {
      $('.main-head').toggleClass('open');
      $('#nav-btn').toggleClass('close');
    });

    // Smooth scroll
    $('a[href*=#]:not([href=#])').click(function () {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1500);
          return false;
        }
      }
    });

    //Lightbox
    $("a.projects_link").lightbox();
  });
})(jQuery);



// Login And SignUp

(function ($) {
  "use strict";

  /*==================================================================
  [ Focus Contact2 ]*/
  $('.input100').each(function () {
    $(this).on('blur', function () {
      if ($(this).val().trim() != "") {
        $(this).addClass('has-val');
      }
      else {
        $(this).removeClass('has-val');
      }
    })
  })


  /*==================================================================
  [ Validate after type ]*/
  $('.validate-input .input100').each(function () {
    $(this).on('blur', function () {
      if (validate(this) == false) {
        showValidate(this);
      }
      else {
        $(this).parent().addClass('true-validate');

      }
    })
  })

  /*==================================================================
  [ Validate ]*/
  var input = $('.validate-input .input100');
  $('.validate-form').on('submit', function (e) {
    e.preventDefault();
    if (validate(input[0]) == true && validate(input[1]) == true) {
      var email = $(input[0]).val();
      var password = $(input[1]).val();
      let response = SignIn(email, password);
  
      console.log(SignIn(email, password))
     
    } 
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });


  $('.validate-form .input100').each(function () {
    $(this).focus(function () {
      hideValidate(this);
      $(this).parent().removeClass('true-validate');
    });
  });

  function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
      if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        console.log("1")
        return false;
      } else { return true; }
    }
    else if ($(input).val().trim() == '') {

      return false;
    }

    else {
      return true;
    }


  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
  }



})(jQuery);


