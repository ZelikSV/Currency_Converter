export default function (app) {

    app.directive('netChecker', netChecker);

    function netChecker () {
        'ngInject';

        return {
            restrict: 'A'
        }
    }
}