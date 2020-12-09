"use strict";

var _react = _interopRequireDefault(require("react"));

require("@testing-library/jest-dom/extend-expect");

var _react2 = require("@testing-library/react");

var _viewblogs = _interopRequireDefault(require("./../viewblogs"));

var _fetchdata = require("./../../Fetchdata/fetchdata");

var _authstore = _interopRequireDefault(require("./../../../reducer/authstore"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _testing = require("@apollo/client/testing");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mocks = [{
  request: {
    query: _viewblogs["default"]
  },
  result: {
    data: {
      dog: {
        id: '1',
        name: 'Buck',
        breed: 'bulldog'
      }
    }
  }
}];