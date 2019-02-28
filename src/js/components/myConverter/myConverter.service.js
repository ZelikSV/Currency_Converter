/* global myApp, angular*/
(function() {
  myApp.provider('currencyService', function() {
    let API = '';

    return {
      setAPI: apiUrl => (API = apiUrl),

      $get: ['$http', '$firebase', function($http, $firebase) {
        return {
          loadCache: () => {
            const list = [];
            $http.get(API)
              .then(({ data }) => {
                angular.copy(data, list);
              });
            list.push({ ccy: 'UAH', buy: '1', sale: '1' });
            return list;
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
          },
          getDataBaseValues() {
            const dbLink = firebase.database().ref()
              .child('text');
            dbLink.on('value', snap => console.log(snap));
          }
        };
      }]
    };
  });

  myApp.constant('mainConstants', {
    'percentageTax': [0, 1, 2, 3, 4, 5],
    'cities': ['Kiev', 'Dnieper', 'Kharkov', 'Lvov', 'Zaporozhye', 'Krivoy Rog'],
    'currency': [{ ccy: 'USD', buy: '26.80000', sale: '27.10000', $$hashKey: 'object:6' },
      { ccy: 'EUR', buy: '30.30000', sale: '30.80000', $$hashKey: 'object:9' }]
  });
}());
