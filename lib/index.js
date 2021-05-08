"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormRenderer;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// item (nullable object)
var itemRender = function itemRender(item, key) {
  var span = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 24;

  if (typeof item.getJSON === 'function') {
    item = item.getJSON();
  }

  if ((0, _typeof2["default"])(item) !== 'object' || !item) return null; // elProps 组件的其他属性
  // itemProps Form.Item的其他属性

  var _item = item,
      type = _item.type,
      name = _item.name,
      rules = _item.rules,
      label = _item.label,
      _item$elProps = _item.elProps,
      elProps = _item$elProps === void 0 ? {} : _item$elProps,
      _item$itemProps = _item.itemProps,
      itemProps = _item$itemProps === void 0 ? {} : _item$itemProps,
      render = _item.render,
      props = (0, _objectWithoutProperties2["default"])(_item, ["type", "name", "rules", "label", "elProps", "itemProps", "render"]);
  return /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: span,
    key: key
  }, render ? render() : /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, (0, _extends2["default"])({
    name: name,
    label: label,
    rules: rules
  }, itemProps), /*#__PURE__*/_react["default"].createElement(type, _objectSpread(_objectSpread({}, props), elProps))));
};

var isType = function isType(type) {
  return function (n) {
    return Object.prototype.toString.call(n) === "[object ".concat(type, "]");
  };
};

var isNumber = isType('Number');

var renderTowDimensionLayout = function renderTowDimensionLayout(layoutData) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "renderer"
  }, layoutData.map(function (arr, idx) {
    var len = arr.length;

    if (24 % len !== 0) {
      throw new Error('数组的长度必须能被24整除');
    }

    var span = 24 / len;
    return /*#__PURE__*/_react["default"].createElement(_antd.Row, {
      key: idx,
      gutter: {
        xs: 8,
        sm: 16,
        md: 24
      }
    }, arr.map(function (item, subIndex) {
      return itemRender(item, subIndex, span);
    }));
  }));
}; // 默认二维数组
// 如果是一维数组，则从上往下一行放一个 item , 除非设置了cols=2/3/4 ,自动1行cols列布局
// 如果是二维数组，则每个子数组元素的数量，则为一行显示的item数量 ,数量应该可以被24整除


function FormRenderer(_ref) {
  var layoutData = _ref.layoutData,
      _ref$cols = _ref.cols,
      cols = _ref$cols === void 0 ? 1 : _ref$cols;
  var isOneDimensionArray = false;
  var firstItem = layoutData[0];

  if (!Array.isArray(firstItem)) {
    isOneDimensionArray = true;
  }

  var useAutoLayout = isOneDimensionArray && isNumber(cols) && cols > 1 && cols <= 4;

  if (useAutoLayout) {
    var arr = layoutData;
    var _tLayout = [];

    do {
      if (arr.length >= cols) {
        _tLayout.push(arr.slice(0, cols));

        arr.splice(0, cols);
      } else {
        var left = cols - arr.length;

        while (left--) {
          arr.push({
            render: function render() {
              return /*#__PURE__*/_react["default"].createElement("div", null); // placeholder
            }
          });
        }

        _tLayout.push(arr.slice(0, cols));

        arr.length = 0;
      }
    } while (arr.length);

    return renderTowDimensionLayout(_tLayout);
  }

  return !isOneDimensionArray ? renderTowDimensionLayout(layoutData) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "renderer"
  }, layoutData.map(function (item, idx) {
    return itemRender(item, idx, 24);
  }));
}
