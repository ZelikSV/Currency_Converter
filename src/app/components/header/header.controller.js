'use strict';

export default class HeaderController {
    constructor($log) {
        'ngInject';
        this.$log = $log;
    }

    $onInit() {
        this.$log.log('Hello from the footer component controller!');
    }
}