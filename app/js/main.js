$(document).ready(function () {

  // ! Menu-nav
  function navMenu() {
    $('.button-menu').on('click', function () {
      $(this).toggleClass('active');
      $('.menu-nav').toggleClass('active');
    });

    $('.menu-nav__header').on('click', function () {
      $(this).toggleClass('active');
      $('.menu-nav').removeClass('active');
    });
  
    $(document).on('click', function (e) {
      if (!$(e.target).closest('.button-menu, .menu-nav').length) {
        $('.menu-nav').removeClass('active');
        $('.button-menu').removeClass('active');
      }
      e.stopPropagation();
    });
  }
  navMenu()
  
  // ! Search-button
  function dropdownSearch() {
    $(".search-button").on("click", function () {
      $(this).toggleClass("active");
      $(this).next().toggleClass("active");
    });
  
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".search-button, .dropdown-search").length) {
        $(".dropdown-search").removeClass("active");
        $(".search-button").removeClass("active");
      }
      e.stopPropagation();
    });
  }
  dropdownSearch()

  //! img-svg
  $('img.img-svg').each(function () {
    var $img = $(this);
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(
      imgURL,
      function (data) {
        var $svg = $(data).find('svg');
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
        }
        $img.replaceWith($svg);
      },
      'xml',
    );
  });

});
