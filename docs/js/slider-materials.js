$(function () {

  //переключение цвета по ховеру на пк
  $('body').on('mouseover', '.m-color-btn', function(e) {

    var windowWidth = $(window).outerWidth(); 

    if((!$('body').hasClass('mobile')) && windowWidth >= 1366) {
      var parentBox = $(this).closest('.material__slider-box');
      var parentNav = $(this).closest('.m-slider-nav');
      var activeSlide = parseInt($(this).attr('data-slick-index'));  
      activeSlide = activeSlide + 1;
      $(parentBox).find('.slick-dots li:nth-child('+activeSlide+')').trigger('click');      
    }
  }); 
  

});

//загрузка слайдеров в цикле при загрузке страницы Каталог тканей
function loadCatalogMaterials() {
  //var windowWidth = $(window).width(); 
  var windowWidth = $(window).outerWidth(); 


function funSlidersMaterials() {
  $('.material-item').each(function(){

    var sliderMaterialFor = $(this).find('.m-slider-for');
    var sliderMaterialNav = $(this).find('.m-slider-nav');

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    var randomID = getRandomInt(0, 1000000);  

      $(sliderMaterialFor).attr('id','for'+randomID);
      $(sliderMaterialNav).attr('id','nav'+randomID);

      $('#nav'+randomID).slick({
        slidesToShow: 6,
        infinite: false,
        arrows: true,  
        speed: 50,
        slidesToScroll: 1, 
        responsive: [
          {
            breakpoint: 1366,
            settings: {
              speed: 500,
              focusOnSelect: true,
              asNavFor: '#for'+randomID,   
              centerMode: true, 
              infinite: true, 
              variableWidth: true,         
              slidesToShow: 5
            }
          },
          {
            breakpoint: 768,
            settings: {
              focusOnSelect: true,
              asNavFor: '#for'+randomID,
              centerMode: true, 
              infinite: true, 
              variableWidth: true,  
              slidesToShow: 3
            }
          }
        ]
      });

    $('#for'+randomID).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      arrows: true, 
      fade: true,
      dots: true, 
      speed: 50,
        responsive: [
          {
            breakpoint: 1366,
            settings: {
              asNavFor: '#nav'+randomID,
              infinite: true, 
              speed: 500
            }
          },
          {
            breakpoint: 768,
            settings: {
              asNavFor: '#nav'+randomID,
              infinite: true
            }
          }          
        ]      
    });  


    $(this).find('.material__slider-box').removeClass('active');
    



});

  }//end funSlidersMaterials

  funSlidersMaterials();


}//end loadCatalogMaterials
window.addEventListener("load", loadCatalogMaterials);