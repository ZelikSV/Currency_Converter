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
}());
