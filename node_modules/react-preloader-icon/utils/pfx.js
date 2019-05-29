'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var memory = {};

function pfx(property) {
    if (memory[property]) {
        return memory[property];
    }

    var style = document.createElement("dummy").style;
    var prefixes = ['Webkit', 'Moz', 'O', 'ms'];
    var camelCaseProp = property.replace(/-(\w)/g, function (m, g) {
        return g.toUpperCase();
    });
    var firstUpperProp = camelCaseProp.charAt(0).toUpperCase() + camelCaseProp.substr(1);
    var properties = (camelCaseProp + " " + prefixes.join(firstUpperProp + " ") + firstUpperProp).split(" ");

    memory[property] = {
        support: false,
        prefix: '',
        original: property,
        property: ''
    };

    for (var i = 0, n = properties.length; i < n; i++) {
        if (style[properties[i]] !== undefined) {
            memory[property] = {
                support: true,
                prefix: prefixes[i - 1] || '',
                original: property,
                property: properties[i]
            };

            break;
        }
    }

    return memory[property];
}

exports.default = pfx;