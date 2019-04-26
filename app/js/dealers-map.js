window.onload = function () {
    LoadMapDealers();
};

function LoadMapDealers() {
    var gmarkers = [];
    var markers = [
        {
            "idItem": "0",
            "title": 'Новосибирск',
            "lat": '61.111884',
            "lng": '97.224620',
            "description": 'г. Новосибирск, ул. Гоголя,  д.204-А, офис 202',
            "phone": '+7 383 208-06-33'
        },
        {
            "idItem": "1",
            "title": 'Санкт-Петербург',
            "lat": '58.263808',
            "lng": '89.885753',
            "description": 'Санкт-Петербург, ул. Заставская, д. 33 (метро Московские ворота)',
            "phone": '+7 999 888 77 66'
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
        zoom: 4,
        lat: 61.111884,
        lng: 97.224620,
        scrollwheel: false,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },

        center: new google.maps.LatLng(61.111884, 97.224620),
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
        }
    };

    var map = new google.maps.Map(document.getElementById("map-dealers"), mapOptions);
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
                infoWindow.setContent('<div id="bx-id-' + data.idItem + '" class="baloon-innr"><h3>' + data.title + '</h3><p>' + data.description + '</p><p>' + data.phone + '</p></div>');
                infoWindow.open(map, marker);
                $('.gm-style-iw').parent().addClass("markerStyle");


                setTimeout(function () {
                    $('.gm-style-iw').parent().addClass("markerStyle");
                }, 1);
            });
        })(marker, data);
    }
}