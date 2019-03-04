
import homeTemplate from '!!file-loader?name=templates/[name].[ext]!./pages/home/home.html';

import loginFormInTemplate from '!!file-loader?name=templates/[name].[ext]!./pages/login/login.html';

import converterTemplate from '!!file-loader?name=templates/[name].[ext]!./pages/converter/converter.html';


function routeConfig($urlRouterProvider, $stateProvider) {
  'ngInject';

  $stateProvider
  .state({
    name: 'home',
    url: '/',
    templateUrl: homeTemplate
  })
  .state({
    name: 'converter',
    url: '/converter',
    templateUrl: converterTemplate
  })
  .state({
    name: 'login',
    url: '/login',
    templateUrl: loginFormInTemplate
  });

  $urlRouterProvider.otherwise('/');

}

export default angular
  .module('index.routes', [])
    .config(routeConfig);

