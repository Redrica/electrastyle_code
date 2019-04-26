window.onload = function () {
    LoadMapOffice();
    LoadMapStorage();
};

function LoadMapOffice() {
    var gmarkers = [];
    var markers = [
        {
            "idItem": "0",
            "title": 'ОФИС И ШОУРУМ',
            "lat": '55.627139',
            "lng": '37.620282',
            "description": '117585, Москва, Варшавское шоссе д.125, строение 1, секция 7, НИИ «АРГОН», офис 7412'
        }
    ];

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
        zoom: 16,
        lat: 55.627139,
        lng: 37.620282,
        scrollwheel: false,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },

        center: new google.maps.LatLng(55.626839, 37.620282),
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
        }
    };

    var map = new google.maps.Map(document.getElementById("map-office"), mapOptions);
    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);

    //Create and open InfoWindow.
    var infoWindow = new google.maps.InfoWindow({
            pixelOffset: new google.maps.Size(0, 216)
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
                infoWindow.setContent('<div id="bx-id-' + data.idItem + '" class="baloon-innr"><h3>' + data.title + '</h3><p>' + data.description + '</p></div>');
                infoWindow.open(map, marker);
                $('.gm-style-iw').parent().addClass("markerStyle");


                setTimeout(function () {
                    $('.gm-style-iw').parent().addClass("markerStyle");
                }, 1);
            });
        })(marker, data);
    }
}

function LoadMapStorage() {
    var gmarkers = [];
    var markers = [
        {
            "idItem": "0",
            "title": 'СКЛАД',
            "lat": '55.428197',
            "lng": '37.553780',
            "description": 'Московская область., г. Подольск, ул. Комсомольская, д.1, Завод им. Калинина, Ворота №6, cклад ООО «АРТ ДИЗАЙН»'
        }
    ];

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
        zoom: 16,
        lat: 55.428197,
        lng: 37.553780,
        scrollwheel: false,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },

        center: new google.maps.LatLng(55.427197, 37.553780),
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
        }
    };

    var map = new google.maps.Map(document.getElementById("map-storage"), mapOptions);
    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);

    //Create and open InfoWindow.
    var infoWindow = new google.maps.InfoWindow({
            pixelOffset: new google.maps.Size(0, 216)
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
                infoWindow.setContent('<div id="bx-id-' + data.idItem + '" class="baloon-innr"><h3>' + data.title + '</h3><p>' + data.description + '</p></div>');
                infoWindow.open(map, marker);
                $('.gm-style-iw').parent().addClass("markerStyle");


                setTimeout(function () {
                    $('.gm-style-iw').parent().addClass("markerStyle");
                }, 1);
            });
        })(marker, data);
    }
}