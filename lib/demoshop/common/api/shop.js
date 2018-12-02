/**
 * Mocking client-server processing
 */
'use strict';

var Shop = exports;

// var _products = require('./products.json');
var _products = [
    {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2, "image": "../demoshop/common/assets/ipad-mini.png"},
    {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10, "image": "../demoshop/common/assets/t-shirt.png"},
    {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 7, "image": "../demoshop/common/assets/sucker.png"}
];

var TIMEOUT = 100;

Shop.getProducts = function (cb, timeout) {
    timeout = timeout || TIMEOUT;
    setTimeout(function () {
        cb(_products);
    }, timeout);
};

Shop.buyProducts = function (payload, cb, timeout) {
    timeout = timeout || TIMEOUT;
    setTimeout(function () {
        cb();
    }, timeout);
};
