/* global myApp, angular*/
(function() {
  myApp.service('currencyService', ['$http', function($http) {
    this.list = [];
    this.loadCache = () => {
      $http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        .then(({ data }) => angular.copy(data, this.list));
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
