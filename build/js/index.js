/* global angular*/
(function() {
  const myApp = angular.module('myApp', []);
  window.myApp = myApp;
}());
/* global myApp, angular*/
(function() {
  myApp.service('currencyService', ['$http', function($http) {
    this.list = [];
    this.loadCache = () => {
      $http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        .then(({ data }) => {
          data.push({ ccy: 'UAH', buy: '1', sale: '1' });
          return angular.copy(data, this.list);
        });
      return this.list;
    };

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
  }]);

  myApp.constant('mainConstants', {
    'percentageTax': [0, 1, 2, 3, 4, 5],
    'cities': ['Kiev', 'Dnieper', 'Kharkov', 'Lvov', 'Zaporozhye', 'Krivoy Rog']
  });
}());

/* global myApp */
(function() {
  myApp.controller('myController', ['currencyService', 'mainConstants', function(currencyService, mainConstants) {
    this.activeTab = true;
    this.countVal = null;
    this.costVal = null;
    this.currency = currencyService.loadCache();
    this.currencyFrom = { ccy: 'USD', buy: '26.85000', sale: '27.15000', $$hashKey: 'object:3' };
    this.currencyTo = { ccy: 'EUR', buy: '30.30000', sale: '30.80000', $$hashKey: 'object:7' };
    this.percentageTax = mainConstants.percentageTax;
    this.citiesLocation = mainConstants.cities;
    this.city = 'Kiev';
    this.commissionValue = 0;

    this.changeValues = () => {
      [this.countVal, this.costVal] = [this.costVal, this.countVal];
      [this.currencyFrom, this.currencyTo] = [this.currencyTo, this.currencyFrom];
    };

    this.convertValue = () => {
      let res = 0;

      res = currencyService.convertToUa(this.countVal, this.currencyFrom.buy);
      this.costVal = currencyService.convertFromUa(res, this.currencyTo.sale);
    };

    this.addCommissions = () => {
      this.convertValue();
      this.costVal -= currencyService.addCommission(this.costVal, this.commissionValue);
    };
  }]);

  myApp.filter('currencyFilter', function() {
    return function(array, comp) {
      return array.filter(item => item.ccy !== comp);
    };
  });
}());