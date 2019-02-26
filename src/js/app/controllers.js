/* global myApp, Firebase */
(function() {
  myApp.controller('myController', [
    'currencyService',
    'mainConstants',
    '$scope',
    '$firebase', function(currencyService, mainConstants, $scope, $firebase) {
      this.countVal = null;
      this.costVal = null;
      this.currency = currencyService.loadCache();
      this.currencyFrom = mainConstants.currency[0];
      this.currencyTo = mainConstants.currency[1];
      this.percentageTax = mainConstants.percentageTax;
      this.citiesLocation = mainConstants.cities;
      this.city = mainConstants.cities[0];
      this.taxValue = mainConstants.percentageTax[0];

      const dbLink = firebase.database().ref().child('text');
      dbLink.on('value', snap => snap.node_.value_);

      $scope.$watchGroup(['mc.currencyFrom', 'mc.currencyTo', 'mc.countVal'], () => {
        this.convertValue();
      });

      $scope.$watch('mc.taxValue', () => {
        this.takeFee();
      });

      this.changeValues = () => {
        [this.countVal, this.costVal] = [this.costVal, this.countVal];
        [this.currencyFrom, this.currencyTo] = [this.currencyTo, this.currencyFrom];
      };

      this.convertValue = () => {
        const res = currencyService.convertToUa(this.countVal, this.currencyFrom.buy);
        this.costVal = currencyService.convertFromUa(res, this.currencyTo.sale);
      };

      this.takeFee = () => {
        this.convertValue();
        this.costVal -= currencyService.countTax(this.costVal, this.taxValue);
      };
    }]);

  myApp.component('myConverter', {
    templateUrl: 'my-app.html',
    replace: true
  });
}());