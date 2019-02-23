myApp.controller('myController', ['getCurrency', 'currencyService', function(getCurrency, currencyService) {
  this.activeTab = true;
  this.countVal = null;
  this.costVal = null;
  this.currency = getCurrency.loadCache();
  this.currencyFrom = 'USD';
  this.currencyTo = 'EUR';

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