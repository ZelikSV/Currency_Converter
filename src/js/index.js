/* global angular, firebase */
(function() {
  const myApp = angular.module('myApp', ['firebase', 'ui.router']);
  const config = {
    apiKey: 'AIzaSyCGSVRREJFH1OxxcgB0nSrabmaEKG6KvwQ',
    authDomain: 'currency-converter-c1ee0.firebaseapp.com',
    databaseURL: 'https://currency-converter-c1ee0.firebaseio.com',
    projectId: 'currency-converter-c1ee0',
    storageBucket: 'currency-converter-c1ee0.appspot.com',
    messagingSenderId: '1034697496097'
  };

  firebase.initializeApp(config);

  myApp.config(['currencyServiceProvider', '$stateProvider', function(currencyServiceProvider, $stateProvider) {
    $stateProvider
      .state({
        name: 'home',
        url: '/home',
        templateUrl: 'homePage.html'
      })
      .state({
        name: 'converter',
        url: '/converter',
        component: 'myConverter'
      })
      .state({
        name: 'contacts',
        url: '/contacts',
        template: '<div>Our contacts</div>'
      })
      .state({
        name: 'login',
        url: '/login',
        templateUrl: 'loginForm.html'
      });

    currencyServiceProvider.setAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
  }])
    .run(function($window, $rootScope) {
      $rootScope.netActive = navigator.onLine;
      $window.addEventListener('offline', function() {
        $rootScope.$apply(function() {
          $rootScope.netActive = false;
        });
      });
      $window.addEventListener('online', function() {
        $rootScope.$apply(function() {
          $rootScope.netActive = true;
        });
      });
    });
  window.myApp = myApp;
}());