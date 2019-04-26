		var gmarkers = [];
    var markers = [
    {
        "idItem": "0",
        "title": 'Магазин “Теплая одежда” 1',
        "lat": '55.755996', 
        "lng": '37.61491',
        "description": 'м. Охотный ряд, ТЦ Охотный ряд, Electrastyle, ул. Мира д 15',
        "phone": '+7 999 888 77 66',
        "instatram": '#',
        "vk": '#',
        "facebook": '#',
        "youtube": '#'
    },
    {
        "idItem": "1",
        "title": 'Сеть магазинов “Бархат” 2',
        "lat": '55.756080',
        "lng": '37.613557',
        "description": 'м. Охотный ряд, ТЦ Охотный ряд, Electrastyle, ул. Мира д 15',
        "phone": '+7 999 888 77 66',
        "instatram": '#',
        "vk": '#',
        "facebook": '#',
        "youtube": '#'        
    },
    {
        "idItem": "2",
        "title": 'Сеть магазинов “STYLVO” 6',
        "lat": '55.755579', 
        "lng": '37.616894',
        "description": 'м. Охотный ряд, ТЦ Охотный ряд, Electrastyle, ул. Мира д 15',
        "phone": '+7 999 888 77 66',
        "instatram": '#',
        "vk": '#',
        "facebook": '#',
        "youtube": '#'        
    },
    {
        "idItem": "3",
        "title": 'Магазин “Теплая одежда” 4',
        "lat": '55.756654', 
        "lng": '37.616464',
        "description": 'м. Охотный ряд, ТЦ Охотный ряд, Electrastyle, ул. Мира д 15',
        "phone": '+7 999 888 77 66',
        "instatram": '#',
        "vk": '#',
        "facebook": '#',
        "youtube": '#'        
    },
    {
        "idItem": "4",
        "title": 'Сеть магазинов “Бархат” 5',
        "lat": '55.756799', 
        "lng": '37.612978',
        "description": 'м. Охотный ряд, ТЦ Охотный ряд, Electrastyle, ул. Мира д 15',
        "phone": '+7 999 888 77 66',
        "instatram": '#',
        "vk": '#',
        "facebook": '#',
        "youtube": '#'        
    },
    {
        "idItem": "5",
        "title": 'Сеть магазинов “STYLVO” 3',
        "lat": '55.756962', 
        "lng": '37.614587',
        "description": 'м. Охотный ряд, ТЦ Охотный ряд, Electrastyle, ул. Мира д 15',
        "phone": '+7 999 888 77 66',
        "instatram": '#',
        "vk": '#',
        "facebook": '#',
        "youtube": '#'        
    }
    
    ];
        window.onload = function () {
            LoadMap();
        }
        function LoadMap() {

		 var customMapType = new google.maps.StyledMapType([
        {
            featureType: "poi", 
            elementType: "labels",             
            stylers: [
              {
                  visibility: "off"
              }
            ]
        }
    ], {
        name: 'Custom Style'
    });
    var customMapTypeId = 'custom_style';
    var mapOptions = {
        zoom: 17,
        lat: 55.756877,
        lng: 37.615166,
        scrollwheel: false,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
        },

        center: new google.maps.LatLng(55.756877, 37.615166),        
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
        }  
               
            };
              var map = new google.maps.Map(document.getElementById("map"), mapOptions);             
              map.mapTypes.set(customMapTypeId, customMapType);
              map.setMapTypeId(customMapTypeId);

            //Create and open InfoWindow.
            var infoWindow = new google.maps.InfoWindow({
                pixelOffset: new google.maps.Size(0,216)
            }
            );
            for (var i = 0; i < markers.length; i++) {
                var data = markers[i];

                var myLatlng = new google.maps.LatLng(data.lat, data.lng);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    id: data.idItem,
                    title: data.title,
                    icon: {
                      url: "images/icons/marker.png",
                      scaledSize: new google.maps.Size(40, 61)
                    }                
                });
                gmarkers.push(marker);

    
                //Attach click event to the marker.
                (function (marker, data) {
                    google.maps.event.addListener(marker, "click", function (e) {
                        //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                        var windowWidth = $(window).width();
                        // if(windowWidth >= 1024) { old_8913
                        if(windowWidth >= 1025) {
                        infoWindow.setContent('<div id="bx-id-'+data.idItem+'" class="baloon-innr"><h3>'+data.title+'</h3><p>'+data.description+'</p></div>');
                          infoWindow.open(map, marker);
                          $('.gm-style-iw').parent().addClass("markerStyle");


                        setTimeout(function() {
                          $('.gm-style-iw').parent().addClass("markerStyle");
                        }, 1);   
                        } 

						             
						          // if(windowWidth <= 1023) {       old_8913
						          if(windowWidth <= 1024) {       
							          //показываем балун на мобильном
							          $('.baloon__list>li').hide();
							          $('.baloon__list').fadeIn();
							          $('.baloon__list li#baloon-id-'+marker.id).fadeIn();  
							            
							          setTimeout(function() {
							            scrollTo($('.baloon__list').offset().top, 1000);
							          }, 100);              
						            
						          }   

                    });
                })(marker, data);


        $('.baloon__list').append('<li class="baloon-item" id="baloon-id-'+data.idItem+'"><div class="baloon-text"><h3>'+data.title+'</h3><p>'+data.description+'</p><div class="map-dop">' +
          
          '<ul class="shop-soc">' +
            '<li><a class="shop-soc-inst" href="'+data.instatram+'"></a></li>' +
            '<li><a class="shop-soc-vk" href="'+data.vk+'"></a></li>' +
            '<li><a class="shop-soc-fb" href="'+data.facebook+'"></a></li>' +
            '<li><a class="shop-soc-yt" href="'+data.youtube+'"></a></li>' +
          '</ul>'+
          '<div class="shop-phone"><a href="tel:'+data.phone+'">'+data.phone+'</a></div>'

        +'</div></div><span class="close-baloon"></span></li>');                    

            }//end for 

      $(".view-map").on('click', function(e){
        e.preventDefault();
          var link = $(this).data('id');

          google.maps.event.trigger(gmarkers[link], "click");

          var windowWidth = $(window).width();   
          // if(windowWidth <= 1023) {         old_8913 
          if(windowWidth <= 1024) {          
            $('.tab__adress li[data-tab="tab2"]').trigger('click');
            setTimeout(function() {
              scrollTo($('.baloon__list').offset().top, 1000);
            }, 100);  
          }
            //показываем мобильный балун
            $('.baloon__list>li').hide();
            $('.baloon__list').fadeIn();
            $('.baloon__list li#baloon-id-'+link).fadeIn();

      });

      

        }


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