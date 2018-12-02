'use strict';

var React = require('react');
var CartContainer = require('./CartContainer.jsx');
var ProductsContainer = require('./ProductsContainer.jsx');
var WebAPIUtils = require('../utils/WebAPIUtils');

export default class App extends React.Component {

    componentDidMount() {
        WebAPIUtils.getAllProducts();
    }

    render() {
        return (
            <div>
                <ProductsContainer />
                <CartContainer />
            </div>
        );
    }
}
