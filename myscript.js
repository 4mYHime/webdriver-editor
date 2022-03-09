// 修改自：https://stackoverflow.com/questions/23202136/changing-navigator-useragent-using-chrome-extension
// Date: 2018-12-18
// Version: 1.0.0


var actualCode =  '(' + function() {
    'use strict';
    var navigator = window.navigator;
    var modifiedNavigator;
    if ('webdriver' in Navigator.prototype) {
        // Chrome 43+ moved all properties from navigator to the prototype,
        // so we have to modify the prototype instead of navigator.
        modifiedNavigator = Navigator.prototype;

    } else {
        // Chrome 42- defined the property on navigator.
        modifiedNavigator = Object.create(navigator);
        Object.defineProperty(window, 'navigator', {
            value: modifiedNavigator,
            configurable: false,
            enumerable: false,
            writable: false
        });
    }
    // clean navigator.webdriver
    Object.defineProperties(modifiedNavigator, {
        webdriver: {
            value: undefined,
            configurable: false,
            enumerable: true,
            writable: false
        },
    });
} + ')();';

var s = document.createElement('script');
s.textContent = actualCode;
document.documentElement.appendChild(s);
s.remove();