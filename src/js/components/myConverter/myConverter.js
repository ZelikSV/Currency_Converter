/* global myApp */
(function() {
  myApp.component('myConverter', {
    templateUrl: '/components/myConverter/template/my-converter.html',
    replace: false,
    controller: 'myController',
    controllerAs: 'mc'
  });
}());