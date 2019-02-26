/* global myApp, angular*/
(function() {
  myApp.provider('currencyService', function() {
    let API = '';

    return {
      setAPI: apiUrl => (API = apiUrl),

      list: [],

      $get: ['$http', function($http) {
        return {
          loadCache: () => {
            $http.get(API)
              .then(({ data }) => {
                data.forEach(item => this.list.push(item));
                this.list.push({ ccy: 'UAH', buy: '1', sale: '1' });
              });
            return this.list;
          },

          convertToUa(from, to) {
            const result = from * to;

            return result;
          },

          convertFromUa(from, to) {
            const res = from / to;

            return res;
          },

          countTax(sum, pr) {
            const res = sum * pr / 100;

            return res;
          }
        };
      }]
    };
  });

  myApp.constant('mainConstants', {
    'percentageTax': [0, 1, 2, 3, 4, 5],
    'cities': ['Kiev', 'Dnieper', 'Kharkov', 'Lvov', 'Zaporozhye', 'Krivoy Rog'],
    'currency': [{ ccy: 'USD', buy: '26.80000', sale: '27.10000', $$hashKey: 'object:4' },
      { ccy: 'EUR', buy: '30.30000', sale: '30.80000', $$hashKey: 'object:8' }]
  });
}());
