function runBlock($window, $rootScope) {
	'ngInject';
	$rootScope.netActive = navigator.onLine;
	$window.addEventListener('offline', function() {
	$rootScope.$apply(function() {
		$rootScope.netActive = false;
	});
	});
	$window.addEventListener('online', function() {
	$rootScope.$apply(function() {
		$rootScope.netActive = true;
	});
	});
}

export default runBlock;
