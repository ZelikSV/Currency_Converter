/* global myApp, angular*/
(function() {
  const myApp = angular.module('myApp', []);
  window.myApp = myApp;
}());
/* global myApp, angular*/
(function() {
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
      result = Math.round(from * to);

      return result;
    };

    this.convertFromUa = (from, to) => {
      let res = 0;
      res = from / to;
      res = Number(res.toFixed(2));
      return res;
    };

    this.addCommission = (sum, pr) => {
      let res = 0;
      res = sum * pr / 100;
      return res;
    };
  });
  myApp.constant('PERCENTAGE_TAX', [0, 1, 2, 3, 4, 5]);
}());

/* global myApp */
(function() {
  myApp.controller('myController', ['getCurrency', 'currencyService', 'PERCENTAGE_TAX', function(getCurrency, currencyService, PERCENTAGE_TAX) {
    this.activeTab = true;
    this.countVal = null;
    this.costVal = null;
    this.currency = getCurrency.loadCache();
    this.currencyFrom = 'USD';
    this.currencyTo = 'EUR';
    this.percentageTax = PERCENTAGE_TAX;
    this.changeValues = () => {
      [this.countVal, this.costVal] = [this.costVal, this.countVal];
      [this.currencyFrom, this.currencyTo] = [this.currencyTo, this.currencyFrom];
    };

    this.convertValue = () => {
      let res = 0;
      this.currency.forEach(item => {
        if (item.ccy === this.currencyFrom) {
          res = currencyService.convertToUa(this.countVal, item.buy);
        }
      });

      this.currency.forEach(item => {
        if (item.ccy === this.currencyTo) {
          this.costVal = currencyService.convertFromUa(res, item.sale);
        }
      });
    };
    this.addCommissions = e => {
      this.costVal -= currencyService.addCommission(this.costVal, e.target.value);
    };
  }]);

  myApp.filter('currencyFilter', function() {
    return function(array, comp) {
      return array.filter(item => item.ccy !== comp);
    };
  });
}());