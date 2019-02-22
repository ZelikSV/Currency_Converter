const myApp = angular.module('myApp', []);
myApp.controller('myController', ['$scope', 'getCurrency', 'currencyService', function($scope, getCurrency, currencyService) {
  $scope.activeTab = true;
  $scope.countVal = null;
  $scope.costVal = null;
  $scope.currency = getCurrency.loadCache();
  $scope.currencyFrom = 'USD';
  $scope.currencyTo = 'EUR';

  $scope.changeValues = () => {
    [$scope.countVal, $scope.costVal] = [$scope.costVal, $scope.countVal];
    [$scope.currencyFrom, $scope.currencyTo] = [$scope.currencyTo, $scope.currencyFrom];
  };

  $scope.convertValue = () => {
    let res = 0;
    $scope.currency.forEach(item => {
      if (item.ccy === $scope.currencyFrom) {
        res = currencyService.convertToUa($scope.countVal, item.buy);
      }
    });

    $scope.currency.forEach(item => {
      if (item.ccy === $scope.currencyTo) {
        $scope.costVal = currencyService.convertFromUa(res, item.sale);
      }
    });
  };
  $scope.addCommissions = e => {
    $scope.costVal -= currencyService.addCommission($scope.costVal, e.target.value);
  };
}]);
