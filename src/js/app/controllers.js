/* global myApp */
(function() {
  myApp.controller('myController', ['currencyService', 'mainConstants', function(currencyService, mainConstants) {
    this.activeTab = true;
    this.countVal = null;
    this.costVal = null;
    this.currency = currencyService.loadCache();
    this.currencyFrom = 'USD';
    this.currencyTo = 'EUR';
    this.percentageTax = mainConstants.percentageTax;
    this.citiesLocation = mainConstants.cities;
    this.city = 'Kiev';
    this.commissionValue = 0;

    this.changeValues = () => {
      [this.countVal, this.costVal] = [this.costVal, this.countVal];
      [this.currencyFrom, this.currencyTo] = [this.currencyTo, this.currencyFrom];
    };

    this.convertValue = () => {
      const indexBuy = this.currency.findIndex(item => item.ccy === this.currencyFrom);
      const indexSale = this.currency.findIndex(item => item.ccy === this.currencyTo);
      let res = 0;

      res = currencyService.convertToUa(this.countVal, this.currency[indexBuy].buy);
      this.costVal = currencyService.convertFromUa(res, this.currency[indexSale].sale);
    };

    this.addCommissions = () => {
      this.convertValue();
      this.costVal -= currencyService.addCommission(this.costVal, this.commissionValue);
    };
  }]);

  myApp.filter('currencyFilter', function() {
    return function(array, comp) {
      return array.filter(item => item.ccy !== comp);
    };
  });
}());