/* global angular*/
(function() {
  const myApp = angular.module('myApp', []);

  myApp.config(['currencyServiceProvider', function(currencyServiceProvider) {
    currencyServiceProvider.setAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
  }])
    .run([function() {

    }]);
  window.myApp = myApp;
}());