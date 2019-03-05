import currencyModule from './components/currency/currency.module';
import headerModule from './components/header/header.module';
import footerModule from './components/footer/footer.module';


export default angular.module('index.components', [
	currencyModule.name,
	headerModule.name,
	footerModule.name
]);
