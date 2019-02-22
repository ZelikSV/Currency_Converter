const myApp = angular.module('myApp', []);

myApp.service('getCurrency', ['$http', function($http) {
  this.list = [];
  this.loadCache = () => {
    $http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
      .then(({ data }) => angular.copy(data, this.list));
    return this.list;
  };
}]);

myApp.service('currencyService', function() {
  this.convertToUa = (from, to) => {
    let result = 0;
    result = from * to;

    return result;
  };

  this.convertFromUa = (from, to) => {
    let res = 0;
    res = from / to;
    return res;
  };

  this.addCommission = (sum, pr) => {
    let res = 0;
    res = sum * pr / 100;
    return res;
  };
});

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
