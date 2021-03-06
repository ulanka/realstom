(function(){
	var app = angular.module('stom', ['ngMaterial', 'stom.stomSer']);
	
	app.controller('stomController', function($scope){
		this.title2 = 'Button';
		$scope.title1 = 'Button';
		$scope.myUrl = '/companyinfo/workinghours';
	});
	

	app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },300);
      return debounceFn;
    }
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });
	
	app.controller('MyController', function($mdMedia, $scope) {
  $scope.$watch(function() { return $mdMedia('lg'); }, function(big) {
    $scope.bigScreen = big;
  });
  $scope.screenIsSmall = $mdMedia('sm');
  $scope.customQuery = $mdMedia('(min-width: 1234px)');
  $scope.anotherCustom = $mdMedia('max-width: 300px');
});

	
	
	

})();
