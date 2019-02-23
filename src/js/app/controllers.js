/* global myApp */
(function() {
  myApp.controller('myController', ['getCurrency', 'currencyService', 'PERCENTAGE_TAX', 'CITIES', function(getCurrency, currencyService, PERCENTAGE_TAX, CITIES) {
    this.activeTab = true;
    this.countVal = null;
    this.costVal = null;
    this.currency = getCurrency.loadCache();
    this.currencyFrom = 'USD';
    this.currencyTo = 'EUR';
    this.percentageTax = PERCENTAGE_TAX;
    this.citiesLocation = CITIES;
    this.changeValues = () => {
      [this.countVal, this.costVal] = [this.costVal, this.countVal];
      [this.currencyFrom, this.currencyTo] = [this.currencyTo, this.currencyFrom];
    };

    this.convertValue = () => {
      let res = 0;
      this.currency.forEach(item => {
        if (item.ccy === this.currencyFrom) {
          res = currencyService.convertToUa(this.countVal, item.buy);
        }
      });

      this.currency.forEach(item => {
        if (item.ccy === this.currencyTo) {
          this.costVal = currencyService.convertFromUa(res, item.sale);
        }
      });
    };
    this.addCommissions = e => {
      this.costVal -= currencyService.addCommission(this.costVal, e.target.value);
    };
  }]);

  myApp.filter('currencyFilter', function() {
    return function(array, comp) {
      return array.filter(item => item.ccy !== comp);
    };
  });
}());