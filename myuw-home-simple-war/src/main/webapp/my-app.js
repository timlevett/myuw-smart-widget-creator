'use strict';

(function() {
	
	app.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/default', {
				templateUrl: 'my-app.html'
			}).otherwise({
				redirectTo: '/default'
			});
		}
	]);
  
  app.directive('widgetCard', function(){
      return {
          restrict : 'E',
          templateUrl : 'widget-card.html'
      }
  });
  
  app.controller("GenericWidgetController",['$scope', '$route', '$localStorage', function($scope, $route, $localStorage){
    $scope.storage = $localStorage;
    
    var validJSON = function isValidJson(json) {
      try {
          JSON.parse(json);
          return true;
      } catch (e) {
          return false;
      }
	}
    
    var init = function(){
      $scope.storage.isEmpty = false;
      $scope.storage.template = "";
      $scope.storage.content = "";
      $scope.storage.portlet = {
        title : "My Portlet",
        description : "This super cool portlet can change lives."
      };
      
      $scope.storage.inited = true;
    };
    if(!$scope.storage.inited) {
      init();
    } else {
      $scope.template = $scope.storage.template;
      $scope.portlet = $scope.storage.portlet;
      $scope.isEmpty = $scope.storage.isEmpty;
      
      if(validJSON($scope.storage.content)) {
      	$scope.content = JSON.parse($scope.storage.content);
      } else {
        $scope.content = {}
        $scope.errorJSON = "JSON NOT VALID";
      }
      
    }
   
    $scope.reload = function(){
      $route.reload();
    };
    
    
    
  }]);

})();