import React from 'react';
import { Col, Form, Space, Row } from 'antd';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var ItemFlexRender = function ItemFlexRender(item, key) {
  var span = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 24;

  if (typeof item.getJSON === 'function') {
    item = item.getJSON();
  }

  if (_typeof(item) !== 'object' || !item) return null; // elProps 组件的其他属性
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
      props = _objectWithoutProperties(_item, ["type", "name", "rules", "label", "elProps", "itemProps", "render"]);

  return /*#__PURE__*/React.createElement(Col, {
    span: span,
    key: key
  }, render ? render() : /*#__PURE__*/React.createElement(Form.Item, _extends({
    name: name,
    label: label,
    rules: rules
  }, itemProps), /*#__PURE__*/React.createElement(type, _objectSpread2(_objectSpread2({}, props), elProps))));
};
var ItemSpaceRender = function ItemSpaceRender(item, key) {
  if (typeof item.getJSON === 'function') {
    item = item.getJSON();
  }

  if (_typeof(item) !== 'object' || !item) return null; // elProps 组件的其他属性
  // itemProps Form.Item的其他属性

  var _item2 = item,
      type = _item2.type,
      name = _item2.name,
      rules = _item2.rules,
      label = _item2.label,
      _item2$elProps = _item2.elProps,
      elProps = _item2$elProps === void 0 ? {} : _item2$elProps,
      _item2$itemProps = _item2.itemProps,
      itemProps = _item2$itemProps === void 0 ? {} : _item2$itemProps,
      render = _item2.render,
      props = _objectWithoutProperties(_item2, ["type", "name", "rules", "label", "elProps", "itemProps", "render"]);

  return /*#__PURE__*/React.createElement(React.Fragment, {
    key: key
  }, render ? render() : /*#__PURE__*/React.createElement(Form.Item, _extends({
    name: name,
    label: label,
    rules: rules
  }, itemProps), /*#__PURE__*/React.createElement(type, _objectSpread2(_objectSpread2({}, props), elProps))));
};

function SpaceLayout(_ref) {
  var layoutData = _ref.layoutData,
      _ref$space = _ref.space,
      space = _ref$space === void 0 ? 8 : _ref$space;
  return /*#__PURE__*/React.createElement("div", {
    className: "afr-space"
  }, /*#__PURE__*/React.createElement(Space, {
    size: space,
    direction: "horizontal",
    wrap: true
  }, layoutData.map(function (item, idx) {
    return ItemSpaceRender(item, idx);
  })));
}

var isType = function isType(type) {
  return function (n) {
    return Object.prototype.toString.call(n) === "[object ".concat(type, "]");
  };
};

var isNumber = isType('Number');

var renderTowDimensionLayout = function renderTowDimensionLayout(layoutData) {
  return /*#__PURE__*/React.createElement("div", {
    className: "afr-flex"
  }, layoutData.map(function (arr, idx) {
    var len = arr.length;

    if (24 % len !== 0) {
      throw new Error('数组的长度必须能被24整除');
    }

    var span = 24 / len;
    return /*#__PURE__*/React.createElement(Row, {
      key: idx,
      gutter: {
        xs: 8,
        sm: 16,
        md: 24
      }
    }, arr.map(function (item, subIndex) {
      return ItemFlexRender(item, subIndex, span);
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
              return null; // placeholder
            }
          });
        }

        _tLayout.push(arr.slice(0, cols));

        arr.length = 0;
      }
    } while (arr.length);

    return renderTowDimensionLayout(_tLayout);
  }

  return !isOneDimensionArray ? renderTowDimensionLayout(layoutData) : /*#__PURE__*/React.createElement("div", {
    className: "afr-flex"
  }, /*#__PURE__*/React.createElement(Row, null, layoutData.map(function (item, idx) {
    return ItemFlexRender(item, idx, 24);
  })));
}

export default FormRenderer;
export { SpaceLayout as FormSpaceRender };
