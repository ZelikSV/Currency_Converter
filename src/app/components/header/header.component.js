'use strict';

import headerTpl from './header.html';
import HeaderController from './header.controller';

export default class HeaderComponent {
    constructor() {
        this.templateUrl = headerTpl;
        this.controller = HeaderController;
    }
}