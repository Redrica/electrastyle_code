    var markers = [
    {
        "idItem": "1",
        "title": 'Магазин “Теплая одежда” 1',
        "lat": '61.111884', 
        "lng": '97.224620',
        "description": 'м. Охотный ряд, ТЦ Охотный ряд, Electrastyle, ул. Мира д 15',
        "phone": '+7 999 888 77 66',
        "instatram": '#',
        "vk": '#',
        "facebook": '#',
        "youtube": '#'
    },
    {
        "idItem": "2",
        "title": 'Сеть магазинов “Бархат” 2',
        "lat": '58.263808',
        "lng": '89.885753',
        "description": 'м. Охотный ряд, ТЦ Охотный ряд, Electrastyle, ул. Мира д 15',
        "phone": '+7 999 888 77 66',
        "instatram": '#',
        "vk": '#',
        "facebook": '#',
        "youtube": '#'        
    },
    {
        "idItem": "3",
        "title": 'Сеть магазинов “STYLVO” 3',
        "lat": '58.448251', 
        "lng": '91.687511',
        "description": 'м. Охотный ряд, ТЦ Охотный ряд, Electrastyle, ул. Мира д 15',
        "phone": '+7 999 888 77 66',
        "instatram": '#',
        "vk": '#',
        "facebook": '#',
        "youtube": '#'        
    },
    {
        "idItem": "4",
        "title": 'Магазин “Теплая одежда” 4',
        "lat": '56.753266', 
        "lng": '91.028331',
        "description": 'м. Охотный ряд, ТЦ Охотный ряд, Electrastyle, ул. Мира д 15',
        "phone": '+7 999 888 77 66',
        "instatram": '#',
        "vk": '#',
        "facebook": '#',
        "youtube": '#'        
    },
    {
        "idItem": "5",
        "title": 'Сеть магазинов “Бархат” 5',
        "lat": '56.801421', 
        "lng": '94.412120',
        "description": 'м. Охотный ряд, ТЦ Охотный ряд, Electrastyle, ул. Мира д 15',
        "phone": '+7 999 888 77 66',
        "instatram": '#',
        "vk": '#',
        "facebook": '#',
        "youtube": '#'        
    },
    {
        "idItem": "6",
        "title": 'Сеть магазинов “STYLVO” 3',
        "lat": '57.845278', 
        "lng": '96.653331',
        "description": 'м. Охотный ряд, ТЦ Охотный ряд, Electrastyle, ул. Мира д 15',
        "phone": '+7 999 888 77 66',
        "instatram": '#',
        "vk": '#',
        "facebook": '#',
        "youtube": '#'        
    },
    {
        "idItem": "7",
        "title": 'Магазин “Теплая одежда” 4',
        "lat": '59.153911', 
        "lng": '97.751964',
        "description": 'м. Охотный ряд, ТЦ Охотный ряд, Electrastyle, ул. Мира д 15',
        "phone": '+7 999 888 77 66',
        "instatram": '#',
        "vk": '#',
        "facebook": '#',
        "youtube": '#'        
    },
    {
        "idItem": "8",
        "title": 'Сеть магазинов “Бархат” 5',
        "lat": '59.400869', 
        "lng": '100.740245',
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
                center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
                zoom: 5,
                streetViewControl: false,
                //mapTypeId: google.maps.MapTypeId.ROADMAP
                
								mapTypeControl: false,
								mapTypeControlOptions: {
								  mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
								}  
			             
            };
	            var map = new google.maps.Map(document.getElementById("mapStor"), mapOptions);          
	            map.mapTypes.set(customMapTypeId, customMapType);
	    				map.setMapTypeId(customMapTypeId);

            //Create and open InfoWindow.
            var infoWindow = new google.maps.InfoWindow({
                pixelOffset: new google.maps.Size(-1,184)
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
                      scaledSize: new google.maps.Size(19, 29)
                    }                
                });

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

                    });
                })(marker, data);

        google.maps.event.addListener(marker, "click", function (e) {

          var idBallon = $(this).attr('id');

          //показываем балун на мобильном
          $('.baloon__list>li').hide();
          $('.baloon__list').fadeIn();
          $('.baloon__list li#baloon-id-'+idBallon).fadeIn();  

          var windowWidth = $(window).width();   
          // if(windowWidth <= 1023) {      old_8913 
          if(windowWidth <= 1024) {       
          setTimeout(function() {
            scrollTo($('.baloon__list').offset().top, 1000);
          }, 100);              
            
          } 
          

        });      


        $('.baloon__list').append('<li class="baloon-item" id="baloon-id-'+data.idItem+'"><div class="baloon-text"><h3>'+data.title+'</h3><p>'+data.description+'</p><div class="map-dop">' +
          
          '<ul class="shop-soc">' +
            '<li><a class="shop-soc-inst" href="'+data.instatram+'"></a></li>' +
            '<li><a class="shop-soc-vk" href="'+data.vk+'"></a></li>' +
            '<li><a class="shop-soc-fb" href="'+data.facebook+'"></a></li>' +
            '<li><a class="shop-soc-yt" href="'+data.youtube+'"></a></li>' +
          '</ul>'+
          '<div class="shop-phone"><a href="tel:'+data.phone+'">'+data.phone+'</a></div>'

        +'</div></div><span class="close-baloon"></span></li>');          
                
            }
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