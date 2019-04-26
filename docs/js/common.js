
$(function () {
// Script for browser detect
var browserDetect;

$(function(){
    browserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }

            var rv = dataString.indexOf("rv:");
            if (this.versionSearchString === "Trident" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },

        dataBrowser: [
            {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
            {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
            {string: navigator.userAgent, subString: "Safari", identity: "Safari"},
            {string: navigator.userAgent, subString: "Opera", identity: "Opera"}
        ]

    };

    browserDetect.init();

    $('body').addClass(browserDetect.browser+' v'+browserDetect.version );

    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
});

// подключаем html5-блоки для старых браузеров
var e = ("article,aside,figcaption,figure,footer,header,hgroup,nav,section,time,main").split(',');
for (var i = 0; i < e.length; i++) {
    document.createElement(e[i]);
};


// Mobile Detect
function isMobile() {
  try{ document.createEvent("TouchEvent"); return true; }
  catch(e){ return false; }
}

if (isMobile()) $('body').addClass('mobile');



// setTimeout(() => {
//   if (isMobile()) {
//     $('footer').before('<h3 style="text-align: center; padding: 20px"><b>Вы зашли с мобильного устройства</b></h3>');
//   }
// }, 3000);





//смена фотографий в меню
$('.link-cat').on('mouseenter', function(e) {
  var imgPath = $(this).attr('data-src');
  $('.drop-img img').attr('src',imgPath);
});

// большой cлайдер на главной
var mainSlide = $('.sliderItem').slick({
  // lazyLoad: 'ondemand',
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  dots: true,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      // breakpoint: 1024, old_8913
      breakpoint: 1025,
      settings: {
        fade: false
      }
    }
  ]
});
//при смене слайда в зависимости от того какая цветовая гамма, меняем стрелки и цвет текста
$(mainSlide).on('beforeChange', function(event, slick, nextSlide){
  $('.slide-txt').removeClass('fadeInUp');
});
$(mainSlide).on('afterChange', function(event, slick, nextSlide){
  var slideThemes = $('.sliderItem').find('.slick-current').attr('data-themes');
  $('.main__slider').attr('id', slideThemes);
  $('.slide-txt').addClass('fadeInUp');
});


//при первой загрузке выставляем первоначальную тему для слайда
var slideThemesLoad = $('.sliderItem .main-slide:nth-child(1)').attr('data-themes');
$('.main__slider').attr('id', slideThemesLoad);

//слайдер в группе Верхняя одежда
var groupItem1 = $('.groupItem1').slick({
  vertical: true,
  slidesToShow: 5,
  infinite: true,
  slidesToScroll: 1,
  prevArrow: ".prev1",
  nextArrow: ".next1",
  responsive: [
    {
      // breakpoint: 1024, old_8913
      breakpoint: 1366,
      settings: {
        slidesToShow: 1,
        vertical: false,
        infinite: true,
        fade: true
      }
    }
  ]
});

// ф-ия смены слайдов на мобильном
function changeImgGroup(sliderName) {
    var activeGrSlide = $(sliderName).find('.slick-current');

    var slideImg = $(activeGrSlide).attr('data-imgcol');
    var slideImgGroup = $(activeGrSlide).attr('data-grimg');

    $(sliderName).find('.slide-active').removeClass('slide-active');
    $(sliderName).closest('.gr-slide').addClass('slide-active');

    $('.'+slideImgGroup+' li:not(.'+slideImg+')').fadeOut();
    $('.'+slideImgGroup+' li.'+slideImg).fadeIn();
}
//Верхняя одежда смена слайдов на мобильном
$(groupItem1).on('afterChange', function(event, slick, nextSlide){
  var windowWidth = $(window).outerWidth();
  //var windowWidth = $(window).width();
  // if(windowWidth <= 1023) { old_8913
  if(windowWidth <= 1365) {
    changeImgGroup('.groupItem1');
  }
});


//ховер по фото показываем фото категории
$('.gr-slide a').on('mouseenter', function(e) {

  var slideImg = $(this).closest('.gr-slide').attr('data-imgcol');
  var slideImgGroup = $(this).closest('.gr-slide').attr('data-grimg');

  $(this).closest('.groupItemSlider').find('.slide-active').removeClass('slide-active');
  $(this).closest('.gr-slide').addClass('slide-active');

  $('.'+slideImgGroup+' li:not(.'+slideImg+')').fadeOut();
  $('.'+slideImgGroup+' li.'+slideImg).fadeIn();

});

//слайдер в группе одежда
var groupItem2 = $('.groupItem2').slick({
  vertical: true,
  slidesToShow: 5,
  infinite: true,
  slidesToScroll: 1,
  prevArrow: ".prev2",
  nextArrow: ".next2",
  responsive: [
    {
      // breakpoint: 1024, old_8913
      breakpoint: 1366,
      settings: {
        slidesToShow: 1,
        vertical: false,
        infinite: true,
        fade: true
      }
    }
  ]
});
//одежда смена слайдов на мобильном
$(groupItem2).on('afterChange', function(event, slick, nextSlide){
  var windowWidth = $(window).outerWidth();
  //var windowWidth = $(window).width();
  // if(windowWidth <= 1023) { old_8913
  if(windowWidth <= 1365) {
    changeImgGroup('.groupItem2');
  }
});

//переключение слайдов в группах на мобильном
//group-btn
$(".group-btn").on('click', function(e){
  e.preventDefault();
  //var parentSlider = $(this).closest('.group__box');
  var prevBtn = $(this).closest('.group__box').find('.prev-group');
  var nextBtn = $(this).closest('.group__box').find('.next-group');

  if($(this).hasClass('prev-gr-slide')) {
    $(prevBtn).trigger('click');
  }
  else {
    $(nextBtn).trigger('click');
  }
});


// слайдер Lookbook 2017
var mySwiper = new Swiper(".swiper1", {
  lazy: true,
  loop: true,
  pagination: false,
  grabCursor: true,
  speed: 1000,
  paginationClickable: true,
  effect: "fade",
  navigation: {
    nextEl: '.lb-next1',
    prevEl: '.lb-prev1',
  },
  breakpoints: {
  // 1023: {old_8913
  1024: {
      direction: "horizontal"
    },
   }
});
// слайдер Lookbook 2
var mySwiper = new Swiper(".swiper2", {
  lazy: true,
  loop: true,
  pagination: false,
  grabCursor: true,
  speed: 1000,
  paginationClickable: true,
  effect: "fade",
  navigation: {
    nextEl: '.lb-next2',
    prevEl: '.lb-prev2',
  },
  on: {
    transitionStart: function () {
      $('.swiper-right').css({'zIndex':'2'});
    },
    transitionEnd: function () {
      $('.swiper-right').css({'zIndex':'5'});
    },
  }
});

//Инициализация слайдеров цвета в карточке товара
function funcSlideColor() {
  $('.color-slider').each(function(){
    //получаем количество цветов в каждом блоке слайдов
    var sliderLenght = $(this).find('.color-track li').length;

    //если больше 6 запускаем слайдер
    if(sliderLenght > 6) {
      //добавляем класс color-initialized слайдеар
      $(this).addClass('color-initialized');

      //узнаем ширину одного слайда
      var oneSlideWidth = $(this).find('.color-track li').width();

      //узнаем общую ширину всего слайдера
      var sliderWidth = sliderLenght*oneSlideWidth;

      //т.к. в области просмотра у нас всегда будет 6 слайдов нам надо занести значения, на сколько можно прокручивать слайдер в право/влево
      //узнаем ширину 6-ти слайдов
      var sixSlideWidth = oneSlideWidth*6;

      //отнимаем с общей ширины, ширину 6-ти слайдов и заносим это значение data-width опираясь на которое мы сможем понять насколько можно прокручивать слайдер влево/вправо
      $(this).find('.color-track').attr('data-width',sliderWidth-sixSlideWidth);
    }

  });
}
funcSlideColor();


//следующий слайд цвета
$("body").on('click', '.next-color', function(){
  //узнаем на сколько можно сдвигать слайдер влево/вправо
  var sliderWidth = $(this).parent().find('.color-track').attr('data-width');

  //получение значение трансформации слайдера, на сколько его сдвинули влево/вправо
  var sliderTransform = parseInt($(this).parent().find('.color-track').attr('data-transform'));

  //каждый раз проверяем значение трансформации влево и на сколько можно сдвинуть влево, если они равны действие приостанавливаем
  if(sliderTransform == '-'+sliderWidth) {
    return false;
  }
  else {
    //узнаем ширину одного слайда
    var oneSlideWidth = $(this).parent().find('.color-track li').width();

    //если значения не равны отнимаем ширину одного
    var sliderTransformUpdate = (sliderTransform-oneSlideWidth);

    //вносим изменения трансформации
    $(this).parent().find('.color-track').attr('data-transform',sliderTransformUpdate);

    //снова получаем значение трансформации с учетом предыдущей трансформации слайда
    var sliderTransformNew = $(this).parent().find('.color-track').attr('data-transform');
    //сдвигаем слайдер влево на новое значение
    $(this).parent().find('.color-track').css({'transform': 'translate3d('+sliderTransformNew+'px, 0, 0)'});
  }

});

//предыдущий слайд цвета
$("body").on('click', '.prev-color', function(){
  //узнаем на сколько можно сдвигать слайдер влево/вправо
  var sliderWidth = $(this).parent().find('.color-track').attr('data-width');

  //получение значение трансформации слайдера, на сколько его сдвинули влево/вправо
  var sliderTransform = parseInt($(this).parent().find('.color-track').attr('data-transform'));

  //каждый раз проверяем значение трансформации влево и на сколько можно сдвинуть влево, если они равны действие приостанавливаем
  if((sliderTransform == sliderWidth) || (sliderTransform == 0)) {
    return false;
  }
  else {
    //узнаем ширину одного слайда
    var oneSlideWidth = $(this).parent().find('.color-track li').width();

    //если значения не равны отнимаем ширину одного
    var sliderTransformUpdate = (sliderTransform+oneSlideWidth);

    //вносим изменения трансформации
    $(this).parent().find('.color-track').attr('data-transform',sliderTransformUpdate);

    //снова получаем значение трансформации с учетом предыдущей трансформации слайда
    var sliderTransformNew = $(this).parent().find('.color-track').attr('data-transform');
    //сдвигаем слайдер влево на новое значение
    $(this).parent().find('.color-track').css({'transform': 'translate3d('+sliderTransformNew+'px, 0, 0)'});
  }

});

//ховер по цвету переключаем фото товаров
$('body').on('mouseenter', '.color-track li', function(e) {
  var indexBlock = $(this).index();
  var block = $(this).closest('.pr-img-box');
  var colorTitle = $(this).attr('data-title');
  //block.find('.pr-img-slider li:not(.slide_'+indexBlock+')').fadeOut();
  //block.find('.pr-img-slider li.slide_'+indexBlock).fadeIn();

  $('.pr-img-slider li a').find('.preview').show();//fadeIn();
  $('.pr-img-slider li a').find('.img-hover').hide();//.fadeOut();
  block.find('.pr-img-slider li:not(.slide_'+indexBlock+')').hide().removeClass('slide_active');//fadeOut
  block.find('.pr-img-slider li.slide_'+indexBlock).show().addClass('slide_active');//fadeIn

  //добавляем активный класс цвету
  $(this).parent().find('.active').removeClass('active');
  $(this).addClass('active');

  block.find('.pr-hover-title').text(colorTitle);
});

//ховер по фото показываем увеличенное фото
$('body').on('mouseenter', '.card-slider li a', function(e) {
  $(this).find('.preview').show();//fadeIn

  var hoverImg = $(this).find('.img-hover');

  if($(hoverImg).hasClass('hoverLoad')) {
    $(hoverImg).show().addClass('hoverLoad');//fadeIn
  }
  else {
    var hoverImgPath = $(hoverImg).attr('data-hover');
    $(hoverImg).attr('src', hoverImgPath).show();//fadeIn
  }

});

//убираем курсор мыши со всего блока возвращаем, самую первую фотографию в область видимости
$('body').on('mouseleave ', '.catalog__card', function(e) {
  var block = $(this).find('.pr-img-slider');
  var blockCard = $(this);
  //$('.pr-img-slider li:not(.slide_0)').fadeOut();
  //$('.pr-img-slider li.slide_0').fadeIn();
  $('.pr-img-slider li:not(.slide_0)').hide().removeClass('slide_active');
  $('.pr-img-slider li.slide_0').show().addClass('slide_active');

  $('.pr-img-slider li.slide_0').find('.preview').show();//.fadeIn();
  $('.pr-img-slider li.slide_0').find('.img-hover').hide();//.fadeOut();

  $('.color-track').find('.active').removeClass('active');
  $('.color-track li:first-child').addClass('active');

  $('.color-track').attr('data-transform','0');
  $('.color-track').removeAttr('style');

  var colorTitle = $(blockCard).find('.color-track li:first-child').attr('data-title');
  blockCard.find('.pr-hover-title').text(colorTitle);
});



// слайдер популярных товаров
$('.popularSlider').slick({
  lazyLoad: 'ondemand',
  slidesToShow: 4,
  infinite: true,
  arrows: true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 3
      }
    },
    {
      // breakpoint: 1024, old_8913
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        variableWidth: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        infinite: true,
        arrows: true,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: true
      }
    }
  ]
});

var bSlider1 = $('.backstageItem1').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  dots: false,
  speed: 50,
  prevArrow: ".b-prev1",
  nextArrow: ".b-next1"
});

$(bSlider1).on('beforeChange', function(event, slick, currentSlide, nextSlide){
  $('.b-action-title').removeClass('fadeInLeft');

  //останавливаем видео при смене слайда
  var countSlide = parseInt(currentSlide);
  countSlide = countSlide +1;
  var videoBox = $('.backstageItem1 .video-slide:nth-child('+countSlide+')').find('.videoBox').length;

  if(videoBox == 1) {
    var videoId = $('.backstageItem1 .video-slide:nth-child('+countSlide+')').find('.videoBox').attr('id');
    var my_video = document.getElementById(videoId);
    var my_video = my_video.getElementsByTagName("iframe")[0].contentWindow;
    my_video.postMessage('{"event": "command", "func": "pauseVideo", "args": ""}', "*");
  }

});

$(bSlider1).on('afterChange', function(event, slick, nextSlide){


  var tabBox = $(this).closest('.backstage__box');
  var activeSlide = $(tabBox).find('.slick-current');

  $('.b-action-title').addClass('fadeInLeft');


  //название предыдущего слайда

  //загололовок слайда
  var titleSlide = $(activeSlide).attr('data-title');
  $(tabBox).find('.b-action-title').text(titleSlide);

  //ссылка на каталог
  var linkSlide = $(activeSlide).attr('data-link');
  $(tabBox).find('.b-action-link').attr('href',linkSlide);

  //получем индекс слайда
  var slideIndexActive = parseInt($(activeSlide).attr('data-slick-index'));
  var slideIndexLast = parseInt($(tabBox).find(".video-slide:last-child").attr('data-slick-index'));

  if(slideIndexActive == 0) {
    var prevTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexLast)+']').attr('data-slidetitle');
    var nextTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexActive+1)+']').attr('data-slidetitle');
    $(tabBox).find('.prev-text').text(prevTextSlide);
    $(tabBox).find('.next-text').text(nextTextSlide);
  }
  else if(slideIndexActive == slideIndexLast) {
    var prevTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexLast-1)+']').attr('data-slidetitle');
    var nextTextSlide = $(tabBox).find('.video-slide[data-slick-index = 0]').attr('data-slidetitle');
    $(tabBox).find('.prev-text').text(prevTextSlide);
    $(tabBox).find('.next-text').text(nextTextSlide);
  }
  else {
    var prevTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexActive-1)+']').attr('data-slidetitle');
    var nextTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexActive+1)+']').attr('data-slidetitle');
    $(tabBox).find('.prev-text').text(prevTextSlide);
    $(tabBox).find('.next-text').text(nextTextSlide);

  }

});

var bSlider2, bSlider3, bSlider4;

//переключение табов
$(".backstage__tabs li").on('click', function(){
  if($(this).hasClass('active')) {
    return false;
  }
  else {

      $('.backstage__content').find('.tabActive').removeClass('tabActive');

      //предыдущий активный таб
      var prevTab = $('.backstage__tabs').find('.active').attr('data-tab');

      try {
        var activeSlide = $('.backstage__tab.'+prevTab).find('.slick-current');

        //проверяем есть ли запущенное видео
        var videoBox = $(activeSlide).find('.videoBox').length;

        //если есть запущенное делаем pause
        if(videoBox == 1) {
          var videoId = $('.backstage__tab.'+prevTab).find('.videoBox').attr('id');
          var my_video = document.getElementById(videoId);
          var my_video = my_video.getElementsByTagName("iframe")[0].contentWindow;
          my_video.postMessage('{"event": "command", "func": "pauseVideo", "args": ""}', "*");
        }
      } catch (e) {}


      var tab = $(this).attr('data-tab');

       $('.backstage__tab:not(.'+tab+')').hide();
       $('.backstage__tab.'+tab).show();

       $('.backstage__tabs li:not(.'+tab+')').removeClass('active');
       $('.backstage__tabs li.'+tab).addClass('active');

       if(tab == 'tab2') {

        if ($('.backstageItem2').hasClass('sliderLoaded')) {
          return false;
        }
        else {
          $('.backstageItem2').slick('refresh');
          $('.backstageItem2').addClass('sliderLoaded');
        }
       }//tab == 'tab2'

       if(tab == 'tab3') {

        if ($('.backstageItem3').hasClass('sliderLoaded')) {
          return false;
        }
        else {
          $('.backstageItem3').slick('refresh');
          $('.backstageItem3').addClass('sliderLoaded');
        }
       }//tab == 'tab3'

       if(tab == 'tab4') {

        if ($('.backstageItem4').hasClass('sliderLoaded')) {
          return false;
        }
        else {
          $('.backstageItem4').slick('refresh');
          $('.backstageItem4').addClass('sliderLoaded');
        }
       }//tab == 'tab4'



  }
});

var bSlider2 = $('.backstageItem2').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  dots: false,
  speed: 50,
  prevArrow: ".b-prev2",
  nextArrow: ".b-next2"
});


$(bSlider2).on('beforeChange', function(event, slick, currentSlide, nextSlide){
  $('.b-action-title').removeClass('fadeInLeft');

  //останавливаем видео при смене слайда
  var countSlide = parseInt(currentSlide);
  countSlide = countSlide +1;
  var videoBox = $('.backstageItem2 .video-slide:nth-child('+countSlide+')').find('.videoBox').length;

  if(videoBox == 1) {
    var videoId = $('.backstageItem2 .video-slide:nth-child('+countSlide+')').find('.videoBox').attr('id');
    var my_video = document.getElementById(videoId);
    var my_video = my_video.getElementsByTagName("iframe")[0].contentWindow;
    my_video.postMessage('{"event": "command", "func": "pauseVideo", "args": ""}', "*");
  }

});

$(bSlider2).on('afterChange', function(event, slick, nextSlide){

  var tabBox = $(this).closest('.backstage__box');
  var activeSlide = $(tabBox).find('.slick-current');

  $('.b-action-title').addClass('fadeInLeft');
  //название предыдущего слайда

  //загололовок слайда
  var titleSlide = $(activeSlide).attr('data-title');
  $(tabBox).find('.b-action-title').text(titleSlide);

  //ссылка на каталог
  var linkSlide = $(activeSlide).attr('data-link');
  $(tabBox).find('.b-action-link').attr('href',linkSlide);

  //получем индекс слайда
  var slideIndexActive = parseInt($(activeSlide).attr('data-slick-index'));
  var slideIndexLast = parseInt($(tabBox).find(".video-slide:last-child").attr('data-slick-index'));

  if(slideIndexActive == 0) {
    var prevTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexLast)+']').attr('data-slidetitle');
    var nextTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexActive+1)+']').attr('data-slidetitle');
    $(tabBox).find('.prev-text').text(prevTextSlide);
    $(tabBox).find('.next-text').text(nextTextSlide);
  }
  else if(slideIndexActive == slideIndexLast) {
    var prevTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexLast-1)+']').attr('data-slidetitle');
    var nextTextSlide = $(tabBox).find('.video-slide[data-slick-index = 0]').attr('data-slidetitle');
    $(tabBox).find('.prev-text').text(prevTextSlide);
    $(tabBox).find('.next-text').text(nextTextSlide);
  }
  else {
    var prevTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexActive-1)+']').attr('data-slidetitle');
    var nextTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexActive+1)+']').attr('data-slidetitle');
    $(tabBox).find('.prev-text').text(prevTextSlide);
    $(tabBox).find('.next-text').text(nextTextSlide);

  }

});
var bSlider3 = $('.backstageItem3').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  dots: false,
  speed: 50,
  prevArrow: ".b-prev3",
  nextArrow: ".b-next3"
});
$(bSlider3).on('beforeChange', function(event, slick, currentSlide, nextSlide){
  $('.b-action-title').removeClass('fadeInLeft');

  //останавливаем видео при смене слайда
  var countSlide = parseInt(currentSlide);
  countSlide = countSlide +1;
  var videoBox = $('.backstageItem3 .video-slide:nth-child('+countSlide+')').find('.videoBox').length;

  if(videoBox == 1) {
    var videoId = $('.backstageItem3 .video-slide:nth-child('+countSlide+')').find('.videoBox').attr('id');
    var my_video = document.getElementById(videoId);
    var my_video = my_video.getElementsByTagName("iframe")[0].contentWindow;
    my_video.postMessage('{"event": "command", "func": "pauseVideo", "args": ""}', "*");
  }
});
$(bSlider3).on('afterChange', function(event, slick, nextSlide){

  var tabBox = $(this).closest('.backstage__box');
  var activeSlide = $(tabBox).find('.slick-current');
  //название предыдущего слайда

    $('.b-action-title').addClass('fadeInLeft');

  //загололовок слайда
  var titleSlide = $(activeSlide).attr('data-title');
  $(tabBox).find('.b-action-title').text(titleSlide);

  //ссылка на каталог
  var linkSlide = $(activeSlide).attr('data-link');
  $(tabBox).find('.b-action-link').attr('href',linkSlide);

  //получем индекс слайда
  var slideIndexActive = parseInt($(activeSlide).attr('data-slick-index'));
  var slideIndexLast = parseInt($(tabBox).find(".video-slide:last-child").attr('data-slick-index'));

  if(slideIndexActive == 0) {
    var prevTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexLast)+']').attr('data-slidetitle');
    var nextTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexActive+1)+']').attr('data-slidetitle');
    $(tabBox).find('.prev-text').text(prevTextSlide);
    $(tabBox).find('.next-text').text(nextTextSlide);
  }
  else if(slideIndexActive == slideIndexLast) {
    var prevTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexLast-1)+']').attr('data-slidetitle');
    var nextTextSlide = $(tabBox).find('.video-slide[data-slick-index = 0]').attr('data-slidetitle');
    $(tabBox).find('.prev-text').text(prevTextSlide);
    $(tabBox).find('.next-text').text(nextTextSlide);
  }
  else {
    var prevTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexActive-1)+']').attr('data-slidetitle');
    var nextTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexActive+1)+']').attr('data-slidetitle');
    $(tabBox).find('.prev-text').text(prevTextSlide);
    $(tabBox).find('.next-text').text(nextTextSlide);

  }

});
var bSlider4 = $('.backstageItem4').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  dots: false,
  speed: 50,
  prevArrow: ".b-prev4",
  nextArrow: ".b-next4"
});
$(bSlider4).on('beforeChange', function(event, slick, currentSlide, nextSlide){
  $('.b-action-title').removeClass('fadeInLeft');

  //останавливаем видео при смене слайда
  var countSlide = parseInt(currentSlide);
  countSlide = countSlide +1;
  var videoBox = $('.backstageItem4 .video-slide:nth-child('+countSlide+')').find('.videoBox').length;

  if(videoBox == 1) {
    var videoId = $('.backstageItem4 .video-slide:nth-child('+countSlide+')').find('.videoBox').attr('id');
    var my_video = document.getElementById(videoId);
    var my_video = my_video.getElementsByTagName("iframe")[0].contentWindow;
    my_video.postMessage('{"event": "command", "func": "pauseVideo", "args": ""}', "*");
  }
});
$(bSlider4).on('afterChange', function(event, slick, nextSlide){

  var tabBox = $(this).closest('.backstage__box');
  var activeSlide = $(tabBox).find('.slick-current');
  //название предыдущего слайда

    $('.b-action-title').addClass('fadeInLeft');


  //загололовок слайда
  var titleSlide = $(activeSlide).attr('data-title');
  $(tabBox).find('.b-action-title').text(titleSlide);

  //ссылка на каталог
  var linkSlide = $(activeSlide).attr('data-link');
  $(tabBox).find('.b-action-link').attr('href',linkSlide);

  //получем индекс слайда
  var slideIndexActive = parseInt($(activeSlide).attr('data-slick-index'));
  var slideIndexLast = parseInt($(tabBox).find(".video-slide:last-child").attr('data-slick-index'));

  if(slideIndexActive == 0) {
    var prevTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexLast)+']').attr('data-slidetitle');
    var nextTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexActive+1)+']').attr('data-slidetitle');
    $(tabBox).find('.prev-text').text(prevTextSlide);
    $(tabBox).find('.next-text').text(nextTextSlide);
  }
  else if(slideIndexActive == slideIndexLast) {
    var prevTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexLast-1)+']').attr('data-slidetitle');
    var nextTextSlide = $(tabBox).find('.video-slide[data-slick-index = 0]').attr('data-slidetitle');
    $(tabBox).find('.prev-text').text(prevTextSlide);
    $(tabBox).find('.next-text').text(nextTextSlide);
  }
  else {
    var prevTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexActive-1)+']').attr('data-slidetitle');
    var nextTextSlide = $(tabBox).find('.video-slide[data-slick-index = '+(slideIndexActive+1)+']').attr('data-slidetitle');
    $(tabBox).find('.prev-text').text(prevTextSlide);
    $(tabBox).find('.next-text').text(nextTextSlide);

  }

});

//tabActive backstage__box фунция для слайдеров в табах BACKSTAGES главная страница для добавления каждой стрелки названия следующего и предыдущего слайда
function funcArrowText() {
  $('.backstage__box').each(function(){
    //заголовок предыдущего слайда
    var prevTextSlide = $(this).find(".video-slide:last-child").attr('data-slidetitle');
    //заголовок следующего слайда
    var nextTextSlide = $(this).find(".video-slide:nth-child(2)").attr('data-slidetitle');

    $(this).find('.prev-text').text(prevTextSlide);
    $(this).find('.next-text').text(nextTextSlide);

  });
}
funcArrowText();

//Воспроизведение видео
$('.video-link').on('click', function(e) {
  e.preventDefault();

    var playVideoId = $(this).attr('data-videoId');
    var videoHeight = $(this).height();

    var parentVideo = $(this).parent();

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    var randomID = getRandomInt(0, 1000000);

    $(parentVideo).addClass('loadVideo').css({'height':videoHeight+'px'});
    $(parentVideo).prepend('<div class="videoBox" id="video'+randomID+'"><iframe class="frameVideo" type="text/html" src="https://www.youtube.com/embed/'+playVideoId+'?rel=0&showinfo=0&controls=0&autoplay=1&wmode=opaque&enablejsapi=1" frameborder="0" allowfullscreen></iframe></div>');

    $(this).fadeOut();

    setTimeout(function() {
      $(parentVideo).find('.videoBox').css({'position':'relative', 'height':videoHeight+'px'});
    }, 310);

    setTimeout(function() {
      $(parentVideo).removeAttr('style');
    }, 3000);

});

//открыть модальное окно
$("body").on('click', '.modal-open',  function(e) {
    e.preventDefault();
      var modalBox = $(this).attr("href");
      var magnificPopup = $.magnificPopup.instance;
      $('body').addClass("popup-open");

    $.magnificPopup.open({
      items: [
        {
          mainClass: 'mfp-with-zoom',
          midClick: true,
          src: modalBox,
          type: 'inline',

              zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out'
              }
        }
      ],
      callbacks: {
        close: function() {
          $('body').removeClass("popup-open");
        }
      }
    });


});


//Быстрый просмотр
$("body").on('click', '.fast-free', function(e){
  e.preventDefault();
  $('#popupFast').fadeIn();
  $('body').addClass('bodyFix');

  setTimeout(function(){
    $('.slider-for').slick('refresh');
    $('.sl-nav').slick('refresh');
  }, 50);
  $('.zoom').trigger('zoom.destroy');
});

//закрыть окно быстрого просмотра
$("body").on('click', '.fastClose', function(e){
  e.preventDefault();
    $('#popupFast').fadeOut();

    setTimeout(function(){
      $('body').removeClass('bodyFix');
    }, 310);
});



//открыть одно модальное окно - закрыть другое открытое
$(".btn-modal").on('click',  function(e) {
    e.preventDefault();
    $('.modal-close').trigger('click');

    var modalBox = $(this).attr("href");
    var magnificPopup = $.magnificPopup.instance;
    $('body').addClass("popup-open");

    setTimeout(function(){

      $.magnificPopup.open({
        items: [
          {
            mainClass: 'mfp-with-zoom',
            midClick: true,
            src: modalBox,
            type: 'inline',

                zoom: {
                  enabled: true,
                  duration: 300,
                  easing: 'ease-in-out'
                }

          }
        ],
      callbacks: {
        close: function() {
          $('body').removeClass("popup-open");
        }
      }
      });
    },0);
});

//переключение табов модальном окне
$(".modal__tab li").on('click', function(){
  if($(this).hasClass('active')) {
    return false;
  }
  else {
    $('.modal__tab').find('.active').removeClass('active');
    $(this).addClass('active');

    var tab = $(this).attr('data-tab');

     $('.modal__tab-box:not(.'+tab+')').hide();
     $('.modal__tab-box.'+tab).show();
  }
});
//показать форму востановления пароля в модальном окне
$(".btn-forgot-show").on('click', function(e){
  e.preventDefault();
  if($(".btn-forgot-show").hasClass('active')) {
    hideForgotForm();
  }
  else {

    //var windowWidth = $(window).width();
    var windowWidth = $(window).outerWidth();

    if(windowWidth <= 767) {
      $('.auth__form').fadeOut();
    }
    else {
      $('.forgot-hide').fadeOut();

    }

    $(".btn-forgot-show").addClass('active');
    setTimeout(function() {
      $('.forgot__form').fadeIn();
    },400);
  }

});
//скрыть форму востановления пароля в модальном окне
$(".btn-forgot-hide").on('click', function(e){
  e.preventDefault();
    hideForgotForm();
});

//Заглушка на рабочем сайте удалить.
//Показать сообщение об отправке инормации о востановлении на почту
$(".btn-forgot").on('click', function(e){
  e.preventDefault();
  var modalHeight = $('.modal__content').outerHeight();
  $('.modal__content').css({'height': modalHeight+'px'});
  $('.modal__tab, .modal__tab-content').fadeOut();

  setTimeout(function() {
    $('.modal__success-box').fadeIn();
  },400);
});

//селекты
$(".slct").on('click', function(fSelect){
    var parentBox = $(this).closest('.control__box');
    var selectBox = $(this).parent();
    var dropBlock = $(selectBox).find('.drop');

    if( dropBlock.is(':hidden') ) {

    $('.drop').slideUp();
    $('.slct').removeClass('active');

        dropBlock.slideDown();
        $(this).addClass('active');

        $(selectBox).find('.drop li').on('click', function(){
            var selectResult = $(this).data("value");
            var selectResult2 = $(this).html();

            //если выбран просто заголовок в селекте т.е. Тип деятельности, делаем значение селекта пустым
            if(selectResult != 'disable') {
              $(parentBox).removeClass('has-error').removeClass('has-danger');
              $(selectBox).find('input').val(selectResult);
            }
            else {
              $(selectBox).find('input').val('');
            }

            $(selectBox).find('.slct span').html(selectResult2);
            $(selectBox).find('.slct').removeClass('active');
            dropBlock.slideUp();


        });
    } else {
        dropBlock.slideUp();
        setTimeout("$('.slct').removeClass('active');", 250);
    }

        fSelect.stopPropagation()

});
$(".drop").on('click', function(fSelect){
    fSelect.stopPropagation()
});
$("body").on('click', function(){
    $('.drop').slideUp();
    setTimeout("$('.slct').removeClass('active');", 250);
});

//кнопка Подробнее в блоке со скроллом
$(".shop-more").on('click', function(e){
  e.preventDefault();
  var parent = $(this).closest('li');

  if($(this).hasClass('active')) {
    $(this).parent().find('.shop-dop').slideUp();
    $(this).removeClass('active').text("Подробнее");
    $(parent).find('.shop-title').removeClass('active');
  }
  else {
    $(this).parent().find('.shop-dop').slideDown();
    $(this).addClass('active').text("Свернуть");
    $(parent).find('.shop-title').addClass('active');
  }
});
$(".shop-title").on('click', function(e){
  var windowWidth = $(window).outerWidth();
  //var windowWidth = $(window).width();
  // if(windowWidth<=1023) { old_8913
  if(windowWidth<=1024) {
    var parent = $(this).closest('li');
    $(parent).find('.shop-more').trigger('click');
  }
});



//Слайдер Онлайн магазины
var onlineItem = $('.onlineItem').slick({
  slidesToShow: 7,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  responsive: [
    {
      breakpoint: 1365,
      settings: {
        slidesToShow: 5,
      }
    }
  ]
});

// слайдер похожие модели
$('.popularSlider2').slick({
  slidesToShow: 4,
  infinite: true,
  arrows: true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 3
      }
    },
    {
      // breakpoint: 1024, old_8913
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        variableWidth: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        variableWidth: true,
        centerMode: true
      }
    }
  ]
});
// слайдер недавно просмотренные
$('.popularSlider3').slick({
  slidesToShow: 4,
  infinite: true,
  arrows: true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 3
      }
    },
    {
      // breakpoint: 1024, old_8913
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        variableWidth: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        variableWidth: true,
        centerMode: true
      }
    }
  ]
});

// Слайдер thumb картинок
$('.sl-nav').slick({
  slidesToShow: 5,
  infinite: false,
  focusOnSelect: true,
  asNavFor: '.slider-for',
  vertical: true,
  arrows: true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 4
      }
    },
    {
      // breakpoint: 1024, old_8913
      breakpoint: 1025,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 920,
      settings: {
        slidesToShow: 3,
        vertical: false
      }
    }
  ]
});
 var sliderFor = $('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  arrows: true,
  fade: true,
  dots: true,
  asNavFor: '.sl-nav',
  responsive: [
    {
      // breakpoint: 1024, old_8913
      breakpoint: 1025,
      settings: {
        speed: 200
      }
    },
  ]
});
 $(sliderFor).on('afterChange', function(event, slick, nextSlide){
  var numSlide = parseInt($('.slider-for').find('.slick-current').attr('data-slick-index'));
  var numActiveSlide;

  if(numSlide == 0) {
    numActiveSlide = 1;
  }
  else {
    numActiveSlide = (numSlide+1);
  }
  $('.slidesVal').text(numActiveSlide);
});
//сбрасываем pinch при переключении на следующий слайд
$(sliderFor).on('beforeChange', function(event, slick, nextSlide){
  var windowWidth = $(window).outerWidth();
  // if(windowWidth <= 1023) { old_8913
  if(windowWidth <= 1024) {
    if($('.product__container').hasClass('prFix')) {


    try {
      var prevActiveSlide =  $('.slider-for').find('.slick-current');
      var pzItemID = $(prevActiveSlide).find('.pzItem-box').attr('id');
      var pz = PinchZoomer.get(pzItemID);
      pz.zoom(1);
    } catch (e) {}

    }
  }
});

//другое переключение слайдов на планшете
//span.next-mob.next-btnMob
//span.prev-mob.prev-btnMob
$('body').on('click', '.prev-btnMob', function(){
  var parentBox = $(this).closest('.product__scroll');
  $(parentBox).find('.product__slider-big .slick-prev').trigger('click');
});
$("body").on('click', '.next-btnMob', function(){
  var parentBox = $(this).closest('.product__scroll');
  $(parentBox).find('.product__slider-big .slick-next').trigger('click');
});



//переключение табов в карточке товаров
$(".info-tab li").on('click', function(){
  var windowWidth = $(window).outerWidth();
  //var windowWidth = $(window).width();
  var tab = $(this).attr('data-tab');

  if($(this).hasClass('active')) {

    if(windowWidth >= 920) {
      return false;
    }
    else {
       $('.info__box.'+tab).slideUp();
       $(this).removeClass('active');

       $('.info-container').find('.accordion__tablet').removeClass('active');
    }

  }
  else {
    $('.info-tab').find('.active').removeClass('active');
    $(this).addClass('active');

    //аккордион таб
    $('.info-container').find('.accordion__tablet').removeClass('active');



    if(tab == "tab2") {
      if(!$('.info__box.tab2').hasClass('qScrollLoaded')) {
        setTimeout(function() {
          var ps = new PerfectScrollbar('.q-scrollBox', {
            suppressScrollX: true,
            scrollingThreshold: 2000
          });
          ps.update();
          $('.info__box.tab2').addClass('qScrollLoaded');
        },50);

      }


    }
    if(tab == "tab3") {
      setTimeout(function() {
        var ps = new PerfectScrollbar('.r-scrollBox', {
          suppressScrollX: true,
          scrollingThreshold: 2000
        });
        ps.update();

      },50);
    }

    if(windowWidth >= 920) {
       $('.info__box:not(.'+tab+')').hide();
       $('.info__box.'+tab).show(0, function() {

          var sBox = $('.info__box.'+tab).find('.qustion__scroll');
          var listHeight = $('.info__box.'+tab).find('.qustion__list').outerHeight();

          if(listHeight >= 370) {
            if(windowWidth >= 1366) {
              $(sBox).css({'height':'370px'});
            }
            else {
              $(sBox).css({'height':'280px'});
            }
          }
          else {
            $(sBox).css({'height':listHeight+35+'px'});
          }

       });
    }
    else {
       $('.info__box:not(.'+tab+')').slideUp();
       $('.info__box.'+tab).slideDown('slow', function() {

          var sBox = $('.info__box.'+tab).find('.qustion__scroll');
          var listHeight = $('.info__box.'+tab).find('.qustion__list').outerHeight();

          if(listHeight >= 370) {
            if(windowWidth >= 1366) {
              $(sBox).css({'height':'370px'});
            }
            else {
              $(sBox).css({'height':'280px'});
            }
          }
          else {
            $(sBox).css({'height':listHeight+20+'px'});
          }
       });
    }

     $('.info-container').find('.accordion__tablet.'+tab).addClass('active');
  }
});

//переключение аккордиона в карточке товара на планшете
$(".accordion__tablet").on('click', function(e){
  e.preventDefault();
  var activeTab = $(this).attr('data-tab');
  $('.info-tab li.'+activeTab).trigger('click');
});

//количество введеных символов Вопросы и предложения
limitChars('.q-textarea', '.q-symbol span');
//количество введеных символов Отзывы
limitChars('.r-textarea', '.r-symbol span');
/*
//переключение по кнопкам в самом слайде
$(".btn-simple").on('click', function(e){
  e.preventDefault();
  var btnClass = $(this).attr('data-btn');
  $('.'+btnClass).trigger('click');

  console.log(btnClass);

});
*/


//ховер по фото в карточке товара в слайдера
$('.pr-big-box').on('mouseenter', function(e) {
  //var windowWidth = $(window).width();
  var windowWidth = $(window).outerWidth();
  // if(windowWidth >=1024) { old_8913
  if(windowWidth >=1025) {
    $(this).css({'width':'100%'});
  }
});

//убираем ховер по фото в карточке товара в слайдера
$('.pr-big-box').on('mouseleave ', function(e) {
  //var windowWidth = $(window).width();
  var windowWidth = $(window).outerWidth();
  // if(windowWidth >=1024) { old_8913
  if(windowWidth >=1025) {
    $(this).removeAttr('style');
  }
});

//показать все свойства товара
$("body").on('click', '.show-prop', function(e){
  e.preventDefault();
  var parentBox = $(this).closest('.pr__block');

  if($(this).hasClass('active')) {
    $(this).removeClass('active').text("Подробнее");
    $(parentBox).find('.properties-list li:not(.prShow)').slideUp();
  }
  else {
    $(this).addClass('active').text("Свернуть");
    $(parentBox).find('.properties-list li').slideDown();
    $(parentBox).find('.properties-list li:nth-child(1), .properties-list li:nth-child(2), .properties-list li:nth-child(3)').addClass('prShow');
  }
});

//показать все цвета товара на мобильном для неавторизованного пользователя
$(".show-all-color").on('click', function(e){
  e.preventDefault();

  if($(this).hasClass('active')) {
    $(this).removeClass('active').text("Смотреть все");
    $('.pr-color-list li:not(.prShow)').slideUp();
  }
  else {
    $(this).addClass('active').text("Свернуть");
    $('.pr-color-list li').slideDown();
    $('.pr-color-list li:nth-child(1), .pr-color-list li:nth-child(2), .pr-color-list li:nth-child(3), .pr-color-list li:nth-child(4)').addClass('prShow');
  }
});


$(".test-link").on('click', function(e){
  e.preventDefault();

  var slide = $(this).attr('data-slide');
  $('.product__slider-container').find('.slick-dots li:nth-child('+slide+')').trigger('click');
});
//увеличение карточки товара как на modaoperandi.com
$(".pr-zoom").on('click', function(e){
  e.preventDefault();
  var windowWidth = $(window).outerWidth();

  if($(this).hasClass('active')) {
    $(".pr-zoom").removeClass('active');
    $('body').removeClass('bodyFix');
    $('.product__container').removeClass('prFix');

    // if(windowWidth <= 1023) { old_8913
    if(windowWidth <= 1024) {

        $('.pr-big-box').find('.pinch-img').show();

        $('.pzItem-box').remove();
        $('.pzItem, .pr-big-box').removeAttr('style');
    }

    setTimeout(function(){
      $('.slider-for').slick('setPosition');
      $('.sl-nav').slick('setPosition');
    }, 50);
    $('.zoom').zoom();



  }
  else {
    $(".pr-zoom").addClass('active');
    $('body').addClass('bodyFix');
    $('.product__container').addClass('prFix');

    $('.slider-for').slick('setPosition');
    $('.sl-nav').slick('setPosition');

    //узнаем количество слайдов в карточке товара
    var sliderParent = $(this).closest('.product__scroll');
    var allLength = $(sliderParent).find('.pr-big-box').length;
    $(sliderParent).find('.slidesLength').text(allLength);
    $('.zoom').trigger('zoom.destroy');

    //если ширина дисплея меньше или равно 1023 запускаем скрипт pinch


    // if(windowWidth <= 1023) { old_8913
    if(windowWidth <= 1024) {

        var boxHeight = parseInt($('.pr-big-box').height());
        $('.pr-big-box').css({'height': boxHeight + 'px'});

        var boxLen = $('.pr-big-box').length;

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      for (var i = 0; i < boxLen; i++) {
        var randomID = getRandomInt(0, 1000000);

        var imgPath = $($('.pr-big-box')[i]).find('.pinch-img').attr('src');

        $($('.pr-big-box')[i]).find('.pzItem').prepend("<div class='pzItem-box' id='pz"+randomID+"'><img class='img-responsive' src='"+imgPath+"'></div>");

        $($('.pr-big-box')[i]).find('.pinch-img').hide();

        $("#pz" + randomID).pinchzoomer();
      }
    }

  }
});




$(".pr-big-box a").on('click', function(e){
  e.preventDefault();
});

/*закрыть окно увеличение карточки товара как на modaoperandi.com */
$(".prClose").on('click', function(e){
  e.preventDefault();
  var windowWidth = $(window).outerWidth();

   // parentSlidersBox = $(this).closest('.product__container');
   //var sliderFor = $(parentSlidersBox).find('.slider-for');
   //var activeSlide = parseInt($(sliderFor).find('.slick-current').attr('data-slick-index'));
   //var parentProduct = $(parentSlidersBox).find('.product__left');

   //$(parentSlidersBox).addClass('active');


  $(".pr-zoom").removeClass('active');
  $('body').removeClass('bodyFix');
  $('.product__container').removeClass('prFix');



  //при закрытии отключаем pinch
  // if(windowWidth <= 1023) { old_8913
  if(windowWidth <= 1024) {
    $('.pr-big-box').find('.pinch-img').show();

    $('.pzItem-box').remove();
    $('.pzItem, .pr-big-box').removeAttr('style');
    $('.zoom').trigger('zoom.destroy');
  }
  else {
    $('.zoom').zoom();
  }

  setTimeout(function(){
    $('.slider-for').slick('setPosition');
    $('.sl-nav').slick('setPosition');
  }, 50);


});


// Слайдер thumb материал страница card-materials.html
$('.materialItemThumb').slick({
  slidesToShow: 4,
  infinite: false,
  focusOnSelect: true,
  asNavFor: '.materialItemBig',
  vertical: true,
  arrows: true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 920,
      settings: {
        slidesToShow: 3,
        vertical: false
      }
    }
  ]
});
 var sliderFor = $('.materialItemBig').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  arrows: true,
  fade: true,
  dots: true,
  asNavFor: '.materialItemThumb'
});



 //показать слайд с выбранным цветом  страница card-materials.html
$(".m-color-box").on('click', function(e){
  e.preventDefault();

  if(!$(this).hasClass('colorShow')) {
    var colorParentList = $(this).closest('.material-color-list');
    var mainParentBox = $(this).closest('.card__material-container');
    var slideActive = $(this).attr('data-slide');
    $(colorParentList).find('.colorShow').removeClass('colorShow');
    var materialSlider = $(mainParentBox).find('.material-big-slider');
    scrollTo($(mainParentBox).offset().top, 1000);
    $(materialSlider).find('.slick-dots li:nth-child('+slideActive+')').trigger('click');
    $(this).addClass('colorShow');
  }

});





//показать все цвета
$(".show-all-material").on('click', function(e){
  e.preventDefault();
  var windowWidth = $(window).outerWidth();

  if($(this).hasClass('active')) {
    $(this).removeClass('active').text("Смотреть все");
    $('.material-color-list li:not(.show-color)').slideUp();

    setTimeout(function(){
      $('.material-color-list li').removeClass('show-color');
    }, 310);
  }
  else {
    $(this).addClass('active').text("Свернуть");
    $('.material-color-list li').slideDown();

  if(windowWidth >= 1800) {
    $('.material-color-list li:nth-child(1), .material-color-list li:nth-child(2), .material-color-list li:nth-child(3), .material-color-list li:nth-child(4), .material-color-list li:nth-child(5), .material-color-list li:nth-child(6), .material-color-list li:nth-child(7), .material-color-list li:nth-child(8), .material-color-list li:nth-child(9), .material-color-list li:nth-child(10), .material-color-list li:nth-child(11), .material-color-list li:nth-child(12), .material-color-list li:nth-child(13), .material-color-list li:nth-child(14)').addClass('show-color');
  }
  else if((windowWidth <= 1799) && (windowWidth >= 768)) {
    $('.material-color-list li:nth-child(1), .material-color-list li:nth-child(2), .material-color-list li:nth-child(3), .material-color-list li:nth-child(4), .material-color-list li:nth-child(5), .material-color-list li:nth-child(6), .material-color-list li:nth-child(7), .material-color-list li:nth-child(8), .material-color-list li:nth-child(9), .material-color-list li:nth-child(10), .material-color-list li:nth-child(11), .material-color-list li:nth-child(12)').addClass('show-color');
  }
  else {
    $('.material-color-list li:nth-child(1), .material-color-list li:nth-child(2), .material-color-list li:nth-child(3), .material-color-list li:nth-child(4), .material-color-list li:nth-child(5), .material-color-list li:nth-child(6), .material-color-list li:nth-child(7), .material-color-list li:nth-child(8), .material-color-list li:nth-child(9), .material-color-list li:nth-child(10)').addClass('show-color');
  }


  }
});


// Слайдер тканей в модалке
$('.color-nav').slick({
  slidesToShow: 6,
  infinite: false,
  focusOnSelect: true,
  arrows: true,
  asNavFor: '.color-for',
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 4
      }
    },
    {
      // breakpoint: 1024,old_8913
      breakpoint: 1025,
      settings: {
        slidesToShow: 6
      }
    }
  ]
});
 var sliderFor = $('.color-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  arrows: true,
  fade: true,
  dots: false,
  asNavFor: '.color-nav'
});

 //открыть модальное окно тканей
$("body").on('click', '.modal-texture',  function(e) {
    e.preventDefault();
      var modalBox = $(this).attr("href");
      var magnificPopup = $.magnificPopup.instance;
      $('body').addClass("texture-open");

    $.magnificPopup.open({
      items: [
        {
          mainClass: 'mfp-with-zoom',
          midClick: true,
          src: modalBox,
          type: 'inline',

              zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out'
              }
        }
      ],
      callbacks: {
        close: function() {
          $('body').removeClass("texture-open");
        }
      }
    });

    $('.color-nav').slick('refresh');
    $('.color-for').slick('refresh');


});

//закрыть модалку тканей
$('.btn-see-other').on('click', function(e){
  e.preventDefault();
  $.magnificPopup.close();
});

//if($('.filter__bottom').is(':hidden'))


//zoom фото в карточке товара как на lamoda
//$('.zoom').zoom();


//$("input[type=tel]").mask('+7 (999) 9999999');

$('.btnUp').on('click', function(e) {
  scrollTo($("header").offset().top + 50, 1000);
});

//количество введенных символов
function limitChars(myObject, typeChars) {
  $(myObject).on('keyup', function(e) {
    var count = $(this).val().length;
    $(typeChars).text(count);
  });
}
/*
function hammerIt(elm) {
		elm = document.getElementById(elm);
    hammertime = new Hammer(elm, {});
    hammertime.get('pinch').set({
        enable: true
    });
    var posX = 0,
        posY = 0,
        scale = 1,
        last_scale = 1,
        last_posX = 0,
        last_posY = 0,
        max_pos_x = 0,
        max_pos_y = 0,
        transform = "",
        el = elm;

    hammertime.on('doubletap pan pinch panend pinchend', function(ev) {
        if (ev.type == "doubletap") {
            transform =
                "translate3d(0, 0, 0) " +
                "scale3d(2, 2, 1) ";
            scale = 2;
            last_scale = 2;
            try {
                if (window.getComputedStyle(el, null).getPropertyValue('-webkit-transform').toString() != "matrix(1, 0, 0, 1, 0, 0)") {
                    transform =
                        "translate3d(0, 0, 0) " +
                        "scale3d(1, 1, 1) ";
                    scale = 1;
                    last_scale = 1;
                }
            } catch (err) {}
            el.style.webkitTransform = transform;
            transform = "";
        }

        //pan
        if (scale != 1) {
            posX = last_posX + ev.deltaX;
            posY = last_posY + ev.deltaY;
            max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
            max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
            if (posX > max_pos_x) {
                posX = max_pos_x;
            }
            if (posX < -max_pos_x) {
                posX = -max_pos_x;
            }
            if (posY > max_pos_y) {
                posY = max_pos_y;
            }
            if (posY < -max_pos_y) {
                posY = -max_pos_y;
            }
        }


        //pinch
        if (ev.type == "pinch") {
            scale = Math.max(.999, Math.min(last_scale * (ev.scale), 4));
        }
        if(ev.type == "pinchend"){last_scale = scale;}

        //panend
        if(ev.type == "panend"){
            last_posX = posX < max_pos_x ? posX : max_pos_x;
            last_posY = posY < max_pos_y ? posY : max_pos_y;
        }

        if (scale != 1) {
            transform =
                "translate3d(" + posX + "px," + posY + "px, 0) " +
                "scale3d(" + scale + ", " + scale + ", 1)";
        }

        if (transform) {
            el.style.webkitTransform = transform;
        }
    });
}
*/

function scrollTo(to) {
    var $obj = jQuery('html, body');
    var top = 0;
    var speed = 500;
    var offsetX = 50;

    if (typeof to == 'object') {
        top = to.offset().top;
    } else if (typeof to == 'string') {
        top = jQuery(to).offset().top;
    } else if (typeof to == 'number') {
        top = to;
    }

    if (arguments.length > 1) {
        if (typeof arguments[0] == 'number' && typeof arguments[1] == 'number') {
            speed = arguments[1];
        } else if (typeof arguments[1] == 'string' || typeof arguments[1] == 'object') {
            if (typeof arguments[1] == 'object') {
                $obj = arguments[1];
            } else if (typeof arguments[1] == 'string') {
                $obj = jQuery(arguments[1]);
            }
        }
        if (typeof arguments[2] == 'number') {
            speed = arguments[2];
        }
    }

    if (jQuery(window).width() < 1000) {
        offsetX = 130;
    }

    if (speed == 0) {
        speed = 1;
    }

    $obj.animate(
        {
            scrollTop: top - offsetX
        },
        speed
    );
}
!function ($) {

    var $win = $(window);

    $(function () {


$('.terms__mob').on({
  click: function () {
    var $header = $(this);
    var $sect = $header.closest('.terms__box');
    var $body = $sect.find('.terms-box-content');
    var topX = $header.offset().top + 70;
    if ($win.width() < 768) {
      if ($sect.hasClass('sub-section--opened')) {
          scrollTo($sect.offset().top + 70, 300);
          $sect.removeClass('sub-section--active');

          $body
              .animate(
                  {
                      height: 'hide',
                      opacity: 'hide'
                  },
                  300,
                  function () {
                      $sect.removeClass('sub-section--opened');
                      $body.removeAttr('style');
                      $header.trigger("sticky_kit:detach");
                  }
              );

      } else {

          scrollTo(topX);
          $sect.addClass('sub-section--active');
          $body.animate({
              height: 'show',
              opacity: 'show'
          }, 500, function () {
              $sect.addClass('sub-section--opened');
              $header
                  .stick_in_parent({
                      offset_top: 60
                  });
          });
      }
    }
    $win.on({
        resize: function () {
            if ($win.width() >= 768) {
                $header.trigger("sticky_kit:detach");
            } else if ($sect.hasClass('sub-section--opened')) {
                $header
                    .stick_in_parent({
                        offset_top: 60
                    });
            }
        }
    });
  }
});




});
}(jQuery);

$(window).scroll(function() {
      var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

      if (top > 250) {
          $('.btnUp').fadeIn()
      }else{
          $('.btnUp').fadeOut();
      }
});

//Выбор цвета
$(".color-box").on('click', function(e){
  e.preventDefault();

    var titleColor = $(this).attr('data-title');
    var countSlide = $(this).attr('data-slide');

    var minCol = parseInt($(this).attr('data-min'));
    var priceProduct = parseInt($(this).attr('data-price'));
    var imgPath = $(this).find('.color-block img').attr('src');

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    var randomID = getRandomInt(0, 1000000);


    if($(this).hasClass('active')) {
      var boxId = $(this).attr('id');
      $('.calc__list').find('#item'+boxId).remove();
      $(this).removeClass('active');
      $(this).removeAttr('id');

    //удаляем цвет товара из ИТОГО
    $('#itemItog'+boxId).remove();

    recalcAllPrice();
    }
    else {
      $(this).addClass('active').attr('id',randomID);

      //цена одной партии
      var priceLot = minCol*priceProduct;

      //преобразуем цену в строку чтобы разделить на тысячные
      var priceLotStr = (stringReplace(priceLot));

      function showView(slideNum) {
        var slideNum = countSlide;
        if (slideNum.length == 0) {
          return ' ' + ' style="display:none;" ' + ' ';
        }
        else {
          return ' ' + ' style="display:inline-block;" ' + ' ';
        }
      }

      $('.calc__list').append(
      '<li class="calc-item calc-pr-item" id="item'+randomID+'">'+
        '<div class="calc-item-top">'+
          '<div class="pr-sub-title"><a href="#modalColor">'+titleColor+'</a></div>'+
          '<div class="pr-sub-title">Укажите кол-во</div>'+
        '</div>'+
        '<div class="calc-item-content">'+
          '<div class="c-item-img"><img class="img-responsive" src="'+imgPath+'" alt="#">'+
          '<a class="view-photo"' + showView() + 'data-slide="'+countSlide+'" href="#">Показать фото</a>'+
            '<input type="hidden" name="colorPr[]" value="'+titleColor+'">'+
          '</div>'+
          '<div class="c-item-col"><span class="btn-minus btn-calc btn-pr-minus"></span>'+
            '<input class="calc-val calc-pr-val" type="text" autocomplete="off" data-step="'+minCol+'" data-min="'+minCol+'" value="'+minCol+'" data-price="'+priceProduct+'"><span class="btn-plus btn-calc btn-pr-plus"></span><span class="calc-item-box calc-pr-item-box">'+
              '<span>1</span>'+
              '<div class="i-box"></div></span>'+
          '</div>'+
          '<div class="c-item-price c-pr-item-price"><span>'+priceLotStr+'</span><i class="rub">₽</i></div>'+
          '<div class="c-item-action"><span class="pr-del pr-del-card" data-item="item'+randomID+'"></span></div>'+
        '</div>'+
      '</li>'
      );


      $('.itog-color-list').append('<li id="itemItog'+randomID+'"><img class="img-responsive" src="'+imgPath+'" alt="#"></li>')
    }
    recalcAllPrice();





});

 //показать слайд с выбранным цветом в карточке товара при клике на ссылку Показать фото
$("body").on('click', '.view-photo', function(e){
  e.preventDefault();
    var mainParentBox = $(this).closest('.product__container');
    var slideActive = $(this).attr('data-slide');
    var productSlider = $(mainParentBox).find('.product__slider-container');
    scrollTo($(mainParentBox).offset().top, 1000);
    $(productSlider).find('.slick-dots li:nth-child('+slideActive+')').trigger('click');
});

 //показать слайд с выбранным цветом в каталоге catalog-retail.html при клике на цвет
$("body").on('click', '.item-vphoto', function(e){
  e.preventDefault();
    var mainParentBox = $(this).closest('.product__container');
    var slideActive = $(this).attr('data-slide');
    var productSlider = $(mainParentBox).find('.product__slider-container');

    var windowWidth = $(window).outerWidth();

    if(windowWidth >= 768) {
      scrollTo($(mainParentBox).offset().top, 1000);
    }
    else {
      scrollTo($(mainParentBox).offset().top+50, 1000);
    }


    $(productSlider).find('.slick-dots li:nth-child('+slideActive+')').trigger('click');
});




//удаляем товар по клику на крестик
$("body").on('click', '.pr-del-card', function(e){
  e.preventDefault();
  var itemId = $(this).attr('data-item');
  var idBox = itemId.replace('item', '');
  //удаляем карточку товара
  $('#'+itemId).remove();

  //удаляем цвет товара из ИТОГО
  $('#itemItog'+idBox).remove();

  //удаляем класс активному цвету
  $("#"+idBox).removeClass('active').removeAttr('id');

  recalcAllPrice();
});

//ф-ия общей суммы добавленных товаров
function recalcAllPrice()
{
    var allPriceCounter = 0;
    var allBoxCounter = 0;
    var allThingCounter = 0;



    $('.calc-pr-item').each(function(){
      //цена товара по одному цвету
      var itemPrice = $(this).find('.c-pr-item-price > span').text().split(' ');
      allPriceCounter += parseInt(itemPrice.join(''), 10);

      //общее количество коробок
      var sumBox = $(this).find('.calc-pr-item-box > span').text();
      allBoxCounter += parseInt(sumBox);

      //сколько всего штук(количество вещей)
      var sumThing = $(this).find('.calc-pr-val').val();
      allThingCounter += parseInt(sumThing);

    });
    if (allPriceCounter > 0) {
        $('.calc__itog').show();

        //сколько всего штук(кол-во вещей) текстом на странице
        $('.itog-value').text(allThingCounter);
        //сколько всего штук(кол-во вещей) в инпут для отправки формы
        $('.itog-pieces').val(allThingCounter);

        //общее кол-во коробок текстом на странице
        $('.itog-box').text(allBoxCounter);
        //общее кол-во коробок в инпут для отправки формы
        $('.itog-boxes').val(allBoxCounter);

        //общая стоимость всей покупки текстом на странице
        allPriceCounter = ""+allPriceCounter+"";
        $('.prPrices-txt').text(stringReplace(allPriceCounter));
        //общая стоимость всей покупки в инпут для отправки формы
        $('.itog-prices').val(stringReplace(allPriceCounter));

        var colorLen = $('.calc__list li').length;
        //заносим общее количество выбранных цветов

        //общее количество выбранных цветов
        $('.pr-sub-title span').text(' ('+colorLen+')');

        //показываем заголовок на мобильном Ваш заказ
        $('.calc__list-title').addClass('calcShow');

    } else {
        $('.calc__itog').hide();
        //обнуляем значение полей
        $('.itog-prices, .itog-boxes, .itog-pieces').val(' ');
        $('.prPrices-txt, .itog-box, .itog-value').empty();
        $('.pr-sub-title span').empty();
        $('.calc__list-title').removeClass('calcShow');
    }
}


//ф-ия для конвертации значений в строку для цены чтобы тысячные выводились через пробел
function stringReplace(myBox) {
  var str = ""+myBox+"";
  return str.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
}


$('body').on('change', '.calc-pr-val', function(e){
    var curVal = parseInt($(this).val());
    var step = parseInt($(this).attr("data-step"));
    var min = parseInt($(this).attr("data-min"));
    var price = parseInt($(this).attr("data-price"));
    var curVal2 = $(this).val();
    //проверяем чтобы были только цифры
    var regexp = /^[0-9]+$/;

    //получаем значение input если оно пустое будет значение NaN
    //если значение пустое или введенное меньше минимального заказа
    if ((curVal2 == "")||(curVal < min) || (curVal2.match(regexp) == null)) {
      //добавляем класс ошибки
      $(this).addClass('error');
      //через 1 секунду убираем класс ошибки
      setTimeout(function(){
        $('.calc-pr-val').removeClass('error');
      },1000);
      //в input заносим значение минимального заказа
      $(this).val(min);

      //получем сколько коробок
      var newValBoxes = Math.ceil(min / step);
      if (newValBoxes < 1) newValBoxes = 1;

      var inputBoxes = $(this).siblings(".calc-pr-item-box > span");
      if (inputBoxes.length) inputBoxes.text(newValBoxes);
      //выбираем родительский блок в котором будем произоводить изменения
      var parentItem = $(this).closest('.calc-pr-item');

      //выводим новое количество коробок на экран
      $(parentItem).find(".calc-pr-item-box > span").text(newValBoxes);

      //получаем сумму заказа
      var bigPrice = (newValBoxes*min*price);

      if(curVal < (newValBoxes*min)) {
        $(this).addClass('error');

        setTimeout(function(){
          $('.calc-pr-val').removeClass('error');
        },1000);
        $(this).val(newValBoxes*min);
      }
      //выводим цену товара на экран
      $(parentItem).find('.c-pr-item-price > span').text(stringReplace(bigPrice));

    }

    else {

      var newValBoxes = Math.ceil(curVal / step);
      if (newValBoxes < 1) newValBoxes = 1;

      var inputBoxes = $(this).siblings(".calc-pr-item-box > span");
      if (inputBoxes.length) inputBoxes.text(newValBoxes);

      var parentItem = $(this).closest('.calc-pr-item');
      $(parentItem).find(".calc-pr-item-box > span").text(newValBoxes);

      var bigPrice = (newValBoxes*min*price);

      if(curVal < (newValBoxes*min)) {
        $(this).addClass('error');

        setTimeout(function(){
          $('.calc-pr-val').removeClass('error');
        },1000);
        $(this).val(newValBoxes*min);
      }

      $(parentItem).find('.c-pr-item-price > span').text(stringReplace(bigPrice));

  }
    recalcAllPrice();
});

$('body').on('keyup', '.calc-pr-val', function(e){
    var curVal = parseInt($(this).val());
    var min = parseInt($(this).attr("data-min"));
    var curVal2 = $(this).val();

    if ((curVal2 == "")||(curVal < min)) {
      $(this).addClass('error');
    }
    else {
      $(this).removeClass('error');
    }
});

//изменение значений по стрелкам влево/вправо
$('body').on('click', '.btn-pr-minus, .btn-pr-plus', function(e){
  e.preventDefault();
    var input = $(this).siblings(".calc-pr-val");
    var step = parseInt(input.attr("data-step"));

    var newVal = parseInt(input.val());
    newVal = $(this).is(".btn-pr-plus")
        ? newVal + step
        : newVal - step
    ;
    input.val(newVal);
    input.trigger("change");

    var parentItem = $(this).closest('.calc-pr-item');

    e.preventDefault();
});

/*
  КОРЗИНА
*/

//ф-ия общей суммы добавленных товаров в корзине
function recalcAllPriceBasket()
{
    var allPriceCounter = 0;
    var allBoxCounter = 0;
    var allThingCounter = 0;



    $('.calc-basket-item').each(function(){
      //цена товара по одному цвету
      var itemPrice = $(this).find('.c-basket-item-price > .basket-pr-price span').text().split(' ');
      allPriceCounter += parseInt(itemPrice.join(''), 10);

      //общее количество коробок
      var sumBox = $(this).find('.calc-basket-item-box > span').text();
      allBoxCounter += parseInt(sumBox);

      //сколько всего штук(количество вещей)
      var sumThing = $(this).find('.calc-basket-val').val();
      allThingCounter += parseInt(sumThing);

    });
    if (allPriceCounter > 0) {
        $('.basket__bottom-action').show();

        //сколько всего штук(кол-во вещей) текстом на странице
        $('.itog-value').text(allThingCounter);
        //сколько всего штук(кол-во вещей) в инпут для отправки формы
        $('.itog-pieces').val(allThingCounter);

        //общее кол-во коробок текстом на странице
        $('.itog-box').text(allBoxCounter);
        //общее кол-во коробок в инпут для отправки формы
        $('.itog-boxes').val(allBoxCounter);

        //общая стоимость всей покупки текстом на странице
        allPriceCounter = ""+allPriceCounter+"";
        $('.prPrices-txt').text(stringReplace(allPriceCounter));
        //общая стоимость всей покупки в инпут для отправки формы
        $('.itog-prices').val(stringReplace(allPriceCounter));

        var colorLen = $('.calc__list li').length;
        //заносим общее количество выбранных цветов

        //общее количество выбранных цветов
        $('.pr-sub-title span').text(' ('+colorLen+')');

        //показываем заголовок на мобильном Ваш заказ
        $('.calc__list-title').addClass('calcShow');

    } else {
        $('.basket__bottom-action').hide();
        //обнуляем значение полей
        $('.itog-prices, .itog-boxes, .itog-pieces').val(' ');
        $('.prPrices-txt, .itog-box, .itog-value').empty();
        $('.pr-sub-title span').empty();
        $('.calc__list-title').removeClass('calcShow');
    }
}

//удаляем товар по клику на крестик в корзине
$("body").on('click', '.pr-del-basket', function(e){
  e.preventDefault();
  var itemId = $(this).attr('data-item');
  var idBox = itemId.replace('item', '');
  var parentBox = $(this).closest('.basket__content');
  //удаляем карточку товара
  $('#'+itemId).remove();

  //удаляем цвет товара из ИТОГО
  $('#itemItog'+idBox).remove();

  //удаляем класс активному цвету
  $("#"+idBox).removeClass('active').removeAttr('id');



  recalcAllPriceBasket();

  //если в карточке в корзине удалить все цвета, удаляем саму карточку
  var basketItem = $(parentBox).find('.calc-basket-item').length;


  if(basketItem == 0) {
    $(parentBox).remove();
  }

  countBasketBox();
});

//Количество карточек в корзине
function countBasketBox(){

  var basketCount = $('.basket__container').find('.basket__content').length;

  if(basketCount == 0) {
    $('.basket__promo, .basket__bottom').remove();

    $('.basket__container').prepend('<div class="title-box basket-title-error"><div class="h1">Ваша корзина пуста</div></div>');
  }

}

//ручное изменение значения в корзине
$('body').on('change', '.calc-basket-val', function(e){
    var curVal = parseInt($(this).val());
    var step = parseInt($(this).attr("data-step"));
    var min = parseInt($(this).attr("data-min"));
    var price = parseInt($(this).attr("data-price"));
    var discount = parseInt($(this).attr("data-discount"));
    var curVal2 = $(this).val();
    //проверяем чтобы были только цифры
    var regexp = /^[0-9]+$/;

    //получаем значение input если оно пустое будет значение NaN
    //если значение пустое или введенное меньше минимального заказа
    if ((curVal2 == "")||(curVal < min) || (curVal2.match(regexp) == null)) {
      //добавляем класс ошибки
      $(this).addClass('error');
      //через 1 секунду убираем класс ошибки
      setTimeout(function(){
        $('.calc-basket-val').removeClass('error');
      },1000);
      //в input заносим значение минимального заказа
      $(this).val(min);

      //получем сколько коробок
      var newValBoxes = Math.ceil(min / step);
      if (newValBoxes < 1) newValBoxes = 1;

      var inputBoxes = $(this).siblings(".calc-basket-item-box > span");
      if (inputBoxes.length) inputBoxes.text(newValBoxes);
      //выбираем родительский блок в котором будем произоводить изменения
      var parentItem = $(this).closest('.calc-basket-item');

      //выводим новое количество коробок на экран
      $(parentItem).find(".calc-basket-item-box > span").text(newValBoxes);

      //получаем сумму заказа
      var bigPrice = (newValBoxes*min*price);

      if(curVal < (newValBoxes*min)) {
        $(this).addClass('error');

        setTimeout(function(){
          $('.calc-basket-val').removeClass('error');
        },1000);
        $(this).val(newValBoxes*min);
      }

      //если есть скидка просчитываем с учетом скидки
      if(discount >= 1) {
        var priceDiscount = (bigPrice-discount);
        //выводим цену товара на экран с учетом скидки
        $(parentItem).find('.c-basket-item-price > .basket-pr-price span').text(stringReplace(priceDiscount));
        //выводим цену товара на экран без скидки
        $(parentItem).find('.c-basket-item-price > .basket-item-old-price span').text(stringReplace(bigPrice));
      }
      else {
        $(parentItem).find('.c-basket-item-price > .basket-pr-price span').text(stringReplace(bigPrice));
      }


    }

    else {

      var newValBoxes = Math.ceil(curVal / step);
      if (newValBoxes < 1) newValBoxes = 1;

      var inputBoxes = $(this).siblings(".calc-basket-item-box > span");
      if (inputBoxes.length) inputBoxes.text(newValBoxes);

      var parentItem = $(this).closest('.calc-basket-item');
      $(parentItem).find(".calc-basket-item-box > span").text(newValBoxes);

      var bigPrice = (newValBoxes*min*price);

      if(curVal < (newValBoxes*min)) {
        $(this).addClass('error');

        setTimeout(function(){
          $('.calc-basket-val').removeClass('error');
        },1000);
        $(this).val(newValBoxes*min);
      }

      //если есть скидка просчитываем с учетом скидки
      if(discount >= 1) {
        var priceDiscount = (bigPrice-discount);
        //выводим цену товара на экран с учетом скидки
        $(parentItem).find('.c-basket-item-price > .basket-pr-price span').text(stringReplace(priceDiscount));
        //выводим цену товара на экран без скидки
        $(parentItem).find('.c-basket-item-price > .basket-item-old-price span').text(stringReplace(bigPrice));
      }
      else {
        $(parentItem).find('.c-basket-item-price > .basket-pr-price span').text(stringReplace(bigPrice));
      }

  }
    recalcAllPriceBasket();
});


$('body').on('keyup', '.calc-basket-val', function(e){
    var curVal = parseInt($(this).val());
    var min = parseInt($(this).attr("data-min"));
    var curVal2 = $(this).val();

    if ((curVal2 == "")||(curVal < min)) {
      $(this).addClass('error');
    }
    else {
      $(this).removeClass('error');
    }
});


//изменение значений по стрелкам влево/вправо в корзине
$('body').on('click', '.btn-basket-minus, .btn-basket-plus', function(e){
  e.preventDefault();
    var input = $(this).siblings(".calc-basket-val");
    var step = parseInt(input.attr("data-step"));

    var newVal = parseInt(input.val());
    newVal = $(this).is(".btn-basket-plus")
        ? newVal + step
        : newVal - step
    ;
    input.val(newVal);
    input.trigger("change");

    var parentItem = $(this).closest('.calc-basket-item');

    e.preventDefault();
});

//показать инфо окно со скидкой
$('.b-help-btn').on('click', function(funHelp){
  funHelp.preventDefault();
  var parentHelp = $(this).closest('.b-discount-help');
  if($(this).hasClass('active')) {
    $(this).parent().find('.b-help-modal').fadeOut();
    $(this).removeClass('active');
    $(parentHelp).removeClass('active');
  }
  else {
    $('.b-help-modal').fadeOut();
    $('.b-help-btn').removeClass('active');
    $('.b-discount-help').removeClass('active');

    $(this).parent().find('.b-help-modal').fadeIn();
    $(this).addClass('active');
    $(parentHelp).addClass('active');
  }
  funHelp.stopPropagation()

});
//закрыть инфо окно со скидкой
$('.b-help-close').on('click', function(e){
  e.preventDefault();
  var parentHelp = $(this).closest('.b-discount-help');
  $(parentHelp).find('.b-help-btn').trigger('click');
});


$('.b-help-modal, .b-discount-help').on('click', function(funHelp){
    funHelp.stopPropagation()
});
$("body").on('click', function(){
  $('.b-help-modal').fadeOut();
  $('.b-help-btn').removeClass('active');
  $('.b-discount-help').removeClass('active');
});

//показать подробную информацию в корзине по товара
$('.b-accordion-btn').on('click', function(e){
  e.preventDefault();
  var parentBox = $(this).closest('.basket__text');

  var dropAccordion = $(parentBox).find('.basket-accordion');

  if( dropAccordion.is(':hidden') ) {
    $(dropAccordion).slideDown();
    $(this).parent().addClass('active');
    $(this).text('Свернуть');
  }
  else {
    $(dropAccordion).slideUp();
    $(this).parent().removeClass('active');
    $(this).text('Подробнее');
  }


});


//окно благодарности в корзине

//открыть модальное окно
$(".btn-basket").on('click',  function(e) {
    e.preventDefault();
      var modalBox = $(this).attr("data-modal");
      var magnificPopup = $.magnificPopup.instance;
      $('body').addClass("saccess-open");

    $.magnificPopup.open({
      items: [
        {
          mainClass: 'mfp-with-zoom',
          midClick: true,
          src: modalBox,
          type: 'inline',

              zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out'
              }
        }
      ],
      callbacks: {
        close: function() {
          $('body').removeClass("saccess-open");
        }
      }
    });


});

$('.photo-change').on('click', function(e){
  e.preventDefault();
  var imgPath = $(this).attr('data-img');
  var parentBox = $(this).closest('.basket__box');
  $(parentBox).find('.basket__img img').attr('src',imgPath);
});


/*end basket*/


//продолжить покупки
$('.continue-shop').on('click', function(e){
  e.preventDefault();
  $.magnificPopup.close();
});

$('.scroll-link').on('click', function(e) {

  var windowWidth = $(window).outerWidth();
  var locationLink = $(this).attr('href');

  if(windowWidth >= 768 ) {
    e.preventDefault();
    var scrollBox = $(this).attr('data-scroll');
    scrollTo($(scrollBox).offset().top + 100, 1000);
  }


});

//поиск в каталоге
$('.f-btn-search').on('click', function(e) {
  e.preventDefault();
  var boId = $(this).attr('data-filter');

  if(!$(this).hasClass('active')) {
    $('#'+boId).fadeIn();
    $(this).addClass('active');
  }
  else {
    $('#'+boId).fadeOut();
    $(this).removeClass('active');
  }

});


/* JS КОД ДЛЯ ФИЛЬТРА НА СТРАНИЦАХ КАТАЛОГА*/
/*
  1 проверить открыт ли блок фильтра

*/
$('.f-btn-sort').on('click', function(e) {
  e.preventDefault();
  var boId = $(this).attr('data-filter');

  if(!$(this).hasClass('active')) {
    if($('.filter__bottom').is(':hidden')) {
      $('.sort-overflow').slideDown();

      //var windowWidth = $(window).outerWidth();
      var windowWidth = $(window).width();

      if((windowWidth <= 1799) && (windowWidth >= 768)) {
        $('.filter__list-box').slideUp();
        $('.btn-show-filter').removeClass('active');
      }
    }
    else {
      $('.filter__bottom').slideUp();
      $('.sort-overflow').slideDown();
      $('.filter__box').removeClass('activeBox').fadeOut();
      var windowWidth = $(window).outerWidth();
      //var windowWidth = $(window).width();

      if((windowWidth <= 1799) && (windowWidth >= 768)) {
        $('.filter__list-box').slideUp();
        $('.btn-show-filter').removeClass('active');
      }
    }

    $('#'+boId).slideDown();
    $(this).addClass('active');
    $('.filter__list').find('.active').removeClass('active');
  }
  else {
    $('.sort-overflow').slideUp();
    $('#'+boId).slideUp();
    $(this).removeClass('active');
  }

});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//добавляем выбранному чекбоксу/радиокнопке свой id
$('.label-btn').on('click', function(e) {
  var inputBox = $(this).parent().find('input');

  if(!$(inputBox).hasClass('activeChecked')) {
    var randomID = getRandomInt(0, 1000000);
    $(this).attr('id', 'label'+randomID);
    $(this).parent().find('input').attr('data-id','label'+randomID);
    setTimeout(function(){activeBtnAllChecked();},50);
  }


});

//если по штучно выбрали все пункты, выделяем кнопку выбрать все
function activeBtnAllChecked() {
  var parentBox = $('.filterActive');

  var checkCol = $(parentBox).find('input:checked').length;
  var checkBoxCol = $(parentBox).find('.label-btn').length;

  if(checkCol == checkBoxCol) {
    $(parentBox).find('.check-inputAll').addClass('active');
  }
  else {
    $(parentBox).find('.check-inputAll').removeClass('active');
  }
}



//показать значения фильтра на мобильном
$('.btn-apply').on('click', function(e) {
  e.preventDefault();

  var parentBox = $(this).closest('.filter__mobile-box');
  var titleBox = $(parentBox).find('.fm-title span').text();

  var inputLen = $(parentBox).find('input:checked').length;
  //проверяем есть ли выбранные параметры, если есть выполняем условия, а если нет, просто закрываем фильтр

  if (inputLen > 0) {

    //если блок со значениями скрыт, показываем его
    if($('.filter__value').is(':hidden')) {
      $('.filter__value, .filter__clear').show();
      $('.filter__clear').addClass('active');
    }

    //если фильтр до этого уже выбирали, и снова решели добавить параметры, то делаем проверку, создаем новый блок или в существующий добавляем параметр
    if($(parentBox).hasClass('filterShowPage')) {
      var boxID = $(parentBox).attr('id');

      $('.filter-v-box.filter'+boxID).find('.filter-v-option').remove();

      var inputLen = $(parentBox).find('input:checked').length;
      var labelText, labelID, inputName;
      for (var i = 0; i < inputLen; i++) {
        inputName = $($(parentBox).find('input:checked')[i]).attr("name");
        labelID = $($(parentBox).find('input:checked + label')[i]).attr("id");
        labelText = $($(parentBox).find('input:checked + label')[i]).text();
        $('.filter-v-box.filter'+boxID).append('<div class="filter-v-option" data-id="'+labelID+'"><span>'+labelText+'</span><input type="hidden" name="'+inputName+'" value="'+labelText+'"></div>');

        $($(parentBox).find('input:checked')[i]).attr('data-id',labelID).addClass('activeChecked');
      }

    }
    else {
      var randomID = getRandomInt(0, 1000000);
      $(parentBox).addClass('filterShowPage').attr('id',randomID);

      var filterBoxID = $(parentBox).attr('id');

      $('.filter-content').append(
  '<div class="filter-v-box filter'+filterBoxID+'" data-id="'+filterBoxID+'">'+
    '<div class="filter-v-title">'+titleBox+':</div>'+
  '</div>');


      var inputLen = $(parentBox).find('input:checked').length;
      var labelText, labelID, inputName;
      for (var i = 0; i < inputLen; i++) {
        inputName = $($(parentBox).find('input:checked')[i]).attr("name");
        labelID = $($(parentBox).find('input:checked + label')[i]).attr("id");
        labelText = $($(parentBox).find('input:checked + label')[i]).text();
        $('.filter-v-box.filter'+filterBoxID).append('<div class="filter-v-option" data-id="'+labelID+'"><span>'+labelText+'</span><input type="hidden" name="'+inputName+'" value="'+labelText+'"></div>');

        $($(parentBox).find('input:checked')[i]).attr('data-id',labelID).addClass('activeChecked');
      }

    }
    $('.filter__mobile').fadeOut();
    $('body').removeClass('filterShow');
    $('html').removeClass('htmlFix');

  }//end inputLen

  else {
    //иначе если значение выбранных параметров равно == 0, удаляем блок со странице, и у фильтра удаляем класс активности
    $('.filter__mobile').fadeOut();
    $('body').removeClass('filterShow');
    $('html').removeClass('htmlFix');

    var boxID = $(parentBox).attr('id');

    $(parentBox).removeClass('filterShowPage');
    $('.filter__value').find('.filter'+boxID).remove();

    hideFilterContainer();

  }
  //showClearBtn();

});

// показать кнопку очисить фильтр на мобильном
function showClearBtn() {
  var filterBoxLen = $('.filter__value').find('.filter-v-box').length;
  if(filterBoxLen >= 1) {
    $('.filter__clear').fadeIn().addClass('active');
  }
  else {
    $('.filter__clear').fadeOut().removeClass('active');
  }
}

//выбрать все чекбоксы на мобильном
$('.check-inputAll').on('click', function(){

  $prentBox = $(this).closest('ul');

  if($(this).hasClass('active')){
    $(this).removeClass('active');
    $prentBox.find('input').prop("checked", false);
  }
  else{
    $(this).addClass('active');

    var labelLen = $prentBox.find('.label-btn').length;
    for (var i = 0; i < labelLen; i++) {
      var randomID = getRandomInt(0, 1000000);
      $($prentBox.find('.label-btn')[i]).attr('id', 'label'+randomID);
    }
    $prentBox.find('input').prop("checked", true);

  }


});

//удалить выбранный параметр фильтра на мобильном
$('body').on('click', '.filter-v-option', function(e) {
  e.preventDefault();

  var parentBox = $(this).closest('.filter-v-box');

  //id фильтра в котром удаляем выбранные параметры
  var filterID = $(parentBox).attr('data-id');

  //получаем id чекбокса/радиокнопки которая была выбранна в фильтре
  var labelID = $(this).attr('data-id');
  //снимаем галочку активного фильтра
  $('.fm-list').find('input[data-id = '+labelID+']').removeClass('activeChecked');
  $('.fm-list').find('input[data-id = '+labelID+']').prop("checked", false);
  //удаляем его из списка выбранных фильтров
  $(this).remove();

  //удаляем/добавляем класс активности кнопке выбрать все чекбоксы
  var checkCol = $('#'+filterID).find('input:checked').length;
  var checkBoxCol = $('#'+filterID).find('.label-btn').length;

  if(checkCol == checkBoxCol) {
    $('#'+filterID).find('.check-inputAll').addClass('active');
  }
  else {
    $('#'+filterID).find('.check-inputAll').removeClass('active');
  }

  //если удалили все параметры в выбранном фильтре удаляем у фильтра класс активности
   var colOption = $(parentBox).find('.filter-v-option').length;

   if(colOption == 0) {
     $('#'+filterID).find('input').prop("checked", false);
    $('#'+filterID).removeClass('filterShowPage');
    $(parentBox).remove();
   }

   hideFilterContainer();
   //showClearBtn();


});

//если нет других выбранных фильтров то скрываем и сам контейнер для фильтров
function hideFilterContainer() {
  var filterBoxLen = $('.filter__value').find('.filter-v-box').length;
  if(filterBoxLen == 0) {
    $('.filter__value, .filter__clear').hide();
    $('.filter__clear').removeClass('active');
  }
}

//показать фильтр
$('.btn-filter').on('click', function(e) {
  e.preventDefault();
  var filerId = $(this).attr('data-filter');

  //получаем id фильтра
  var windowWidth = $(window).outerWidth();
  //var windowWidth = $(window).width();
  //показать фильтр на мобильном
  if(windowWidth <= 767) {
    $('.filter__mobile').fadeIn();
    $('html').addClass('htmlFix');
    $('body').addClass('filterShow');
     $('.filter__mobile-box:not(.'+filerId+')').hide();
     $('.filter__mobile-box.'+filerId).show().addClass('filterActive');
  }
  else {

    //скрваем блок сортировки
    $('#f_sort').slideUp();
    $('.f-btn-sort').removeClass('active');
    $('.sort-overflow').slideUp();

    //показываем активный фильтр
    if($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('#'+filerId).slideUp();
      $('.filter__bottom').slideUp();
    }
    else {
      $('.filter__box').removeClass('activeBox').hide(0);
      
      $('.filter__list').find('.active').removeClass('active');

      $(this).addClass('active');
      $('#'+filerId).show().addClass('activeBox');

      $('.filter__bottom').slideDown();
    }

  }
}); 

/*Закрыть фильтр на мобильном*/
$('.fm-close, .btn-cancel').on('click', function(e) {
  e.preventDefault();
  $('.filter__mobile').fadeOut();
  $('body').removeClass('filterShow');
  $('html').removeClass('htmlFix');
  $('.filter__mobile-box').removeClass('filterActive');

  var parentBox = $(this).closest('.filter__mobile-box');

  $(parentBox).find('input:not(.activeChecked)').prop("checked", false);
  $(parentBox).find('input.activeChecked').prop("checked", true);

    var checkCol = $(parentBox).find('input:checked').length;
    var checkBoxCol = $(parentBox).find('.label-btn').length;

    if(checkCol == checkBoxCol) {
      $(parentBox).find('.check-inputAll').addClass('active');
    }
    else {
      $(parentBox).find('.check-inputAll').removeClass('active');
    }

});
//сброс формы фильтра Мобильный
$('.reset-filter').on('click', function(e) {
  //сбрасываем форму фильтра
  $('#filterFormMobile')[0].reset();
  //удаляем класс активного фильтра
  $('.filter__mobile-box').removeClass('filterShowPage');
  //сбрасываем все значения чекбоксов/радиобоксов
  $('.filter__mobile-box').find('input').prop("checked", false);
  //удаляем класс активного чекбокса/радиобокса
  $('.filter__mobile-box').find('input').removeClass('activeChecked');
  //удаляем класс у кнопке выбрать все
  $('.check-inputAll').removeClass('active');
  //очищаем контейнер для фильтра
  $('.filter-content').html('');
  //скрываем блок для выбранных фильтров
  $('.filter__value, .filter__clear').hide();
  $('.filter__clear').removeClass('active');
});

//сброс формы фильтра ПК
$('.btn-clear').on('click', function (e) {
    e.preventDefault();
    var windowWidth = $(window).outerWidth();

    if (windowWidth >= 768) {
        $('.filter__list li i').text('');
        $('#filterForm')[0].reset();

        $('.cheked-all').removeClass('active');

        //если открыта сортировка то скрываем все фильтры кроме сортировки
        if ($('.f-btn-sort').hasClass('active')) {
            $('.filter__box, .filter__clear').fadeOut();
            $('.filter__clear').removeClass('active');
        }
        else {
            $('.filter__box').slideUp('slow', function () {

                $('.filter__bottom').slideUp('slow', function () {
                    $('.filter__clear').fadeOut().removeClass('active');
                    $('.filter__box').removeClass('activeBox');
                    $('.btn-filter').removeClass('active');

                });

            });

        }
    }
    else {
        $('.reset-filter').trigger('click');
        $('.filter__clear').fadeOut().removeClass('active');
    }
});

function checkedActiveAll() {
  var checkCol = $('#filterForm input.f-int:checked').length;
  if(checkCol >= 1) {
    $('.filter__clear').fadeIn().addClass('active');
  }
  else {
    $('.filter__clear').fadeOut().removeClass('active');
  }
}

function checkedActiveBox() {
  var parentBox = $('.activeBox').attr('id');
  //filter__box
  var checkCol = $('#'+parentBox+' input.f-int:checked').length;
  var checkBoxCol = $('#'+parentBox+' input.f-int').length;
  if(checkCol >= 1) {
    $('.filter__list li[data-filter = '+parentBox+' ] i').text('('+ checkCol +')');

    if(checkCol == checkBoxCol) {
      $('#'+parentBox).find('.cheked-all').addClass('active');
    }
    else {
      $('#'+parentBox).find('.cheked-all').removeClass('active');
    }

  }
  else {
    $('.filter__list li[data-filter = '+parentBox+' ] i').text('');
  }
}
//показываем кнопку сброса
$('#filterForm .f-click').on('click', function(){
  setTimeout(function(){checkedActiveAll(); checkedActiveBox();},50);
});

//показываем кнопку при выборе категорий
$('#filterForm .click-radio').on('click', function(){
  $('.filter__clear').fadeIn().addClass('active');
});

//выбрать все чекбоксы
$('.cheked-all').on('click', function(){

  $prentBox = $(this).closest('ul');

  if($(this).hasClass('active')){
    $(this).removeClass('active');
    $prentBox.find('input').prop("checked", false);

    checkedActiveBox();
    checkedActiveAll();
  }
  else{
    $(this).addClass('active');
    $prentBox.find('input').prop("checked", true);

    checkedActiveBox();
    checkedActiveAll();

  }


});

//Размерный ряд
$('.label-check').on('click', function(){
  setTimeout(function(){checkedActiveAll(); checkedActiveBox();},50);
});

//Добавлено за неделю
$('.switcher-link').on('click', function(e) {
  e.preventDefault();
  var parentBox  = $(this).closest('.filter__switcher');

  if($(parentBox).hasClass('active')) {
    $(parentBox).removeClass('active');
  }
  else {
    $(parentBox).addClass('active');
  }

});

/*END JS КОДА ДЛЯ ФИЛЬТРА НА СТРАНИЦАХ КАТАЛОГА*/

/*
var psNav = new PerfectScrollbar('.nav__scroll', {
  suppressScrollX: true
});
*/

//ф-ия показать меню на мобильном
function mobNavShow() {
  if($('.touch-nav').hasClass('active')) {
    $('.nav__content').removeClass('menuShow');
    $('html').removeClass('htmlFix');
    $('body').removeClass('navFix');$('.nav-hide').hide();
    $('.nav__container').fadeOut();
    $('.touch-nav').removeClass('active');
  }
  else {
    $('html').addClass('htmlFix');
    $('body').addClass('navFix');
    $('.touch-nav').addClass('active');
    $('.nav__container').fadeIn();
   $('.nav-hide').show();$('.nav__content').addClass('menuShow');
    /*psNav.update();   */
  }
}
//вызов ф-ии показать меню на мобильном
$('.touch-nav').on('click', function(funTouch) {
  funTouch.preventDefault();

  if($('.head-xs-search').hasClass('active')) {
    $('.head-xs-search').trigger('click');
    setTimeout(function(){mobNavShow();},310);
    //mobNavShow();
  }
  else {
    mobNavShow();
  }

  if($(".account-btn").hasClass('active')) {
      $('.personal__modal, .personal-bg').hide();
      $(".account-btn").removeClass('active');
  }

  funTouch.stopPropagation()

});

$(".nav__scroll").on('click', function(funTouch){
    funTouch.stopPropagation()
});
$("body").on('click', function(){
  if($('.touch-nav').hasClass('active')) {
    $('.touch-nav').trigger('click');
  }
});

// показать фильтры на ПК width=1366
$('.btn-show-filter').on('click', function(e) {
  e.preventDefault();
  //var windowWidth = $(window).width();
  var windowWidth = $(window).outerWidth();

  if($(this).hasClass('active')) {
    $(this).removeClass('active');
    $('.filter__list-box').slideUp();

    if((windowWidth <= 1799) && (windowWidth >= 768)) {
      $('.filter__list').find('.btn-filter.active').trigger('click');
    }
  }
  else {
    $(this).addClass('active');
    $('.filter__list-box').slideDown();

    if((windowWidth <= 1799) && (windowWidth >= 768)) {
      if($('.f-btn-sort').hasClass('active')) {
        $('.f-btn-sort').trigger('click');
      }
    }
  }

});
// показать Выдачу на мобильном width=767
$('.btn-filter-view').on('click', function(e) {
  e.preventDefault();

  if($(this).hasClass('active')) {
    $(this).removeClass('active');
    $('.filter__card-views').slideUp();
  }
  else {
    $(this).addClass('active');
    $('.filter__card-views').slideDown();
  }

});


// ф-ия показать поиск на мобильном
function mobSearchShow() {

  if($('.head-xs-search').hasClass('active')) {
    $('.m-search-form').removeClass('searchShow');
    $('.m-search-hide').hide();
    $('.m-header__search').fadeOut();
    $('.head-xs-search').removeClass('active');
  }
  else {
    $('.head-xs-search').addClass('active');
    $('.m-header__search').fadeIn();
    $('.m-search-hide').show();
    $('.m-search-form').addClass('searchShow');
  }
}

// вызов ф-ии показать поиск на мобильном
$('.head-xs-search').on('click', function(funSearch) {
  funSearch.preventDefault();

  if($('.touch-nav').hasClass('active')) {
    $('.touch-nav').trigger('click');
    mobSearchShow();
  }
  else {
    mobSearchShow();
  }

  if($('.account-btn').hasClass('active')) {
    //$('.personal__modal, .personal-bg').fadeOut();
    $('.personal__modal, .personal-bg').hide();
    $('.account-btn').removeClass('active');
  }

  funSearch.stopPropagation()




});
$(".m-search-form").on('click', function(funSearch){
  funSearch.stopPropagation()
});
$("body").on('click', function(){
  if($('.head-xs-search').hasClass('active')) {
    $('.m-search-form').removeClass('searchShow');
    $('.m-header__search').fadeOut();
    $('.m-header__search').hide();
    $('.head-xs-search').removeClass('active');
  }
});


//закрыть поиск на мобильном вне области поиска
$('.m-search-hide').on('click', function(e) {
  e.preventDefault();
  $('.head-xs-search').trigger('click');
});

//закрыть мобильное меню клик вне области меню
$('.nav-hide').on('click', function(e) {
  e.preventDefault();
  $('.touch-nav').trigger('click');
});


//показать меню для авторизованного пользователя на мобильном
$('.cabinet-btn-show').on('click', function(e) {
  e.preventDefault();

  if($(this).hasClass('disable')) {
    return false;
  }
  else {
    $(this).addClass('disable');

    if($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active');

      $('.nav__cabinet-box').fadeOut();

      setTimeout(function(){
        $('.menu-xs, .nav-phone').fadeIn();
        //psNav.update();
      },310);

    }
    else {
        $('.menu-xs, .nav-phone').fadeOut();
        $(this).parent().addClass('active');

      setTimeout(function(){
        $('.nav__cabinet-box').fadeIn();
        //psNav.update();
      },310);
    }

      setTimeout(function(){
        $('.cabinet-btn-show').removeClass('disable');
      },310);
  }

});
//закрыть меню кабинета
$('.close-cabinet').on('click', function(e) {
  e.preventDefault();
  $('.cabinet-btn-show').trigger('click');
});

// фунция для показа уровней меню на мобильном
function showMobileMenu(item, menuClass) {
  var itemParent = $(item).parent('li');
  var dropMenu = $(itemParent).find(menuClass);

  if($(item).hasClass('active')) {
    $(item).removeClass('active');
    $(dropMenu).slideUp();
  }
  else {
    $(item).addClass('active');
    $(dropMenu).slideDown();
  }

}
//первый уровень меню на мобильном
$('.btn-parent').on('click', function(e) {
  e.preventDefault();
  var item = $(this);
  showMobileMenu(item,'.dropdown__nav');
  setTimeout(function(){
    //psNav.update();
  },310);
});
//второй уровень меню на мобильном
$('.btn-child').on('click', function(e) {
  e.preventDefault();
  var item = $(this);
  showMobileMenu(item,'.menu-sub');
  setTimeout(function(){
    //psNav.update();
  },310);
});

//показываем меню вид пк на больших планшетах т.е. у которых разрешение дисплея 1024 и больше
// вид сайта показывается как на пк и вызывается только на стрелку
$('.btnShowNav').on('click', function(funPcMenu) {
  funPcMenu.preventDefault();
  var parentItem = $(this).closest('.parent');

  if($(this).hasClass('active')) {
    $(this).removeClass('active');
    $(parentItem).find('.drop-down').removeAttr('style');
  }
  else {
    $(this).addClass('active');
    $(parentItem).find('.drop-down').css({'visibility':'visible', 'opacity':'1'});
  }
  funPcMenu.stopPropagation()
});

$(".drop-down").on('click', function(funPcMenu){
  if($('body').hasClass('mobile')) {
    funPcMenu.stopPropagation()
  }
});
$("body").on('click', function(){
  if($('body').hasClass('mobile')) {
    $('.btnShowNav').removeClass('active');
    $('.drop-down').removeAttr('style');
  }
});

/*Показать все пункты меню на мобильном в футтере*/
$('.f-show-mob span').on('click', function(e) {
  e.preventDefault();

  if($(this).parent().hasClass('active')) {
    $(this).parent().removeClass('active');
    $('.f-nav li:not(.fNavShow), .f-nav + .f-nav').slideUp();
  }
  else {
    $(this).parent().addClass('active');
    $('.f-nav, .f-nav li').slideDown();
    $('.f-nav li:nth-child(1), .f-nav li:nth-child(2), .f-nav li:nth-child(3), .f-nav li:nth-child(4)').addClass('fNavShow');
  }

});


/*Выбор метода авторизации в модалке на мобильном*/
$('.a-option-list a').on('click', function(e) {
  e.preventDefault();
  var modalTab = $(this).attr('data-tab');
  $('.modal__tab li.'+modalTab).trigger('click');
  $('.auth-option-box').hide();
});

/*Возврат к выбору метода авторизации в модалке на мобильном*/
$(".back-parent").on('click', function(e){
  $('.auth-option-box').show();
  $('.modal__tab li:first-child').trigger('click');

  hideForgotForm();
});

//кнопка назад в модальном окне - форма Забыли пароль? не Беда!
$(".back-child").on('click', function(e){
  hideForgotForm();
});


//показать тулип на мобильном //Что это значит?
$('body').on('click', '.tooltip__mob', function(e) {
  e.preventDefault();
  if($(this).hasClass('active')) {
    $(this).parent().find('.tooltip-i-mob').slideUp();
    $(this).removeClass('active');
  }
  else {
    $(this).parent().find('.tooltip-i-mob').slideDown();
    $(this).addClass('active');
  }
});

//селект цвета на мобильно
$('.pr-select').on('click', function(funColor) {
  funColor.preventDefault();

  var windowWidth = $(window).outerWidth();
  //var windowWidth = $(window).width();

  // if (windowWidth >= 1024) {
  if (windowWidth >= 1025) {
    return false;
  }

  else {

      if($(this).hasClass('active')) {
        $(this).parent().find('.pr-color-container').slideUp();
        $(this).removeClass('active');
      }
      else {
        $(this).parent().find('.pr-color-container').slideDown();
        $(this).addClass('active');

      setTimeout(function() {
        var psColor = new PerfectScrollbar('.pr-color-container', {
          suppressScrollX: true,
          scrollingThreshold: 2000
        });
        psColor.update();

      },310);

      }

      funColor.stopPropagation()
  }

});

$(".pr-color-container").on('click', function(fSelect){
    fSelect.stopPropagation()
});
$("body").on('click', function(){
  var windowWidth = $(window).outerWidth();
  //var windowWidth = $(window).width();
  // if(windowWidth <=1023) { old_8913
  if(windowWidth <=1024) {
    $('.pr-color-container').slideUp();
  }
    $('.pr-select').removeClass('active');
});


//селект цвета на мобильном для неавторизованного пользователя, где можно просмотреть только цвет
$('.pr-select-disable').on('click', function(e) {
  e.preventDefault();

  var windowWidth = $(window).outerWidth();
  //var windowWidth = $(window).width();

  // if (windowWidth >= 1024) { old_8913
  if (windowWidth >= 1025) {
    return false;
  }

  else {

      if($(this).hasClass('active')) {
        $(this).parent().find('.pr-color-container-disable').slideUp();
        $(this).removeClass('active');
      }
      else {
        $(this).parent().find('.pr-color-container-disable').slideDown();
        $(this).addClass('active');
      }
  }

});

//показать слайд с выбранным цветом в карточке товара для НЕ авторизованного пользователя при клике на цвет
$('body').on('click', '.color-box-disable', function(e) {
  e.preventDefault();

  if(!$(this).hasClass('colorShow')) {
     var colorParentList = $(this).closest('.pr-color-list');
    var mainParentBox = $(this).closest('.product__container');
    var slideActive = $(this).attr('data-slide');
    $(colorParentList).find('.colorShow').removeClass('colorShow');
    var productSlider = $(mainParentBox).find('.product__slider-container');
    var productNavSlider = $(mainParentBox).find('.product__slider-nav');

    if($(this).hasClass('cf-modal')) {
      $('.product__scroll').scrollTop(0);
    }
    else {
      scrollTo($(mainParentBox).offset().top, 1000);
    }

    $(productSlider).find('.slick-dots li:nth-child('+slideActive+')').trigger('click');

    $(productNavSlider).find('.slick-current').removeClass('slick-current');
    $(productNavSlider).find('.slick-track .slick-slide:nth-child('+slideActive+')').addClass('slick-current');

    $(this).addClass('colorShow');
  }

});


//селект для неавторизованного пользователя
$('body').on('click', '.select-label',  function(e) {
  e.preventDefault();
  if($(this).hasClass('active')) {
    $(this).removeClass('active');
    $(this).parent().find('.select__drop').slideUp();
  }
  else {
    $(this).addClass('active');
    $(this).parent().find('.select__drop').slideDown();
  }
});


//Аккардион на мобильном
$(".accordion__tab span").on('click', function(e){
  e.preventDefault();
  var prentItem = $(this).parent().parent();
  var windowWidth = $(window).outerWidth();

  var disableBox = $('.accordion__mob').find('.disable');

  if(!$('.q-scrollBox2').hasClass('qInit2')) {
    var qPs2 = new PerfectScrollbar('.q-scrollBox2', {
      suppressScrollX: true,
      scrollingThreshold: 2000
    });
  }
  if(!$('.r-scrollBox2').hasClass('rInit2')) {
    var rPs2 = new PerfectScrollbar('.r-scrollBox2', {
      suppressScrollX: true,
      scrollingThreshold: 2000
    });
  }


  if(($(disableBox).length) > 0) {
    return false;
  }
  else {

    if($(prentItem).hasClass('active')) {
      $(prentItem).find('.accordion__content').slideUp();
      $(prentItem).removeClass('active');
      setTimeout(function() {
        $('.accordion__mob').find('.disable').removeClass('disable');
      },310);
      return false;
    }
    else {
      $(this).addClass('disable');

      $('.accordion__content').slideUp();
      $('.accordion__box').removeClass('active');

      $(prentItem).addClass('active');
      $(prentItem).find('.accordion__content').slideDown('slow', function() {

          var sBox = $(prentItem).find('.qustion__scroll');
          var listHeight = $(prentItem).find('.qustion__list').outerHeight();

          if(listHeight >= 370) {
            if(windowWidth >= 1366) {
              $(sBox).css({'height':'370px'});
            }
            else {
              $(sBox).css({'height':'280px'});
            }
          }
          else {
            $(sBox).css({'height':listHeight+20+'px'});
          }
       });

      setTimeout(function() {
        var activeBox = $('.accordion__mob').find('.active');
        scrollTo($(activeBox).offset().top + 50, 1000);

        if($(activeBox).hasClass('a-box2')) {
          try {qPs2.update();} catch (e) {}
          $('.q-scrollBox2').addClass('qInit2');
        }
        if($(activeBox).hasClass('a-box3')) {
          $('.r-scrollBox2').addClass('rInit2');
          try {rPs2.update();} catch (e) {}
        }
      },310);




        setTimeout(function() {
          $('.accordion__mob').find('.accordionShow').removeClass('accordionShow');
          $('.accordion__mob').find('.disable').removeClass('disable');
        },310);

    }
  }


});



//закрыть форму востановления пароля
function hideForgotForm() {
  $(".btn-forgot-show").removeClass('active');

    //var windowWidth = $(window).width();
    var windowWidth = $(window).outerWidth();

    $('.forgot__form').fadeOut();

    if(windowWidth <= 767) {
      setTimeout(function() {
        $('.auth__form').fadeIn();
      },400);
    }
    else {
      setTimeout(function() {
        $('.forgot-hide').fadeIn();
      },400);
    }
}

//показать кнопку очистить поле на планшете страница "купить в розницу"
$('.adress__search-control input').on('keyup', function(searchBox) {

    var sVal = $(this).val();
    var searchLen = sVal.length;
    //var windowWidth = $(window).width();
    var windowWidth = $(window).outerWidth();


    // if(windowWidth <=1023) { old_8913
    if(windowWidth <=1024) {
      if(searchLen < 1) {
        $(this).parent().removeClass('search-active');
        $(this).parent().find('.reset-search').fadeOut();
      }
      else {
        $(this).parent().addClass('search-active');
        $(this).parent().find('.reset-search').fadeIn();
      }
    }

});
//очистить поле на планшете страница "купить в розницу"
$(".reset-search").on('click', function(){
  $(this).fadeOut();
  $(this).parent().find('.form-control').val("");
  $(this).parent().removeClass('search-active');
});

//переключение табов Магазины в вашем городе список/карта страница купить в розницу retail.html
$(".tab__adress li").on('click', function(){
  if($(this).hasClass('active')) {
    return false;
  }
  else {
    $('.tab__adress').find('.active').removeClass('active');
    $(this).addClass('active');

    var tab = $(this).attr('data-tab');

     $('.retail__block:not(.'+tab+')').hide();
     $('.retail__block.'+tab).show();
  }
});

//закрыть балун на мобильном страница купить в розницу retail.html
$("body").on('click', '.close-baloon', function(){
  $(this).parent().slideUp();
  $('.baloon__list').slideUp();

  $('.markerStyle .gm-style-iw + div').trigger('click');
});

//удалить товар из страницы Избранное
$("body").on('click', '.pr-remove', function(e){
  e.preventDefault();
  var parentBox = $(this).closest('.catalog-col');
  $(parentBox).find('.remove__box').fadeIn();
  $(parentBox).find('.remove-yes').focus();
});
//Восстановить товар из страницы Избранное
/*
$("body").on('click', '.reest-btn', function(e){
  e.preventDefault();
  var parentFavorite = $(this).closest('.catalog-col');
  $(parentFavorite).removeAttr('id');
  $(parentFavorite).find('.reestablish__box').fadeOut();
});
*/

//подтвердить удалить ДА товар из страницы Избранное
$("body").on('click', '.remove-yes', function(e){
  e.preventDefault();
  var randomID = getRandomInt(0, 1000000);
  $(this).closest('.catalog-col').fadeOut().attr('id','remove'+randomID);
  setTimeout(function() {
    $('#remove'+randomID).remove();
  },310);

  favoriteSimmple();

});

function favoriteSimmple() {
  var countBox = $('.favorite__container .favorite__col').length;

  if((countBox-1) == 0) {
    $('.favorite-simple').fadeIn();

    var windowWidth = $(window).outerWidth();

    if(windowWidth <=767) {
      $('.favoritItems').slick('setPosition');
    }
  }
}



//подтвердить удалить НЕТ товар из страницы Избранное
$("body").on('click', '.remove-no', function(e){
  e.preventDefault();
  var parentBox = $(this).closest('.catalog-col');
  $(parentBox).find('.remove__box').fadeOut();
});



//селекты каталог опт
$('body').on('click', '.select-color', function(fSelect){
    var parentBox = $(this).closest('.calc-pr-item');
    var selectBox = $(this).parent();
    var dropBlock = $(selectBox).find('.select-option');

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    var randomID = getRandomInt(0, 1000000);

    dropBlock.attr('id','scroll'+randomID);

    if( dropBlock.is(':hidden') ) {

    $('.select-option').slideUp();
    $('.select-color').removeClass('active');

        dropBlock.slideDown();
        $(this).addClass('active');

      setTimeout(function() {

        var psColor = new PerfectScrollbar('#scroll'+randomID, {
          suppressScrollX: true
        });
        psColor.update();

      },310);

        $(selectBox).find('.select-option-list li').on('click', function(){

          var selectImg = $(this).find('img').attr('src');
          var selectTitle = $(this).attr('data-title');
          var selectMinCol = $(this).attr('data-min');
          var selectPriceProduct = $(this).attr('data-price');

          $(parentBox).find('.select-color-val').val(selectTitle);
          $(parentBox).find('.calc-pr-val').attr('data-min',selectMinCol).attr('data-price',selectPriceProduct).val(selectMinCol);
          $(parentBox).find('.c-pr-item-price span').text(stringReplace(selectMinCol*selectPriceProduct));
          $(parentBox).find('.calc-pr-item-box span').text('1');

          $(selectBox).find('.select-color .color-block img').attr('src',selectImg);
          $(selectBox).find('.select-color-name').text(selectTitle);

          $(selectBox).find('.select-color').removeClass('active');
          dropBlock.slideUp();

        });
    } else {
        dropBlock.slideUp();
        setTimeout("$('.select-color').removeClass('active');", 250);
    }

        fSelect.stopPropagation()

});
$(".select-option-list, .select-option").on('click', function(fSelect){
    fSelect.stopPropagation()
});
$("body").on('click', function(){
    $('.select-option').slideUp();
    setTimeout("$('.select-color').removeClass('active');", 250);
});

//переключение табов на странице сотрудничество вид ПК/Планшент
$(".terms-tabs li").on('click', function(){
  if($(this).hasClass('active')) {
    return false;
  }
  else {
    $('.terms-tabs').find('.active').removeClass('active');
    $(this).addClass('active');

    var tab = $(this).attr('data-tab');

     $('.terms__box:not(.'+tab+')').hide();//.removeClass('active')
     $('.terms__box.'+tab).show();//.addClass('active')
  }
});


//Личный кабинет планшет/мобильный
$(".account-btn").on('click', function(funAccoun){


  var windowWidth = $(window).outerWidth();

  // if(windowWidth <= 1023) { old_8913
  if( ((windowWidth <= 1024)) || ($('body').hasClass('mobile'))) {
    funAccoun.preventDefault();
    if($(this).hasClass('active')) {
      //$('.personal__modal, .personal-bg').fadeOut();
      $('.personal__modal, .personal-bg').hide();
      $(this).removeClass('active');
    }
    else {
      //$('.personal__modal, .personal-bg').fadeIn();
      $('.personal__modal, .personal-bg').show();
      $(this).addClass('active');
    }

    //если открыто меню закрываем его
    if($('.touch-nav').hasClass('active')) {
      $('.nav__content').removeClass('menuShow');
      $('html').removeClass('htmlFix');
      $('body').removeClass('navFix');$('.nav-hide').hide();
      $('.nav__container').fadeOut();
      $('.touch-nav').removeClass('active');
    }

    //если открыт поиск скрываем его
    $('.m-search-form').removeClass('searchShow');
    $('.m-search-hide').hide();
    $('.m-header__search').fadeOut();
    $('.head-xs-search').removeClass('active');
  }
  funAccoun.stopPropagation()



});

$(".personal__modal").on('click', function(funAccoun){
    funAccoun.stopPropagation()
});
$("body").on('click', function(){
  //$('.personal__modal, .personal-bg').fadeOut();
  $('.personal__modal, .personal-bg').hide();
  $(".account-btn").removeClass('active');
});



//закрыть окно
$(".personal-close, .personal-bg").on('click', function(e){
  e.preventDefault();
  //$('.personal__modal, .personal-bg').fadeOut();
  $('.personal__modal, .personal-bg').hide();
  $('.account-btn').removeClass('active');
});

//Прокрутка для блоков интернет магазинов
$(".link-scroll").on('click', function(e){
  e.preventDefault();
  scrollTo($('.online__slider').offset().top, 1000);
});

//подписка на рассылку главная - футтер
$(".subscribeForm .control-btn").on('click', function(e){
  var parentBox = $(this).closest('.subscribeForm');
  e.preventDefault();

  var subEmail = $(parentBox).find('.control-input').val();
  var subEmailLen = subEmail.length;
    console.log(subEmailLen);

  if(subEmailLen <=2 ) {
    $(parentBox).find('.control-box').addClass('has-error');
    return false;
  }
  else {
    $(parentBox).find('.control-box').removeClass('has-error');

    //открываем модалку на подписку
      var modalBox = '#modalSubsuccess';
      var magnificPopup = $.magnificPopup.instance;
      $('body').addClass("popup-open");

    $.magnificPopup.open({
      items: [
        {
          mainClass: 'mfp-with-zoom',
          midClick: true,
          src: modalBox,
          type: 'inline',

              zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out'
              }
        }
      ],
      callbacks: {
        close: function() {
          $('body').removeClass("popup-open");
        }
      }
    });

  }

});

//продолжить покупки
$('.sub-no').on('click', function(e){
  e.preventDefault();
  $.magnificPopup.close();
});





//переключение аккордиона на странице сотрудничество вид Мобильный
/*
$(".terms-btn").on('click', function(){

  var parentBox = $(this).closest('.terms__box');
  var tab = $(this).attr('data-tab');

  //если пользователь быстро захотел пощелкать по всем пунктам аккордиона, все делаем по порядку
  if($(parentBox).hasClass('disable')) {
    return false;
  }
  else {
    //если аккордион был открыт то просто сварачиваем его
    if($(parentBox).hasClass('active')) {
      $(parentBox).find('.terms-box-content').slideUp();
      $('.terms-tabs').find('li.active').removeClass('active');

      setTimeout(function() {
        $(parentBox).removeClass('active');
      },320);
    }
    else {
      //иначе открываем другой аккордион
      //скрываем открый блок аккордиона, если такой был
      $('.terms__box').addClass('disable');
      var boxShow = $('.terms__container').find('.terms__box.active');
      $(boxShow).find('.terms-box-content').slideUp();

      setTimeout(function() {
        $(boxShow).removeClass('active');
      },320);

      //открываем новый блок
      $(parentBox).find('.terms-box-content').slideDown();
      $('.terms-tabs').find('li.active').removeClass('active');
      $('.terms-tabs li.'+tab).addClass('active');

      setTimeout(function() {
        $(parentBox).addClass('active');
        $('.terms__box').removeClass('disable');
      },330);

      //Прокручиваем страницу до начала открытого аккордиона

      //setTimeout(function() {
        //scrollTo($('.terms__box.active').offset().top + 50, 1000);
      //},350);



    }
  }

});
*/

// узнаем ширину скроллбара
function scrollBarWidth() {
  var div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);

  return scrollWidth;
}

//геолокация
$(".geo-btn").on('click', function(geoEvent){

  if($(this).hasClass('active')) {
    $('.geo__modal').fadeOut();
    $(this).removeClass('active');
  }
  else {
    $('.geo__modal').show();
    $(this).addClass('active');
  }

  geoEvent.stopPropagation()

});

$(".geo__modal").on('click', function(e){
    e.stopPropagation()
});
$("body").on('click', function(){
  $('.geo__modal').fadeOut();
  $(".geo-btn").removeClass('active');
});

// Кнопка Да, всё верно!
$(".g__btn-ok").on('click', function(e){
  e.preventDefault();
  $('.geo__modal').fadeOut();
  $(".geo-btn").removeClass('active');
});
// Кнопка Выбрать другой
$(".g__btn-no").on('click',  function(e) {
    e.preventDefault();
  var modalBox = $(this).attr("href");
  var magnificPopup = $.magnificPopup.instance;
  $('body').addClass("popup-open");
  $('.geo__modal').fadeOut();
  $(".geo-btn").removeClass('active');

    $.magnificPopup.open({
      items: [
        {
          mainClass: 'mfp-with-zoom',
          midClick: true,
          src: modalBox,
          type: 'inline',

              zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out'
              }
        }
      ],
      callbacks: {
        close: function() {
          $('body').removeClass("popup-open");
        }
      }
    });
});
// Отменить выбор города
$('.m__city-btn-cancel').on('click', function(e){
  e.preventDefault();
  $.magnificPopup.close();
});



//сбрасываем форму фильтров в каталоге
if(($('#filterForm').length) > 0) {
  $('#filterForm')[0].reset();
}
try {
  if(($('#filterFormChecked').length) > 0) {
    $('#filterFormChecked')[0].reset();
  }
} catch (e) {}



});//end ready

function loadPage() {
  var windowWidth = $(window).outerWidth();
  var windowHeight = $(window).outerHeight();
  $('body').attr('data-width',windowWidth).attr('data-height',windowHeight);
}
window.addEventListener("load", loadPage);

function autoFun2() {

  //var windowWidth = $(window).width();
  var windowWidth = $(window).outerWidth();

  // popular__product слайдер популярных товаров сдвигаем соотвественно макету
  /*
  try {
  	function popularPosition(width) {
  		var width = parseInt(width);
  		windowWidth = parseInt(windowWidth);
  		setTimeout(function () {
  			var mLeft = ((windowWidth - width)/2);
  			if(mLeft !== 0) {
  				mLeft = ((windowWidth - width)/2)-10;
  			}

  			$('.popular__slider').css({'marginLeft':mLeft+'px'});
  		}, 2000);
  	}

  	if((windowWidth >=920) && (windowWidth <=1024)) {
  		popularPosition(920);
  	}
  	else if((windowWidth >=768) && (windowWidth <=919)) {
  		popularPosition(708);
  	}
  	else {
  		$('.popular__slider').removeAttr('style');
  	}


  } catch (e) {}
  */

  //подсчитываем количество символов в каждой строке слайедера Lookbook
  try {
    var lengthTitle = $('.lb-list-title').length;
    for (var i = 0; i < lengthTitle; i++) {
      var lbTitle = $($('.lb-list-title')[i]).find('a').attr('data-text');
      var titleLen = $($('.lb-list-title')[i]).find('a').attr('data-text').length;

      if(windowWidth >= 1800) {
        if(titleLen >= 68) {
          $($('.lb-list-title')[i]).find('a').text(lbTitle.substring(0,62)+' ...');
        }
      }
      if((windowWidth >= 1366) && (windowWidth <= 1799)) {
        if(titleLen >= 42) {
         $($('.lb-list-title')[i]).find('a').text(lbTitle.substring(0,39)+' ...');
        }
      }
      // if((windowWidth >= 1024) && (windowWidth <= 1365)) { old_8913
      if((windowWidth >= 1025) && (windowWidth <= 1365)) {
        if(titleLen >= 24) {
          $($('.lb-list-title')[i]).find('a').text(lbTitle.substring(0,24)+'...');
        }
      }
      // if(windowWidth <= 1023) { old_8913
      if(windowWidth <= 1024) {
        $($('.lb-list-title')[i]).find('a').text(lbTitle);
      }
    }
  } catch (e) {}


//после загрузки слайдера додавляем класс кнопкам
function funcLoadSlider() {
  $('.sliderItem').each(function(){
    if($(this).hasClass('slick-initialized')){
      $('.slide-txt').addClass('fadeInUp');
    }
  });
}
funcLoadSlider();

//авто высота для картинок при изменения разрешений
//var slideHeight = $('.backstageItem1').height();
//$('.video-link').css({'height':slideHeight+'px'});

  if(windowWidth >=1799) {
    //сбрасываем видео
    try {
      $('.backstage__video').removeClass('loadVideo');
      $('.videoBox').remove();

      $('.btn-show-filter').removeClass('active');
      $('.filter__list-box').removeAttr('style');
    } catch (e) {}
  }
  if(windowWidth <=1799) {
    //сбрасываем видео
    try {
      //$('.filter__list').find('.btn-filter.active').trigger('click');
    } catch (e) {}
  }
  if(windowWidth >=1366) {
    //сбрасываем слайдер Тригеров на пк страница Сотрудничество cooperation.html
    try {
      if(($('.coopItems').length) > 0) {
        if($('.coop-trigger-content').hasClass('coopSliderInit')){
          $('.coopItems').slick('unslick');
          $('.coop-trigger-content').removeClass('coopSliderInit');
        }
      }



    //очищаем блоки с изображениями на пк
    if((($('.groupItem2').length) > 0) || (($('.groupItem1').length) > 0)) {
      $('.gr-xs-img').html(" ");
    }
    //обновляем картинку в группе детство на пк если адаптив ширина планштета по горизонтали больше 1024px
    if(($('.gr-img').length) > 0) {
      $('.gr-img').each(function(){

        if($(this).hasClass('gr-xs')) {
          $(this).removeClass('gr-xs');
          var imgPath = $(this).find('img').attr('data-lg');
          $(this).find('img').attr('src',imgPath);
        }

      });
    }

    } catch (e) {}
  }

  if(windowWidth <=1365) {
    try {
      //запускаем слайдер Тригеров на планшете страница Сотрудничество cooperation.html
      if(($('.coopItems').length) > 0) {

        if(!$('.coop-trigger-content').hasClass('coopSliderInit')) {
          var newsSlider = $('.coopItems').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            responsive: [
              {
                breakpoint: 920,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                }
              }
              ]
          });
          $('.coop-trigger-content').addClass('coopSliderInit');
        }
        else {
           $('.coopItems').slick('refresh');
        }
      }





    } catch (e) {    }


//чтобы не дублировать контент пк/мобильный на мобильном просто перемещаем фото из группы в слайдер
    //т.к. на пк сделано по ховеру и со слайдера все фото вынесенные в отдельный блок
    if(($('.groupItem1').length) > 0) {
      $('.group-list.g1 li').each(function(){
        var liClass = $(this).attr('class');
        var liContent = $(this).html();
        $('.groupItem1 [data-imgcol='+liClass+'] .gr-xs-img').append(liContent);
      });
    }
    if(($('.groupItem2').length) > 0) {
      $('.group-list.g2 li').each(function(){
        var liClass = $(this).attr('class');
        var liContent = $(this).html();
        $('.groupItem2 [data-imgcol='+liClass+'] .gr-xs-img').append(liContent);
      });
    }
    //обновляем картинку в группе детство на мобильном
    if(($('.gr-img').length) > 0) {
      $('.gr-img').each(function(){
        $(this).addClass('gr-xs');
        var imgPath = $(this).find('img').attr('data-xs');
        $(this).find('img').attr('src',imgPath);

      });
    }


  }

  // if(windowWidth >=1024) { old_8913
  if(windowWidth >=1025) {
    //скрываем бургер вызова меню
    if($('.touch-nav').hasClass('active')){
      $('.touch-nav').removeClass('active');
      $('.nav__container').hide();
      $('.nav__content').removeClass('menuShow');
    }
    //скрываем поиск на мобильном
    if($('.head-xs-search').hasClass('active')) {
      $('.m-search-hide').hide();
      $('.m-header__search').fadeOut();
      $('.head-xs-search').removeClass('active');
    }


    //отключаем слайдер новостей на пк
    if(($('.itemNews').length) > 0) {
      if($('.news__content').hasClass('newsSliderInit')){
        $('.itemNews').slick('unslick');
        $('.news__content').removeClass('newsSliderInit');
      }
    }


    if(($('.pr-select').length) > 0) {
      $('.pr-select').removeClass('active');

      $('.pr-color-container').removeAttr('style').removeClass('ps').removeClass('ps--active-y');
    }

    if(($('.pr-select-disable').length) > 0) {
      $('.pr-select-disable').removeClass('active');

      $('.pr-color-container-disable').removeAttr('style');
    }



    //очищаем текст в формах
    if( ($('.qustion__form').length) > 0 ) {
      $('.qustion__form').each(function(){
        $(this).find('form')[0].reset();
        $(this).find('.col-symbol span').text('0');
      });
    }

    $('.auth__form').removeAttr('style');

    //сбрасываем слайдер на планшете страница "купить в розницу"


      try {
          if( ($('.onlineItem').length) > 0 ) {
            $('.onlineItem').slick('refresh');
          }
      } catch (e) {}

    //убираем скролл на планешете страница "купить в розницу"
//cуролл в блоке на странице "купить в розницу"
    if(($('.a-scrollBox').length) > 0) {
      var retailSrollBox = new PerfectScrollbar('.a-scrollBox', {
        suppressScrollX: true,
        scrollingThreshold: 2000
      });
      retailSrollBox.update();
    }

    //показываем все блоки и делаем активным первый таб страница "купить в розницу"
    $('.retail__block').removeAttr('style');
    $('.tab__adress').find('.active').removeClass('active');
    $('.tab__adress li:first-child').addClass('active');


    // try {
    //     //$('.personal__modal, .personal-bg').fadeOut();
    //     $('.personal__modal, .personal-bg').hide();
    //     $(".account-btn").removeClass('active');
    // } catch (e) {}



   //если в карточке товара открыто окно увеличения отключаем pinch
    try {
      if($('.product__container').hasClass('prFix')) {

        setTimeout(function() {
          $('.pr-big-box').find('.pinch-img').show();

          $('.pzItem-box').remove();
          $('.pzItem, .pr-big-box').removeAttr('style');

        }, 200);

      }
    } catch (e) {}

  }//end 1024

  if(windowWidth >=920) {
    try {
        $('.basket-accordion').removeAttr('style');
        $('.b-accordion-btn').text('Подробнее');
        $('.b-discount-help').removeClass('active');
    } catch (e) {}
  }//end 920

  if(windowWidth >=768) {
    //отключаем слайдер трикгеров на пк
    if(($('.triger__container').length) > 0) {
      if($('.triger__container').hasClass('trigerSliderInit')){
        $('.trigerItems').slick('unslick');
        $('.triger__container').removeClass('trigerSliderInit');
      }
    }

    try {
      $('.btn-filter-view').removeClass('active');
      $('.filter__card-views').removeAttr('style');
    } catch (e) {}
    try {
      $('.reset-filter').trigger('click');
    } catch (e) {}


    //отключаем слайдер блог/главная на пк
    if(($('.blogItems').length) > 0) {
      if($('.blog__content').hasClass('blogSliderInit')){
        $('.blogItems').slick('unslick');
        $('.blog__content').removeClass('blogSliderInit');
      }
    }

      try {
        //убираем атрибут style у всех блок, которые складывались на мобильном в аккордион на странице cooperation.html
        $('.terms-box-content').removeAttr('style');

        $('.terms-tabs').find('.active').removeClass('active');
        // делаем первый таб активным и показываем его содержимое
          $('.terms-tabs li:first-child').addClass('active');
          $('.terms__container .terms__box:first-child').addClass('active');

          $('.terms__box').removeClass('sub-section--active').removeClass('sub-section--opened').removeAttr('style');

      } catch (e) {}



     //сбрасываем слайдер Тригеров на телефоне, страница Избранное favorite.html
    try {
      if(($('.favoritItems').length) > 0) {
        if($('.f-triggers').hasClass('favoritSliderInit')){
          $('.favoritItems').slick('unslick');
          $('.f-triggers').removeClass('favoritSliderInit');
        }
      }
    } catch (e) {}

    try {
			//zoom фото в карточке товара как на lamoda
			$('.zoom').zoom();
    } catch (e) {}
  }//end windowWidth >=768

  // if(windowWidth <=1023) { old_8913
  if(windowWidth <=1024) {

    //запускаем слайдер новостей на мобильном
    if(($('.itemNews').length) > 0) {

      if(!$('.news__content').hasClass('newsSliderInit')) {
        var newsSlider = $('.itemNews').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
          prevArrow: ".prev-btn-news",
          nextArrow: ".next-btn-news",
          responsive: [
            {
              breakpoint: 920,
              settings: {
                slidesToShow: 2,
              }
            }
            ]
        });
        $('.news__content').addClass('newsSliderInit');
      }
      else {
         $('.itemNews').slick('refresh');
      }
    }




    //заполняем контентом аккордион на мобильном страница Оптовики
    if( ($('.accordion__mob').length) > 0 ) {
      //1й таб
      var contentTab1 = $('.info__box.tab1').find('.info__box-txt').html();
      $('.a-box1 .accordion__content').html(contentTab1);

      //2й таб
      var contentTab2 = $('.info__box.tab2').find('.qustion-parent').html();
      $('.a-box2 .qustion__list').html(contentTab2);

      //3й таб
      var contentTab3 = $('.info__box.tab3').find('.qustion-parent').html();
      $('.a-box3 .qustion__list').html(contentTab3);
    }

    //очищаем текст в формах
    if( ($('.qustion__form').length) > 0 ) {
      $('.qustion__form').each(function(){
        $('.qustion__form form')[0].reset();
        $(this).find('.col-symbol span').text('0');
      });
    }

    //сбрасываем слайдер на планшете страница "купить в розницу"
    try {
        if( ($('.onlineItem').length) > 0 ) {
          $('.onlineItem').slick('unslick');
        }
    } catch (e) {console.log(e);}


    //убираем скролл на планешете страница "купить в розницу"
    if(($('.a-scrollBox').length) > 0) {
      setTimeout(function() {
      var retailSrollBox = new PerfectScrollbar('.a-scrollBox', {
        suppressScrollX: true,
        scrollingThreshold: 2000
      });
        retailSrollBox.destroy();
        retailSrollBox = null;
      },50);

    }


  }//end 1023

  if(windowWidth <=767) {
    //запускаем слайдер тригеров на мобильном в карточке товара
    if(($('.triger__container').length) > 0) {

      if(!$('.triger__container').hasClass('trigerSliderInit')) {
        var newsSlider = $('.trigerItems').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          dots: false
        });
        $('.triger__container').addClass('trigerSliderInit');
      }
    }

    //очищаем фильтр и сворачиваем фильтр

    try {
        //если блок фильтра был открыт на пк скрываем его и обнуляем все значения
        var windowWidthLoad = parseInt($('body').attr('data-width'));
        var windowWidthReal = parseInt($(window).outerWidth());

        if(windowWidthLoad !== windowWidthReal) {
          $('#filterForm')[0].reset();
          $('.btn-filter').removeClass('active');
          $('.btn-filter i').text(' ');
          $('.filter__bottom').removeAttr('style');

          if(windowWidthReal >= 768) {
            $('.filter__clear').removeAttr('style').removeClass('active');
          }
        }

    } catch (e) {}



 //запускаем слайдер блог/главная на мобильном
    if(($('.blogItems').length) > 0) {

      if(!$('.blog__content').hasClass('blogSliderInit')) {
        var newsSlider = $('.blogItems').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
          prevArrow: ".prev-btn-blog",
          nextArrow: ".next-btn-blog",
          responsive: [
            {
              breakpoint: 920,
              settings: {
                slidesToShow: 2,
              }
            }
            ]
        });
        $('.blog__content').addClass('blogSliderInit');
      }
      else {
         $('.blogItems').slick('refresh');
      }
    }

    //в мобильной версии у контейнеров удаляем атрибут style на странице  cooperation.html
    try {
        $('.terms__box').removeAttr('style').removeClass('active');
        $('.terms-tabs li').removeClass('active');
    } catch (e) {}

    try {
			//zoom фото в карточке товара как на lamoda
			$('.zoom').zoom();
			$('.zoom').trigger('zoom.destroy');
    } catch (e) {}


    //переносим текст из верхнего блока в нижний блок на мобильном страница card-materials.html
    try {
      if(($('.material-color-txt').length) > 0) {
        var materialText = $('.material-color-txt').html();
        $('.m-text-mobile').html(materialText);
      }
    } catch (e) {} //2й таб


    try {
      //запускаем слайдер Тригеров на телефоне, страница Избранное favorite.html
      if(($('.favoritItems').length) > 0) {

        if(!$('.f-triggers').hasClass('favoritSliderInit')) {
          var newsSlider = $('.favoritItems').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false
          });
          $('.f-triggers').addClass('favoritSliderInit');
        }
        else {
           $('.favoritItems').slick('setPosition');
        }
      }
    } catch (e) {}

  }//end 767

   if(windowWidth >=920) {
    //если таб закрыт на планшете то открываем его на пк
    if(($('.info-tab').length) > 0) {
      if(($('.info-tab li.active').length) == 0) {
        var tabActive = $('.info-tab li:first-child').attr('data-tab');
        $('.info-tab li:first-child').addClass('active');
        $('.accordion__tablet.'+tabActive).addClass('active');
        $('.info__box').removeAttr('style');
      }
    }
   }

if(($('.main__slider').length) > 0) {
  //фоновые картники для большого слайдерана главной страницы
  function funcSlideImg() {
    $('.slide-content').each(function(){
      //var windowWidth = $(window).width();
      var windowWidth = $(window).outerWidth();

      if(windowWidth <=639) {
        var imgSlidePath = $(this).find('.slideImg').attr('data-img');
        $(this).css({'background':'url('+imgSlidePath+') no-repeat top center'});
      }
      else {
        var imgSlidePath = $(this).find('.slideImg').attr('src');
        $(this).css({'background':'url('+imgSlidePath+') no-repeat top center'});
      }


    });
  }
  funcSlideImg();
}




}//end autoFun2
window.addEventListener("load", autoFun2);
window.addEventListener("resize", autoFun2);

//загрузка слайдеров в цикле при загрузке страницы каталога опт/сз/розница
function loadCatalog() {
  //var windowWidth = $(window).width();
  var windowWidth = $(window).outerWidth();

  if($('body').hasClass('loadSliders')) {

function funCatalogSliders() {
    $('.catalog-product').each(function(){

      //если блок не загружен изначально то выполянем запуск всех слайдеров
      if(!$(this).hasClass('sliderLoaded')) {

      var bigSlider = $(this).find('.slider-forCatalog');
      var thumbSlider = $(this).find('.thumb-slider');

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      var randomID = getRandomInt(0, 1000000);

      $(bigSlider).attr('id','big'+randomID);
      $(thumbSlider).attr('id','thumb'+randomID);

      var bigSliderID = $(bigSlider).attr('id');
      var thumbSliderID = $(thumbSlider).attr('id');

      $('#'+thumbSliderID).slick({
        slidesToShow: 5,
        infinite: false,
        focusOnSelect: true,
        asNavFor: '#'+bigSliderID,
        vertical: true,
        arrows: true,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1800,
            settings: {
              slidesToShow: 4
            }
          },
          {
            // breakpoint: 1024, old_8913
            breakpoint: 1025,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 920,
            settings: {
              slidesToShow: 3,
              vertical: false
            }
          }
        ]
      });

     var sliderFor = $('#'+bigSliderID).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      arrows: true,
      fade: true,
      dots: true,
      asNavFor: '#'+thumbSliderID
    });


   $(sliderFor).on('afterChange', function(event, slick, nextSlide){
    var numSlide = parseInt($('#'+bigSliderID).find('.slick-current').attr('data-slick-index'));
    var numActiveSlide;

    var parentBox = $(this).closest('.catalog-product');

    if(numSlide == 0) {
      numActiveSlide = 1;
    }
    else {
      numActiveSlide = (numSlide+1);
    }
    $(parentBox).find('.slides-col').text(numActiveSlide);


  });

  //добавляем класса блоку и даем понять что слайдер в нем загружен и убираем иконку лоадера
  $(this).addClass('sliderLoaded');
  }

});

  }//end funCatalogSliders

  funCatalogSliders();

}//end loadSliders

$(".loadSliders .catalog__bottom a").on('click', function(e){
  e.preventDefault();
  $('.catalog__container').append('<div class="product__container catalog-product zoomReload">'+
  '<div class="product__scroll">'+
  '  <div class="container">'+
     ' <div class="mob-slider-action">'+
       ' <div class="slider-action-box"><span class="prev-mob"></span>'+
         ' <div class="slides-length"><span class="slides-col">1</span><span>/</span><span class="slides-all slidesLength"></span></div><span class="next-mob"></span>'+
        '</div>'+
    '  </div>'+
      '<div class="product__left col-md-11 col-sm-10 col-xs-18">'+
       ' <div class="visible-xs mob-title"><a class="back-modal" href="#"></a><span>Пальто демисезонное</span></div>'+
       ' <div class="product__slider-big">'+
         ' <div class="product__slider-container">'+
           ' <div class="slider slider-forCatalog slider__arrow">'+
              '<div>'+
                '<div class="pr-big-box zoom"><img class="img-responsive" src="images/product/big1.jpg" alt="#"><a class="pr-favorite" href="#"></a>'+
                  '<div class="pr-color">Серый</div>'+
                '</div>'+
              '</div>'+
              '<div>'+
                '<div class="pr-big-box zoom"><img class="img-responsive" src="images/product/big2.jpg" alt="#"><a class="pr-favorite" href="#"></a>'+
                  '<div class="pr-color">Серый</div>'+
               ' </div>'+
              '</div>'+
              '<div>'+
                '<div class="pr-big-box zoom"><img class="img-responsive" src="images/product/big3.jpg" alt="#"><a class="pr-favorite" href="#"></a>'+
                  '<div class="pr-color">Серый</div>'+
                '</div>'+
              '</div>'+
              '<div>'+
                '<div class="pr-big-box zoom"><img class="img-responsive" src="images/product/big4.jpg" alt="#"><a class="pr-favorite" href="#"></a>'+
                  '<div class="pr-color">Серый</div>'+
               ' </div>'+
              '</div>'+
             ' <div>'+
               ' <div class="pr-big-box zoom"><img class="img-responsive" src="images/product/big5.jpg" alt="#"><a class="pr-favorite" href="#"></a>'+
                  '<div class="pr-color">Серый</div>'+
                '</div>'+
             ' </div>'+
             ' <div>'+
                '<div class="pr-big-box zoom"><img class="img-responsive" src="images/product/big6.jpg" alt="#"><a class="pr-favorite" href="#"></a>'+
                  '<div class="pr-color">Серый</div>'+
                '</div>'+
              '</div>'+
             ' <div>'+
                '<div class="pr-big-box zoom"><img class="img-responsive" src="images/product/big7.jpg" alt="#"><a class="pr-favorite" href="#"></a>'+
                  '<div class="pr-color">Серый</div>'+
                '</div>'+
             ' </div>'+
              '<div>'+
                '<div class="pr-big-box zoom"><img class="img-responsive" src="images/product/big8.jpg" alt="#"><a class="pr-favorite" href="#"></a>'+
                  '<div class="pr-color">Серый</div>'+
                '</div>'+
             ' </div>'+
           '</div>'+
         ' </div>'+
         ' <div class="product__slider-nav hidden-xs">'+
          '  <div class="slider slider-nav slider__arrow thumb-slider">'+
             ' <div>'+
                '<div class="pr-nav-box"><img class="img-responsive preview" src="images/product/thumb1.jpg" alt="#">'+
                '</div>'+
              '</div>'+
              '<div>'+
                '<div class="pr-nav-box"><img class="img-responsive preview" src="images/product/thumb2.jpg" alt="#">'+
                '</div>'+
              '</div>'+
              '<div>'+
                '<div class="pr-nav-box"><img class="img-responsive preview" src="images/product/thumb3.jpg" alt="#">'+
                '</div>'+
              '</div>'+
              '<div>'+
                '<div class="pr-nav-box"><img class="img-responsive preview" src="images/product/thumb4.jpg" alt="#">'+
                '</div>'+
              '</div>'+
              '<div>'+
                '<div class="pr-nav-box"><img class="img-responsive preview" src="images/product/thumb5.jpg" alt="#">'+
                '</div>'+
              '</div>'+
              '<div>'+
                '<div class="pr-nav-box"><img class="img-responsive preview" src="images/product/thumb6.jpg" alt="#">'+
                '</div>'+
              '</div>'+
              '<div>'+
                '<div class="pr-nav-box"><img class="img-responsive preview" src="images/product/thumb7.jpg" alt="#">'+
                '</div>'+
              '</div>'+
              '<div>'+
                '<div class="pr-nav-box"><img class="img-responsive preview" src="images/product/thumb8.jpg" alt="#">'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'  +
    '</div>'+
  '</div>'+
  '<div class="prClose"></div>'+
'</div>');

  //запускаем слайдеры в новом блоке
  funCatalogSliders();
  //запускаем скрипт увеличения картинке при ховере
  //

  $('.zoomReload').find('.zoom').zoom();

});



}//end loadCatalog
window.addEventListener("load", loadCatalog);


/*
var windowWidth = $(window).outerWidth();
var docWidth = $(document).outerWidth();
console.log('window outerWidth - '+ windowWidth);
console.log('document outerWidth - '+ docWidth);
*/

/*
показать свойства в истории заказов
присвоение класса и смена подписи - в обработчике для всех .showprop
*/
$(".order__content .show-prop").on('click', function(evt){
    evt.preventDefault();
    var parentBox = $(this).closest(".order__content");

    if($(this).hasClass('active')) {
        $(parentBox).find(".order__accordion .properties-list li").slideUp();
        $(parentBox).find(".order__accordion ul").css("margin-bottom", "37px");
    }
    else {
        $(parentBox).find(".order__accordion .properties-list li").slideDown();
        $(parentBox).find(".order__accordion ul").css("margin-bottom", "49px");
    }
});

/*
смена изображений в истории заказов
 */
$('.order__content .photo-change').on('click', function(evt){
    evt.preventDefault();
    var imgPath = $(this).attr('data-img');
    var parentBox = $(this).closest('.order__content');
    $(parentBox).find('.order__img img').attr('src',imgPath);
});
/* конец смены изображений */

/* раскрытие карточек заказов */

$('.order__link-more').on('click', function (evt) {
    evt.preventDefault();
    var parentBox = $(this).closest('.order');

    if ($(this).hasClass('ord-opened')) {
      $(parentBox).find('.order__link-more--tab-up').removeClass('shown');

      if (window.matchMedia('(max-width: 767px)').matches) {
          $(parentBox).find('.order__inner').slideUp(200);
      } else if (window.matchMedia('(min-width: 768px)').matches) {
          $(parentBox).find('.order__inner').slideUp(250);
      }

      $(parentBox).removeClass('order--opened');

        setTimeout(function () {
          $(parentBox).find('.order__link-more').removeClass('ord-opened').text('Подробнее');
          $(parentBox).find('.order__summary-item:not(:first-child)').fadeIn(250);
        }, 250);
    }
    else {
      $(parentBox).find('.order__summary-item:not(:first-child)').fadeOut(0);
      $(parentBox).find('.order__link-more').addClass('ord-opened').text('Свернуть');
      $(parentBox).addClass('order--opened');

      if (window.matchMedia('(max-width: 767px)').matches) {
          $(parentBox).find('.order__inner').slideDown(750);
      } else if (window.matchMedia('(min-width: 768px)').matches) {
          $(parentBox).find('.order__inner').slideDown(250);
      }

      setTimeout(function () {
          $(parentBox).find('.order__link-more--tab-up').addClass('shown')
      }, 250)
    }
});
/* конец раскрытия карточек */

/* СЕЛЕКТЫ */

$(document).ready(function () {
    $('select').select2({
        width: '100%',
        placeholder: "Выберите",
        allowClear: true
    });
});

var myShops = document.querySelector('.my-shops');
if (myShops) {

    /* показ формы добавления магазина */
    var linkAdd = $('.my-shops__link-add'),
        addForm = $('.my-shops__form');

    $(linkAdd).on('click', function (evt) {
        evt.preventDefault();

        if ($(this).hasClass('my-shops__link-add--active')) {
          $(this).removeClass('my-shops__link-add--active')
              .html('<span>Добавить магазин</span>');
          $(addForm).slideUp(0);

        } else {
          $(this).addClass('my-shops__link-add--active')
              .html('<span>Добавление нового магазина</span>');
          $(addForm).slideDown(600);
        }
    });

    /* маска на поле ввода телефона в форме регистрации магазина */
    $(".input-field__input[type='tel']").mask('+7 (999) 999-99-99');
    /**/

    /* раскрытие карточек магазинов */
    $('.shop__link-more').on('click', function (evt) {
        evt.preventDefault();
        var parentBox = $(this).closest('.shop');

        if ($(this).hasClass('shop-opened')) {
            $(this).removeClass('shop-opened').text('Подробнее');
            $(parentBox).removeClass('shop--opened');
            $(parentBox).find('.shop__additional').slideUp(400);
            $(parentBox).find('.shop__logo').slideUp(400);

        }
        else {
            $(this).addClass('shop-opened').text('Свернуть');
            $(parentBox).addClass('shop--opened');
            $(parentBox).find('.shop__additional').slideDown(400);
            $(parentBox).find('.shop__logo').slideDown(400);
        }
    });

    /* попап удаления магазина */
    $('.shop__del').on('click', function () {
        $('.shop-dp').removeClass('shop-dp--closed');

        var shopForDel = $(this).closest('.my-shops__item');

        $('.shop-dp #del-shop').on('click', function () {
            $(shopForDel).remove();
            $('.shop-dp').addClass('shop-dp--closed');
        });

        $('.shop-dp [data-close]').on('click', function () {
            $('.shop-dp').addClass('shop-dp--closed');
        });
    });
}

/* слайдеры в статье */
var article = document.querySelector('.article');
if (article) {

    var thisSlideInMain = $('.art-slider--main .art-slider__current');
    var allSlidesInMain = $('.art-slider--main .art-slider__all');

    var articleMainSlider = $('.art-slider--main .art-slider__content');

    $(articleMainSlider).on('init reInit', function (event, slick, currentSlide, nextSlide) {
        var num = (currentSlide ? currentSlide : 0) + 1;
        thisSlideInMain.text('0' + num);
        allSlidesInMain.text('0' + slick.slideCount);
    });

    articleMainSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        dots: false,
        autoplay: false
    });

    articleMainSlider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
        var num = (currentSlide ? currentSlide : 0) + 1;
        thisSlideInMain.text('0' + num);
    });


    var thisSlideInBlock = $('.art-slider--block .art-slider__current');
    var allSlidesInBlock = $('.art-slider--block .art-slider__all');

    var articleBlockSlider = $('.art-slider--block .art-slider__content');

    $(articleBlockSlider).on('init reInit', function (event, slick, currentSlide, nextSlide) {
        var num = (currentSlide ? currentSlide : 0) + 1;
        thisSlideInBlock.text('0' + num);
        allSlidesInBlock.text('0' + slick.slideCount);
    });

    articleBlockSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        dots: false,
        autoplay: false
    });

    articleBlockSlider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
        var num = (currentSlide ? currentSlide : 0) + 1;
        thisSlideInBlock.text('0' + num);
    });
}

var blogSlider = $('.art-slider--blog .art-slider__content');

$(blogSlider).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    dots: false,
    autoplay: false,
    speed: 500
});


var manager = document.querySelector('.manager');
if (manager) {

    /* раскрытие информации менеджера */

    $('.manager__link-more').on('click', function (evt) {
        evt.preventDefault();
        var parentBox = $(this).closest('.manager__about');

        if ($(this).hasClass('active')) {
            $(parentBox).find('p').slideUp(300);
        }
        else {
            $(parentBox).find('p').slideDown(300);
        }
    });
    /* конец раскрытия карточек */

    /* слайдер с фичами */
    var managerFeaturesSlider = $('.manager__slider');
    var mobileWidthOnLoad = $(window).width();

    var makeManagerSlick = function () {
        $(managerFeaturesSlider).slick({
            responsive: [
                {
                    breakpoint: 4000,
                    settings: 'unslick'
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        fade: false,
                        dots: false,
                        autoplay: false,
                        speed: 500
                    }
                }
            ]
        });
    };

    makeManagerSlick();

    var currentWidth = $(window).width();

    $(window).on('resize', function () {
        var newWidth = $(window).width();
        if (newWidth !== currentWidth) { // чтобы реагировало только на изменение ширины(!), нужно для мобильных устройств
            console.log('предыдущая ширина ' + currentWidth + ', текущая ширина ' + newWidth);
            // если новая ширина требует слайдер И предыдущая его не требовала
            if(newWidth < 600 && currentWidth > 599 ) {
                console.log('перезапускаю слайдер');
                $(managerFeaturesSlider).slick('unslick');
                setTimeout(makeManagerSlick(), 500);
            } else {
                console.log('перезапуск слайдера не требуется');
            }
        } // перезаписываем действующую ширину экрана
        currentWidth = $(window).width();
        closePopups();
    });

    /* информационный попап на странице менеджера*/

    var featuresSlides = document.querySelectorAll('.manager__feature:not(.slick-cloned)');
    var featuresPopups = document.querySelectorAll('.manager__popup');

    // появление попапа по клику на слайд (до 1024px включительно)
    var makeSlideHandlers = function () {
        for (var i = 0; i < featuresSlides.length; i++) {
            featuresSlides[i].addEventListener('click', setSlideClickHandler(i));
        }
    };

    var setSlideClickHandler = function (i) {
        return function () {
          if (window.matchMedia('(max-width: 1024px)').matches) {
              featuresPopups[i].classList.add('active');
          }
        }
    };

    makeSlideHandlers();

    /* закрытие попапов */
    // функция закрытия
    var closePopups = function () {
        for (var i = 0; i < featuresPopups.length; i++) {
            featuresPopups[i].classList.remove('active')
        }
    };

    // по клику на документе
    document.addEventListener('click', function () {
        closePopups();
    }, true);

    // по крестику
    $('.manager__pop-close').on('click', function () {
       var popUp = $(this).closest('.manager__popup');
        setTimeout(function () {
            popUp.removeClass('active');
        }, 150);
    });

    /* для слайдера попапы должны быть снаружи, иначе они обрезаются контейнером слайдера */
    var widthMobile = window.matchMedia('(max-width: 599px)');
    var popupsPlace = document.querySelector('.manager__popups');

    // перенос попапов внутрь карточек
    var movePopupsIntoCards = function () {
        for (var i = 0; i < featuresPopups.length; i++ ) {
          var removed = popupsPlace.removeChild(featuresPopups[i]);
          featuresSlides[i].appendChild(removed);
        }
    };

    // перенос попапов из карточек (для слайдера)
    var movePopupsIntoPlace = function () {
        for (var i = 0; i < featuresPopups.length; i++ ) {
            var removed = featuresSlides[i].removeChild(featuresPopups[i]);
            popupsPlace.appendChild(removed);
        }
    };

    if (mobileWidthOnLoad > 599) {
        movePopupsIntoCards();
    }

    // следилка за шириной
    var popupHandler = function () {
        if (!widthMobile.matches) {
            movePopupsIntoCards();
        } else {
          movePopupsIntoPlace();
        }
    };

    widthMobile.addListener(popupHandler);
}

var contacts = document.querySelector('.contacts');
if (contacts) {

    // табы
    $('.contacts__tab').on('click', function (evt) {
        evt.preventDefault();
       if ($(this).hasClass('tabs__tab--active')) {
           return false;
       } else {
           $('.contacts__tab').toggleClass('tabs__tab--active btn-white');
           $('.contacts__content').toggleClass('hidden');
       }
    });

    // перенос карты
    var widthLaptop = window.matchMedia('(min-width: 1366px)');
    var maps = document.querySelectorAll('.contacts__map');
    var mobilePlaces = document.querySelectorAll('.contacts__map-block');
    var laptopPlaces = document.querySelectorAll('.contacts__content');

    // функция переноса
    var moveMap = function (from, to) {
        for (var i = 0; i < maps.length; i++) {
            var removed = from[i].removeChild(maps[i]);
            to[i].appendChild(removed);
        }
    };

    if (!widthLaptop.matches) {
        moveMap(laptopPlaces, mobilePlaces);
    }

    // следилка за шириной
    var mapHandler = function () {
        if (widthLaptop.matches) {
            moveMap(mobilePlaces, laptopPlaces);
        } else {
            moveMap(laptopPlaces, mobilePlaces);
        }
    };

    widthLaptop.addListener(mapHandler);

    // описание проезда
    $('.how-to__link-slide').on('click', function (evt) {
        evt.preventDefault();
        var parentBox = $(this).closest('.how-to');

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(parentBox).find('.to-slide').slideUp(400);
        }
        else {
            $(this).addClass('active');
            $(parentBox).find('.to-slide').slideDown(400);
        }
    });

    // слайдеры менеджеров и руководства
    var teamSliders = $('.contacts__team-list');
    var makeTeamSliders = function () {
        $(teamSliders).slick({
            responsive: [
                {
                    breakpoint: 4000,
                    settings: 'unslick'
                },
                {
                    breakpoint: 1366,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows: true,
                        fade: false,
                        dots: false,
                        autoplay: false,
                        speed: 500
                    }
                },
                {
                    breakpoint: 920,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    };

    makeTeamSliders();

    currentWidth = $(window).width();

    $(window).on('resize', function () {
        var newWidth = $(window).width();
        if (newWidth !== currentWidth) {
            if(newWidth < 1366 && currentWidth > 1365 ) {
                $(teamSliders).slick('unslick');
                makeTeamSliders();
            }
        }
        currentWidth = $(window).width();
    });
}

var questions = document.querySelector('.questions');
if (questions) {
    // табы
    $('.questions__tab').on('click', function(evt) {
        evt.preventDefault();
        if ($(this).hasClass('tabs__tab--active')) {
            return false;
        } else {
            $('.questions__tab').toggleClass('tabs__tab--active btn-white');
            $('.questions__screen').toggleClass('hidden');

            for (var i = 0; i < scrollContainers.length; i++) {
                var ps = new PerfectScrollbar(scrollContainers[i], {
                    suppressScrollX: true,
                    scrollingThreshold: 2000
                });

                ps.update();
            }
        }
    });

    // скролл контейнера при переполнении
    var scrollContainers = document.querySelectorAll('.questions__list-item');
    for (var i = 0; i < scrollContainers.length; i++) {
      var ps = new PerfectScrollbar(scrollContainers[i], {
          suppressScrollX: true,
          scrollingThreshold: 2000
      });

      ps.update();
    }

    /* отображение подсказки */
    var questionsTips = document.querySelectorAll('.questions__tip');
    var questionLists = document.querySelectorAll('.questions__list');

    for (i = 0; i < questionLists.length; i++) {
        if (questionLists[i].children.length === 0) {
            questionsTips[i].classList.remove('hidden');
        }
    }
}

var changePassword = document.getElementById('change-password');
if (changePassword) {

    // модальное окно при изменении пароля

  var modalPassword = document.querySelector('.modal-password');
  var modalClose = modalPassword.querySelector('.modal-password__close');

  changePassword.addEventListener('submit', function (evt) {
      evt.preventDefault();
      modalPassword.classList.remove('modal-password--closed');
      document.body.style.position = 'fixed';

      if ($(window).width() > 600) {
          modalClose.addEventListener('click', function () {
              modalPassword.classList.add('modal-password--closed');
              document.body.style.position = '';
          })
      } else {
          modalPassword.addEventListener('click', function () {
              modalPassword.classList.add('modal-password--closed');
              document.body.style.position = '';
          })
      }
  })
}

var lookbook = document.querySelector('.lookbook-inner');
if (lookbook) {

  var lbSlider = $('.lb-slider');

  var makeLbSlick = function () {
      $(lbSlider).slick({
          responsive: [
              {
                  breakpoint: 4000,
                  settings: 'unslick'
              },
              {
                  breakpoint: 920,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows: true,
                      fade: false,
                      dots: false,
                      autoplay: false,
                      speed: 500
                  }
              }
          ]
      });
  };

  makeLbSlick();

    currentWidth = $(window).width();

    $(window).on('resize', function () {
      var newWidth = $(window).width();
      if (newWidth !== currentWidth) {
          if(newWidth < 920 && currentWidth > 919 ) {
              $(lbSlider).slick('unslick');
              makeLbSlick();
          }
      }
        currentWidth = $(window).width();
    });
}

var dealers = document.querySelector('.dealers');
if (dealers) {

    // выбор страны
    var select = document.getElementById('country-select');
    var dealersGroups = dealers.querySelectorAll('.dealers__content');

    $('.dealers .input-field__input').on('change', function() {
        var index = select.options.selectedIndex;
        for (var i = 0; i < select.options.length; i++) {
            dealersGroups[i].classList.add('hidden');
            dealersGroups[index].classList.remove('hidden');
        }
    });

    select.addEventListener('change', function() {
        var index = select.options.selectedIndex;

        for (var i = 0; i < select.options.length; i++) {
        dealersGroups[i].classList.add('hidden');
        dealersGroups[index].classList.remove('hidden');
      }
    });

    // сворачивание списка дилеров
    var country = $('.dealers__country-name');
    $(country).on('click', function () {
        var parentBox = $(this).closest('.dealers__country');

        if ($(this).hasClass('closed')) {
            $(this).removeClass('closed');
            $(parentBox).find('.dealers__list').slideDown();
        } else {
            $(this).addClass('closed');
            $(parentBox).find('.dealers__list').slideUp();
        }
    });

    // скролл контейнера
    var scrollContainer = dealers.querySelector('.dealers__data');
        var ps = new PerfectScrollbar(scrollContainer, {
            suppressScrollX: true,
            scrollingThreshold: 2000
        });

        ps.update();
}
