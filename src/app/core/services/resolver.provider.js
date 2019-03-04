
export default function (app) {
    app.provider('currencyService', currencyService);

    function currencyService () {
        let API = '';

        return {
          setAPI: apiUrl => (API = apiUrl),
    
          $get: ['$http', function($http) {
            return {
              loadCache: () => {
                const list = [];
                $http.get(API)
                  .then(({ data }) => {
                    angular.copy([...data, { ccy: 'UAH', buy: '1', sale: '1' }], list);
                  });
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
              }
            };
          }]
        };
    }

}