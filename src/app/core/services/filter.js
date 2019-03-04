  export default function (app) {
    app
    .filter('currencyFilter', function() {
      return function(array, comp) {
        return array.filter(item => item.ccy !== comp);
      };
    });
}