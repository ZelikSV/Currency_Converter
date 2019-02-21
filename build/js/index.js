const myApp = angular.module('myApp', []);
myApp.controller('myController', function($scope, $http) {
    $scope.activeTab = true;
    $scope.countVal = 0;
    $scope.costVal = 0;
    $scope.model = [];
    $http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
      .then(response => { response.data.forEach(item => {
        $scope.model.push(item.ccy);
      }); });
  });
  
