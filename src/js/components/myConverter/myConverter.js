/* global myApp */
(function() {
  myApp.component('myConverter', {
    templateUrl: '/components/myConverter/template/my-converter.html',
    replace: true,
    controller: 'myController',
    controllerAs: 'mc'
  });
}());