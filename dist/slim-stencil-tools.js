(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["slimStencilTools"] = factory();
	else
		root["slimStencilTools"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Product = exports.Cart = exports.Page = exports.Base = undefined;
	
	var _Base = __webpack_require__(1);
	
	var Base = _interopRequireWildcard(_Base);
	
	var _Page = __webpack_require__(3);
	
	var Page = _interopRequireWildcard(_Page);
	
	var _Cart = __webpack_require__(4);
	
	var Cart = _interopRequireWildcard(_Cart);
	
	var _Product = __webpack_require__(5);
	
	var Product = _interopRequireWildcard(_Product);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var slimStencilTools = {
	  Base: Base,
	  Page: Page,
	  Cart: Cart,
	  Product: Product
	};
	
	exports.Base = Base;
	exports.Page = Page;
	exports.Cart = Cart;
	exports.Product = Product;
	exports.default = slimStencilTools;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.bcClient = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _fetchStatus = __webpack_require__(2);
	
	var _fetchStatus2 = _interopRequireDefault(_fetchStatus);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultOpts = {
	  url: '',
	  method: 'GET',
	  actionName: '',
	  component: null,
	  remote: false,
	  reqUrl: false,
	  formData: null,
	  params: {},
	  config: {},
	  headers: {}
	};
	
	var buildParams = function buildParams(obj) {
	  var str = Object.keys(obj).map(function (key) {
	    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
	  }).join('&');
	
	  return str;
	};
	
	// eslint-disable-next-line import/prefer-default-export
	var bcClient = exports.bcClient = function bcClient() {
	  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOpts;
	
	  var options = Object.assign({}, defaultOpts, opts);
	  var data = options.formData ? options.formData : buildParams(options.params);
	  var url = options.remote ? '/remote/v1' + options.url : options.url;
	  var reqUrl = options.reqUrl ? url + '?' + data : url;
	
	  return new Promise(function (resolve, reject) {
	    fetch(reqUrl, {
	      method: options.method,
	      headers: _extends({}, options.headers, {
	        'stencil-config': options.config ? JSON.stringify(options.config) : '{}',
	        'stencil-options': options.component ? JSON.stringify({
	          render_with: 'data/' + options.component.toLowerCase() + '-data'
	        }) : '{}'
	      }),
	      body: options.method === 'GET' ? null : data,
	      credentials: 'include'
	    }).then(_fetchStatus2.default).then(function (response) {
	      return response.json();
	    }).then(function (res) {
	      return resolve(options.remote ? res.data : JSON.parse(res));
	    }).catch(function (error) {
	      return reject(new Error(error));
	    });
	  });
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = fetchStatus;
	function fetchStatus(response) {
	  if (!response.ok) {
	    throw Error(response.statusText);
	  }
	
	  return response;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getPage = undefined;
	
	var _fetchStatus = __webpack_require__(2);
	
	var _fetchStatus2 = _interopRequireDefault(_fetchStatus);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// eslint-disable-next-line import/prefer-default-export
	var getPage = exports.getPage = function getPage(url, template) {
	  return new Promise(function (resolve, reject) {
	    fetch(url, {
	      headers: {
	        'stencil-config': '{}',
	        'stencil-options': JSON.stringify({ render_with: template })
	      },
	      credentials: 'include'
	    }).then(_fetchStatus2.default).then(function (response) {
	      return response.json();
	    }).then(function (res) {
	      return resolve(JSON.parse(res));
	    }).catch(function (error) {
	      return reject(new Error(error));
	    });
	  });
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.submitCouponCode = exports.submitShippingEstimate = exports.getShippingEstimate = exports.updateCartQty = exports.removeFromCart = exports.addToCart = exports.getCartContent = undefined;
	
	var _Base = __webpack_require__(1);
	
	var getCartContent = exports.getCartContent = function getCartContent() {
	  return new Promise(function (resolve, reject) {
	    (0, _Base.bcClient)({
	      url: '/cart.php',
	      component: 'cart'
	    }).then(function (response) {
	      return resolve(response);
	    }).catch(function (error) {
	      return reject(new Error(error));
	    });
	  });
	};
	
	var addToCart = exports.addToCart = function addToCart(formData) {
	  return new Promise(function (resolve, reject) {
	    (0, _Base.bcClient)({
	      url: '/cart/add',
	      method: 'POST',
	      remote: true,
	      formData: formData
	    }).then(function (response) {
	      return resolve(response);
	    }).catch(function (error) {
	      return reject(new Error(error));
	    });
	  });
	};
	
	var removeFromCart = exports.removeFromCart = function removeFromCart(itemId) {
	  var removeFromCartData = new FormData();
	  removeFromCartData.append('items[0][id]', itemId);
	  removeFromCartData.append('items[0][quantity]', 0);
	
	  return new Promise(function (resolve, reject) {
	    (0, _Base.bcClient)({
	      url: '/cart/update',
	      method: 'POST',
	      remote: true,
	      formData: removeFromCartData
	    }).then(function (response) {
	      if (response.status === 'succeed') {
	        resolve(response);
	      } else {
	        reject(response);
	      }
	    }).catch(function (error) {
	      return reject(new Error(error));
	    });
	  });
	};
	
	var updateCartQty = exports.updateCartQty = function updateCartQty(opts) {
	  var updateQtyCartData = new FormData();
	  updateQtyCartData.append('items[0][id]', opts.itemId);
	  updateQtyCartData.append('items[0][quantity]', opts.qty);
	
	  return new Promise(function (resolve, reject) {
	    (0, _Base.bcClient)({
	      url: '/cart/update',
	      method: 'POST',
	      remote: true,
	      formData: updateQtyCartData
	    }).then(function (response) {
	      if (response.status === 'succeed') {
	        resolve(response);
	      } else {
	        reject(response);
	      }
	    }).catch(function (error) {
	      return reject(new Error(error));
	    });
	  });
	};
	
	var getShippingEstimate = exports.getShippingEstimate = function getShippingEstimate(opts) {
	  return new Promise(function (resolve, reject) {
	    (0, _Base.bcClient)({
	      url: '/shipping-quote',
	      method: 'GET',
	      remote: true,
	      reqUrl: true,
	      params: opts
	    }).then(function (response) {
	      if (response.status !== 'failed') {
	        resolve(response);
	      } else {
	        reject(response);
	      }
	    }).catch(function (error) {
	      return reject(new Error(error));
	    });
	  });
	};
	
	var submitShippingEstimate = exports.submitShippingEstimate = function submitShippingEstimate(params) {
	  return new Promise(function (resolve, reject) {
	    (0, _Base.bcClient)({
	      url: '/shipping-quote',
	      method: 'POST',
	      remote: true,
	      headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	      },
	      params: params
	    }).then(function (response) {
	      if (response.status !== 'failed') {
	        resolve(response);
	      } else {
	        reject(response);
	      }
	    }).catch(function (error) {
	      return reject(new Error(error));
	    });
	  });
	};
	
	var submitCouponCode = exports.submitCouponCode = function submitCouponCode(code) {
	  return new Promise(function (resolve, reject) {
	    (0, _Base.bcClient)({
	      url: '/apply-code',
	      method: 'POST',
	      remote: true,
	      headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	      },
	      params: { code: code }
	    }).then(function (response) {
	      if (response.status !== 'failed') {
	        resolve(response);
	      } else {
	        reject(response);
	      }
	    }).catch(function (error) {
	      return reject(new Error(error));
	    });
	  });
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getProduct = undefined;
	
	var _Base = __webpack_require__(1);
	
	// eslint-disable-next-line import/prefer-default-export
	var getProduct = exports.getProduct = function getProduct(productId) {
	  return (0, _Base.bcClient)({
	    url: '/products.php?productId=' + productId,
	    component: 'product'
	  });
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=slim-stencil-tools.js.map