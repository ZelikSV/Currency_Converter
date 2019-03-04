
const shared = angular.module('core.shared', []);

import netChecker from './directives/net-checker/net-checker';

import constants from './services/constants';
import currencyService from './services/resolver.provider';
import currencyFilter from './services/filter'; 

netChecker(shared);

constants(shared);
currencyService(shared);
currencyFilter(shared);

export default shared;
