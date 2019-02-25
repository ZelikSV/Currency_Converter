/* global myApp, angular*/
(function() {
  myApp.service('currencyService', ['$http', function($http) {
    this.list = [];
    this.loadCache = () => {
      $http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        .then(({ data }) => {
          data.forEach(item => this.list.push(item));
          this.list.push({ ccy: 'UAH', buy: '1', sale: '1' });
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

    this.countTax = (sum, pr) => {
      let res = 0;
      res = sum * pr / 100;
      return res;
    };
  }]);

  myApp.constant('mainConstants', {
    'percentageTax': [0, 1, 2, 3, 4, 5],
    'cities': ['Kiev', 'Dnieper', 'Kharkov', 'Lvov', 'Zaporozhye', 'Krivoy Rog'],
    'currency': [{ ccy: 'USD', buy: '26.80000', sale: '27.10000', $$hashKey: 'object:3' },
      { ccy: 'EUR', buy: '30.30000', sale: '30.80000', $$hashKey: 'object:7' }]
  });
}());
