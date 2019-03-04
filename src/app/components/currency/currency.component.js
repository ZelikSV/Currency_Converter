import currencyTpl from './currency.html';
import CurrencyController from './currency.controller';

export default class CurrencyComponent {
    constructor() {
        this.templateUrl = currencyTpl;
        this.controller = CurrencyController;
        this.controllerAs = 'mc';
    }
}