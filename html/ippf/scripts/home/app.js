


var dondev2App = angular.module('dondev2App',['720kb.socialshare','ngMap','ngRoute','ui.materialize','angucomplete','vcRecaptcha','ngTextTruncate','pascalprecht.translate']).

config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
      templateUrl: 'scripts/home/controllers/home/view.html',
      controller: 'homeController'
    }).when('/servicios/:servicio/', {
      templateUrl: 'scripts/home/controllers/location/view.html',
      controller: 'locationController'
    })
    .when('/como-buscas/:servicio/', { //nueva Index
      templateUrl: 'scripts/home/controllers/location/viewTmp.html',
      controller: 'locationController'
    })
    .when('/como-buscas/:servicio/ubicacion', { //nueva vista Opcion 1 (sin uso)
      templateUrl: 'scripts/home/controllers/location/viewUbi.html',
      controller: 'locationController'
    })
    .when('/como-buscas/:servicio/geo', { //nueva vista Opcion 2
      templateUrl: 'scripts/home/controllers/location/viewGeo.html',
      controller: 'locationController'
    })
    .when('/como-buscas/:servicio/sug', { //nueva vista Opcion 3
      templateUrl: 'scripts/home/controllers/suggest-location/viewSug.html',
      controller: 'locationNewController'
    })
    .when('/lugar/nuevo', {
      templateUrl: 'scripts/places/controllers/map/view.html',
      controller: 'placesController'
    }).when('/localizar/:servicio/mapa', {
      templateUrl: 'scripts/home/controllers/city-map/view.html',
      controller: 'locateMapController'
    })
    .when('/localizar/:servicio/listado', {
      templateUrl: 'scripts/home/controllers/locate-list/view.html',
      controller: 'locateListController'
    })
    .when('/:pais/:provincia/:ciudad/:servicio/listado', {
      templateUrl: 'scripts/home/controllers/city-list/view.html',
      controller: 'cityListController'
    })
    .when('/:pais/:provincia/:ciudad/:servicio/mapa', {
      templateUrl: 'scripts/home/controllers/city-map/view.html',
      controller: 'cityMapController'
    })
    .when('/acerca', {
      templateUrl: 'scripts/home/controllers/acerca/view.html',
      controller: 'acercaController'
    })
    .when('/detail/:id', {
      templateUrl: 'scripts/home/controllers/city-map/view2.html',
      controller: 'cityMapController2'
    })
    .when('/califica/:id', {
      templateUrl: 'scripts/home/controllers/evaluation/view.html',
      controller: 'evaluationController'
    })
    .when('/voted/:id', {
      templateUrl: 'scripts/home/controllers/evaluation/completed.html',
      controller: 'evaluationController'
    })

    .otherwise({
        redirectTo: '/'
    });


}])

.config(['$translateProvider', function ($translateProvider) {

  var translation_es = {
    "condones_name": "Condones",
    "condones_content": "Encuentra los lugares más cercanos para retirar condones gratis.",
    "prueba_name": "Prueba VIH",
    "prueba_content": "Encuentra los lugares más cercanos para retirar condones gratis.",
    "mac_name": "Métodos Anticonceptivos",
    "mac_content": "Encuentra los lugares más cercanos para retirar condones gratis.",
    "ile_name": "Interrupción Legal del Embarazo",
    "ile_content": "Encuentra los lugares más cercanos para retirar condones gratis.",
    "dc_name": "Detección de Cancer",
    "dc_content": "Encuentra los lugares más cercanos para retirar condones gratis.",
    "ssr_name": "Salud Sexual y Reproductiva",
    "busqueda_geo_titulo": "Usa tu ubicación actual",
    "busqueda_geo_desc": "Necesita dispositivo con Geolocalización",
    "busqueda_geo_button" : "Buscar",
    "busqueda_auto_titulo": "Escribe tu ciudad.",
    "busqueda_auto_desc": "Ingresa tu ciudad",
    "busqueda_auto_button": "Siguiente",
    "busqueda_auto_acc": "Ubicación Actual (geolocalizada)",
    "cargando_cercanos": "Cargando lugares cercanos",
    "resultado_cantidad_titulo>1": 'Hay [[cantidad]] lugares cerca',
    "resultado_cantidad_titulo=1": 'Hay 1 lugar cerca',
    "friendly_service_label": "Servicio amigable para adolecentes",
    "only_teenager_friendly": "Solo adolecente Friendly",
    "footer_text": 'Donde es una <b>plataforma colaborativa.</b> Si encontrarás un error en los datos o en el funcionamiento de la plataforma <a href="mailto:donde@huesped.org.ar"  target="_self">envianos un mensaje</a>',
    "sort_label_text": "Ordenar:",
    "sort_closest_option": "Más cercano",
    "sort_better_option": "Mejor puntuado",
    "without_address": "Sin dirección",
    "place_distance_size" : "[[distance]] metros",
    "evaluation_singular" : "Evaluación",
    "evaluation_plural" : "Evaluaciones",
    "without_evaluations" : "No hay evaluaciones todavía"
  };


  // add translation table
  $translateProvider
    .translations('es', translation_es)
    .preferredLanguage('es');
}]);


dondev2App.run(function ($rootScope, $timeout, $location) {
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    var url = $location.url();
    if (url.includes("como-buscas")) {
      $("#mainMap").hide();
      $timeout(function () {
        $("#mainMap").show();
      });
    }
  });
});

dondev2App.directive('filterList', function($timeout) {
    return {
        link: function(scope, element, attrs) {

            var li = Array.prototype.slice.call(element[0].children);

            function filterBy(value) {
                li.forEach(function(el) {
                    el.className = el.textContent.toLowerCase().indexOf(value.toLowerCase()) !== -1 ? '' : 'ng-cloak ng-hide';
                });
            }

            scope.$watch(attrs.filterList, function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    filterBy(newVal);
                }
            });
        }
    };
});
dondev2App.config(function($interpolateProvider, $locationProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
})


angular.module('ngMap').run(function($rootScope) {
  $rootScope.$on('mapInitialized', function(evt,map) {
    $rootScope.map = map;
    window.map = $rootScope.map;
    $rootScope.$apply();
  });
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if (!$rootScope.startedNav){
        $rootScope.startedNav =true;
      }
      else {
        $rootScope.navigating = true;
      }
  });
});

dondev2App.filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
}).run(function($rootScope, $location,placesFactory) {
    placesFactory.load(function(data){});
 $rootScope.$on('$locationChangeStart', function(event) {
   if($location.hash().indexOf('anchor')> -1 || $location.hash().indexOf('acerca') > -1) {

          $anchorScroll();

       event.preventDefault();
    }
  });
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        //Cada vez que cambia la vista, se fuerza el cierre del menu.
        $("#sidenav-overlay").trigger("click");



    });
  });



$(document).ready(function(){
    new WOW().init();
    $('.modal-trigger').leanModal();
    $(".button-collapse").sideNav();
});


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
