export default function (app) {
    app
        .constant('mainConstants', {
            'percentageTax': [0, 1, 2, 3, 4, 5],
            'cities': ['Kiev', 'Dnieper', 'Kharkov', 'Lvov', 'Zaporozhye', 'Krivoy Rog'],
            'currency': [{ ccy: 'USD', buy: '26.80000', sale: '27.10000', $$hashKey: 'object:5' },
              { ccy: 'EUR', buy: '30.30000', sale: '30.80000', $$hashKey: 'object:9' }]
          });
}