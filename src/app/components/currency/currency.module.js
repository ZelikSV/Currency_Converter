import CurrencyComponent from './currency.component';

const currencyModule = angular.module('currency-module', []);

currencyModule
    .component('currencyApp', new CurrencyComponent());

export default currencyModule;
