function config(currencyServiceProvider) {
    'ngInject';

    currencyServiceProvider.setAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
  }

export default config;
