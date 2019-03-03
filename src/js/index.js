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

  myApp.config(['currencyServiceProvider', '$stateProvider', '$urlRouterProvider',
    function(currencyServiceProvider, $stateProvider, $urlRouterProvider) {
      $stateProvider
        .state({
          name: 'main',
          url: '/main',
          templateUrl: '/components/main/main.html'
        })
        .state('main.home', {
          url: 'main/home',
          templateUrl: '/components/homePage/template/homePage.html'
        })
        .state('main.converter', {
          url: 'main/converter',
          component: 'myConverter'
        })
        .state('main.contacts', {
          url: 'main/contacts',
          templateUrl: '/components/contactsPage/template/contactsPage.html'
        })
        .state({
          name: 'login',
          url: '/login',
          controller: 'myFormlogin',
          controllerAs: 'fc',
          templateUrl: '/components/loginForm/template/loginForm.html'
        })
        .state('login.logout', {
          url: 'login/logout',
          controller: 'myFormlogin',
          controllerAs: 'fc',
          templateUrl: '/components/loginForm/template/registration.html'
        })
        .state('login.loginenter', {
          url: '/loginenter',
          controller: 'myFormlogin',
          controllerAs: 'fc',
          templateUrl: '/components/loginForm/template/login.html'
        });

      $urlRouterProvider.otherwise('/login/loginenter');

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