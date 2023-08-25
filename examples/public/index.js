(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ContainerExample"] = factory();
	else
		root["ContainerExample"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@noowow-community/service-container-js/dist/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@noowow-community/service-container-js/dist/index.js ***!
  \***************************************************************************/
/***/ (function(module) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Container.mjs":
/*!***************************!*\
  !*** ./src/Container.mjs ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __nested_webpack_exports__, __nested_webpack_require_667__) => {

__nested_webpack_require_667__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_667__.d(__nested_webpack_exports__, {
/* harmony export */   Container: () => (/* binding */ Container)
/* harmony export */ });
/* harmony import */ var _Provider_mjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_667__(/*! ./Provider.mjs */ "./src/Provider.mjs");
/* harmony import */ var _models_Factory_mjs__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_667__(/*! ./models/Factory.mjs */ "./src/models/Factory.mjs");
/* harmony import */ var _models_Instance_mjs__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_667__(/*! ./models/Instance.mjs */ "./src/models/Instance.mjs");
/* harmony import */ var _models_Singleton_mjs__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_667__(/*! ./models/Singleton.mjs */ "./src/models/Singleton.mjs");
/* harmony import */ var _exceptions_ContainerException_mjs__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_667__(/*! ./exceptions/ContainerException.mjs */ "./src/exceptions/ContainerException.mjs");
/* harmony import */ var _decorators_Service_mjs__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_667__(/*! ./decorators/Service.mjs */ "./src/decorators/Service.mjs");






class Container {
  constructor() {
    this._bindings = new Map();
    this._providers = new Set();
  }

  /**
   * Retrieve the value of the bindings property.
   *
   * @return {Binding}
   */
  get bindings() {
    return this._bindings;
  }

  /**
   * Bind a single instance or value into the container under the provided key.
   *
   * @param  {any} key
   * @param  {any} value
   * @return {this}
   */
  instance(key, value) {
    this._bindings.set(key, new _models_Instance_mjs__WEBPACK_IMPORTED_MODULE_2__["default"](value));
    return this;
  }

  /**
   * Bind a resolver function into the container under the provided key. The
   * resolver will be run once and the resulting value will be returned for all
   * subsequent resolutions.
   *
   * @param  {any}      key
   * @param  {Resolver} resolver
   * @return {this}
   */
  singleton(key, resolver) {
    this._bindings.set(key, new _models_Singleton_mjs__WEBPACK_IMPORTED_MODULE_3__["default"](resolver));
    return this;
  }

  /**
   * Bind a resolver function into the container under the provided key. The
   * resolver will be run each time the key is resolved resulting in new
   * instances each resolution.
   *
   * @param  {any}      key
   * @param  {Resolver} resolver
   * @return {this}
   */
  binding(key, resolver) {
    this._bindings.set(key, new _models_Factory_mjs__WEBPACK_IMPORTED_MODULE_1__["default"](resolver));
    return this;
  }

  /**
   * Resolve a value from the container by its key.
   *
   * @param  {any} key
   * @return {any}
   */
  make(key) {
    if (this._bindings.has(key)) {
      return this._bindings.get(key).resolve(this);
    }
    throw new _exceptions_ContainerException_mjs__WEBPACK_IMPORTED_MODULE_4__["default"](_exceptions_ContainerException_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].RESOLUTION_TYPE, key);
  }

  /**
   * Add a service provider into the container to register one or many bindings
   * as a unit.
   *
   * @param  {Provider} provider
   * @return {this}
   */
  provider(ProviderClass) {
    if (!(ProviderClass.prototype instanceof _Provider_mjs__WEBPACK_IMPORTED_MODULE_0__.Provider)) throw new _exceptions_ContainerException_mjs__WEBPACK_IMPORTED_MODULE_4__["default"](_exceptions_ContainerException_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].PROVIDER_TYPE, ProviderClass);
    const provider = new ProviderClass(this);
    provider.register();
    !this._providers.has(provider) && this._providers.add(provider);
    return this;
  }

  /**
   * Reset the container so that all fake bindings are removed and all original
   * bindings will be used when requested. If a hard request is run, then both
   * the fakes and the bindings will be cleared.
   *
   * @param  {boolean} hard
   * @return {this}
   */
  clear() {
    this._bindings.clear();
    this._providers.clear();
    return this;
  }

  /**
   * Auto Discover services
   *
   * @return {this}
   */
  discovering(services = []) {
    (services ?? []).forEach(item => {
      if (!item.metadata) throw new _exceptions_ContainerException_mjs__WEBPACK_IMPORTED_MODULE_4__["default"](_exceptions_ContainerException_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].NOT_A_SERVICE_TYPE, item);
      this._autoBinding(item, item);
    });
    return this;
  }
  _autoBinding(name, value) {
    if (!this._bindings.has(name)) {
      if (value.metadata && value.metadata.type === _decorators_Service_mjs__WEBPACK_IMPORTED_MODULE_5__.SERVICE_TYPE) {
        const dependencies = value.metadata.dependencies ?? [];
        for (const item of dependencies) {
          this._autoBinding(item.value.metadata ? item.value : item.name, item.value);
        }
        const deps = Object.fromEntries(dependencies.map(item => [item.name, this.make(item.value.metadata ? item.value : item.name)]));
        const Klass = value;
        const resolver = () => new Klass(deps);
        value.metadata.singleton ? this.singleton(name, resolver) : this.binding(name, resolver);
      } else {
        this.instance(name, value);
      }
    }
  }
}

/***/ }),

/***/ "./src/Provider.mjs":
/*!**************************!*\
  !*** ./src/Provider.mjs ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __nested_webpack_exports__, __nested_webpack_require_6112__) => {

__nested_webpack_require_6112__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_6112__.d(__nested_webpack_exports__, {
/* harmony export */   Provider: () => (/* binding */ Provider)
/* harmony export */ });
class Provider {
  /**
   * Create a new instance of Provider.
   *
   * @param  {Container} container
   */
  constructor(container) {
    this._container = container;
  }
  get container() {
    return this._container;
  }

  /**
   * Register any application services.
   */
  register() {}

  /**
   * Bootstrap any application services.
   */
  boot() {}
}

/***/ }),

/***/ "./src/decorators/Service.mjs":
/*!************************************!*\
  !*** ./src/decorators/Service.mjs ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __nested_webpack_exports__, __nested_webpack_require_6941__) => {

__nested_webpack_require_6941__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_6941__.d(__nested_webpack_exports__, {
/* harmony export */   SERVICE_TYPE: () => (/* binding */ SERVICE_TYPE),
/* harmony export */   Service: () => (/* binding */ Service)
/* harmony export */ });
/* harmony import */ var _exceptions_ContainerException_mjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_6941__(/*! ../exceptions/ContainerException.mjs */ "./src/exceptions/ContainerException.mjs");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

const SERVICE_TYPE = 'service';
const Service = value => {
  if (!value) throw new _exceptions_ContainerException_mjs__WEBPACK_IMPORTED_MODULE_0__["default"](_exceptions_ContainerException_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].DECORATOR_VALUE_TYPE);
  return target => {
    target.metadata = _objectSpread(_objectSpread({}, value), {}, {
      type: SERVICE_TYPE
    });
  };
};

/***/ }),

/***/ "./src/decorators/ServiceProvider.mjs":
/*!********************************************!*\
  !*** ./src/decorators/ServiceProvider.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __nested_webpack_exports__, __nested_webpack_require_9685__) => {

__nested_webpack_require_9685__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_9685__.d(__nested_webpack_exports__, {
/* harmony export */   SERVICE_PROVIDER_TYPE: () => (/* binding */ SERVICE_PROVIDER_TYPE),
/* harmony export */   ServiceProvider: () => (/* binding */ ServiceProvider)
/* harmony export */ });
/* harmony import */ var _exceptions_ContainerException_mjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_9685__(/*! ../exceptions/ContainerException.mjs */ "./src/exceptions/ContainerException.mjs");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

const SERVICE_PROVIDER_TYPE = 'service_provider';
const ServiceProvider = value => {
  if (!value) throw new _exceptions_ContainerException_mjs__WEBPACK_IMPORTED_MODULE_0__["default"](_exceptions_ContainerException_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].DECORATOR_VALUE_TYPE);
  return target => {
    target.metadata = _objectSpread(_objectSpread({}, value), {}, {
      type: SERVICE_PROVIDER_TYPE
    });
  };
};

/***/ }),

/***/ "./src/exceptions/ContainerException.mjs":
/*!***********************************************!*\
  !*** ./src/exceptions/ContainerException.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __nested_webpack_exports__, __nested_webpack_require_12510__) => {

__nested_webpack_require_12510__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_12510__.d(__nested_webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContainerException)
/* harmony export */ });
class ContainerException extends Error {
  static get CONFIG_TYPE() {
    return 'config';
  }
  static get PROVIDER_TYPE() {
    return 'provider';
  }
  static get RESOLUTION_TYPE() {
    return 'resolution';
  }
  static get NOT_A_SERVICE_TYPE() {
    return 'not_a_service';
  }
  static get DECORATOR_VALUE_TYPE() {
    return 'decorator_value';
  }
  static get SERVICE_NOT_FOUND_TYPE() {
    return 'service_not_found';
  }
  constructor(type, message) {
    super();
    this.type = type;
    this.name = 'noowow.service_container';
    this.message = this.getMessage(type, message);
  }
  getMessage(type, message) {
    const messages = {
      [ContainerException.CONFIG_TYPE]: 'No configurations provided.',
      [ContainerException.RESOLUTION_TYPE]: this.getResolutionMessage(message),
      [ContainerException.SERVICE_NOT_FOUND_TYPE]: `Service(${message}) not found.`,
      [ContainerException.DECORATOR_VALUE_TYPE]: 'No configurations provided for this decorator.',
      [ContainerException.PROVIDER_TYPE]: `This class(${message}) is not a provider. Class must extends Provider class.`,
      [ContainerException.NOT_A_SERVICE_TYPE]: `This (${message}) is not service. Must contains metadata static property or must use @Service decorator`
    };
    return messages[type] ?? 'An error has occured.';
  }
  getResolutionMessage(key) {
    let value = '';
    switch (true) {
      case key === undefined:
        value = 'undefined';
        break;
      case key === null:
        value = 'null';
        break;
      case typeof key === 'function':
        {
          const funcName = key.name ? `: ${key.name}` : '';
          value = `[Function${funcName}]`;
          break;
        }
      case typeof key === 'object':
        {
          value = `[Object: ${key.constructor.name}]`;
          break;
        }
      case typeof key === 'string':
        value = `type ${typeof key} with a value of '${key}'`;
        break;
      case typeof key === 'symbol':
        value = key.toString();
        break;
      default:
        value = `type ${typeof key} with a value of ${key}`;
        break;
    }
    return `Failed to resolve a binding with a key of ${value} from the service container.`;
  }
}

/***/ }),

/***/ "./src/models/Binding.mjs":
/*!********************************!*\
  !*** ./src/models/Binding.mjs ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __nested_webpack_exports__, __nested_webpack_require_15203__) => {

__nested_webpack_require_15203__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_15203__.d(__nested_webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Binding)
/* harmony export */ });
class Binding {
  /**
   * Create a new instance of Binding.
   *
   * @param {any = null}  value
   */
  constructor(value = null) {
    this.value = value;
  }

  /**
   * Resolve and return the value of the binding.
   *
   * @return {any}
   */
  resolve() {
    return this.value;
  }
}

/***/ }),

/***/ "./src/models/Factory.mjs":
/*!********************************!*\
  !*** ./src/models/Factory.mjs ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __nested_webpack_exports__, __nested_webpack_require_15946__) => {

__nested_webpack_require_15946__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_15946__.d(__nested_webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Factory)
/* harmony export */ });
/* harmony import */ var _ResolverBinding_mjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_15946__(/*! ./ResolverBinding.mjs */ "./src/models/ResolverBinding.mjs");

class Factory extends _ResolverBinding_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Resolve and return the value of the binding.
   *
   * @param  {Container} container
   * @return {any}
   */
  resolve(container) {
    this.hasResolved = true;
    return this.resolver(container);
  }
}

/***/ }),

/***/ "./src/models/Instance.mjs":
/*!*********************************!*\
  !*** ./src/models/Instance.mjs ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __nested_webpack_exports__, __nested_webpack_require_16866__) => {

__nested_webpack_require_16866__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_16866__.d(__nested_webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Instance)
/* harmony export */ });
/* harmony import */ var _Binding_mjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_16866__(/*! ./Binding.mjs */ "./src/models/Binding.mjs");

class Instance extends _Binding_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {}

/***/ }),

/***/ "./src/models/ResolverBinding.mjs":
/*!****************************************!*\
  !*** ./src/models/ResolverBinding.mjs ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __nested_webpack_exports__, __nested_webpack_require_17569__) => {

__nested_webpack_require_17569__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_17569__.d(__nested_webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResolverBinding)
/* harmony export */ });
/* harmony import */ var _Binding_mjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_17569__(/*! ./Binding.mjs */ "./src/models/Binding.mjs");

class ResolverBinding extends _Binding_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Create a new instance of ResolverBinding.
   *
   * @param {Function} resolver
   */
  constructor(resolver) {
    super();
    this.hasResolved = false;
    this._resolver = resolver;
  }

  /**
   * Retrieve the value of the resolver property.
   *
   * @return {Function}
   */
  get resolver() {
    return this._resolver;
  }
}

/***/ }),

/***/ "./src/models/Singleton.mjs":
/*!**********************************!*\
  !*** ./src/models/Singleton.mjs ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __nested_webpack_exports__, __nested_webpack_require_18605__) => {

__nested_webpack_require_18605__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_18605__.d(__nested_webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Singleton)
/* harmony export */ });
/* harmony import */ var _ResolverBinding_mjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_18605__(/*! ./ResolverBinding.mjs */ "./src/models/ResolverBinding.mjs");

class Singleton extends _ResolverBinding_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Resolve and return the value of the binding.
   *
   * @param  {Container} container
   * @return {any}
   */
  resolve(container) {
    if (this.hasResolved === false) {
      this.hasResolved = true;
      this.value = this.resolver(container);
    }
    return this.value;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_19607__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_19607__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_19607__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_19607__.o(definition, key) && !__nested_webpack_require_19607__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nested_webpack_require_19607__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_19607__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/index.mjs ***!
  \***********************/
__nested_webpack_require_19607__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_19607__.d(__nested_webpack_exports__, {
/* harmony export */   Container: () => (/* reexport safe */ _Container_mjs__WEBPACK_IMPORTED_MODULE_1__.Container),
/* harmony export */   Provider: () => (/* reexport safe */ _Provider_mjs__WEBPACK_IMPORTED_MODULE_0__.Provider),
/* harmony export */   Service: () => (/* reexport safe */ _decorators_Service_mjs__WEBPACK_IMPORTED_MODULE_2__.Service),
/* harmony export */   ServiceProvider: () => (/* reexport safe */ _decorators_ServiceProvider_mjs__WEBPACK_IMPORTED_MODULE_3__.ServiceProvider)
/* harmony export */ });
/* harmony import */ var _Provider_mjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_19607__(/*! ./Provider.mjs */ "./src/Provider.mjs");
/* harmony import */ var _Container_mjs__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_19607__(/*! ./Container.mjs */ "./src/Container.mjs");
/* harmony import */ var _decorators_Service_mjs__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_19607__(/*! ./decorators/Service.mjs */ "./src/decorators/Service.mjs");
/* harmony import */ var _decorators_ServiceProvider_mjs__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_19607__(/*! ./decorators/ServiceProvider.mjs */ "./src/decorators/ServiceProvider.mjs");




})();

/******/ 	return __nested_webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEtBQUs7SUFDeEIsSUFBSSxDQUFDQyxTQUFTLEdBQUduRCxRQUFRO0VBQzNCOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFDRSxJQUFJQSxRQUFRQSxDQUFBLEVBQUk7SUFDZCxPQUFPLElBQUksQ0FBQ21ELFNBQVM7RUFDdkI7QUFDRjs7Ozs7Ozs7Ozs7Ozs7O0FDdEJtRDtBQUVwQyxNQUFNbEUsU0FBUyxTQUFTZ0UsNERBQWUsQ0FBQztFQUNyRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDRTVDLE9BQU9BLENBQUV3QixTQUFTLEVBQUU7SUFDbEIsSUFBSSxJQUFJLENBQUNxQixXQUFXLEtBQUssS0FBSyxFQUFFO01BQzlCLElBQUksQ0FBQ0EsV0FBVyxHQUFHLElBQUk7TUFDdkIsSUFBSSxDQUFDckQsS0FBSyxHQUFHLElBQUksQ0FBQ0csUUFBUSxDQUFDNkIsU0FBUyxDQUFDO0lBQ3ZDO0lBRUEsT0FBTyxJQUFJLENBQUNoQyxLQUFLO0VBQ25CO0FBQ0Y7Ozs7OztVQ2pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnlDO0FBQ0U7QUFDTyIsInNvdXJjZXMiOlsid2VicGFjazovL05vb0NvbnRhaW5lci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vTm9vQ29udGFpbmVyLy4vc3JjL0NvbnRhaW5lci5tanMiLCJ3ZWJwYWNrOi8vTm9vQ29udGFpbmVyLy4vc3JjL1Byb3ZpZGVyLm1qcyIsIndlYnBhY2s6Ly9Ob29Db250YWluZXIvLi9zcmMvZGVjb3JhdG9ycy9TZXJ2aWNlLm1qcyIsIndlYnBhY2s6Ly9Ob29Db250YWluZXIvLi9zcmMvZGVjb3JhdG9ycy9TZXJ2aWNlUHJvdmlkZXIubWpzIiwid2VicGFjazovL05vb0NvbnRhaW5lci8uL3NyYy9leGNlcHRpb25zL0NvbnRhaW5lckV4Y2VwdGlvbi5tanMiLCJ3ZWJwYWNrOi8vTm9vQ29udGFpbmVyLy4vc3JjL21vZGVscy9CaW5kaW5nLm1qcyIsIndlYnBhY2s6Ly9Ob29Db250YWluZXIvLi9zcmMvbW9kZWxzL0ZhY3RvcnkubWpzIiwid2VicGFjazovL05vb0NvbnRhaW5lci8uL3NyYy9tb2RlbHMvSW5zdGFuY2UubWpzIiwid2VicGFjazovL05vb0NvbnRhaW5lci8uL3NyYy9tb2RlbHMvUmVzb2x2ZXJCaW5kaW5nLm1qcyIsIndlYnBhY2s6Ly9Ob29Db250YWluZXIvLi9zcmMvbW9kZWxzL1NpbmdsZXRvbi5tanMiLCJ3ZWJwYWNrOi8vTm9vQ29udGFpbmVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL05vb0NvbnRhaW5lci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTm9vQ29udGFpbmVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTm9vQ29udGFpbmVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTm9vQ29udGFpbmVyLy4vc3JjL2luZGV4Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJOb29Db250YWluZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTm9vQ29udGFpbmVyXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgKCkgPT4ge1xucmV0dXJuICIsImltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAnLi9Qcm92aWRlci5tanMnXG5pbXBvcnQgRmFjdG9yeSBmcm9tICcuL21vZGVscy9GYWN0b3J5Lm1qcydcbmltcG9ydCBJbnN0YW5jZSBmcm9tICcuL21vZGVscy9JbnN0YW5jZS5tanMnXG5pbXBvcnQgU2luZ2xldG9uIGZyb20gJy4vbW9kZWxzL1NpbmdsZXRvbi5tanMnXG5pbXBvcnQgQ29udGFpbmVyRXhjZXB0aW9uIGZyb20gJy4vZXhjZXB0aW9ucy9Db250YWluZXJFeGNlcHRpb24ubWpzJ1xuaW1wb3J0IHsgU0VSVklDRV9UWVBFIH0gZnJvbSAnLi9kZWNvcmF0b3JzL1NlcnZpY2UubWpzJ1xuXG5leHBvcnQgY2xhc3MgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuX2JpbmRpbmdzID0gbmV3IE1hcCgpXG4gICAgdGhpcy5fcHJvdmlkZXJzID0gbmV3IFNldCgpXG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIHZhbHVlIG9mIHRoZSBiaW5kaW5ncyBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHJldHVybiB7QmluZGluZ31cbiAgICovXG4gIGdldCBiaW5kaW5ncyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdzXG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHNpbmdsZSBpbnN0YW5jZSBvciB2YWx1ZSBpbnRvIHRoZSBjb250YWluZXIgdW5kZXIgdGhlIHByb3ZpZGVkIGtleS5cbiAgICpcbiAgICogQHBhcmFtICB7YW55fSBrZXlcbiAgICogQHBhcmFtICB7YW55fSB2YWx1ZVxuICAgKiBAcmV0dXJuIHt0aGlzfVxuICAgKi9cbiAgaW5zdGFuY2UgKGtleSwgdmFsdWUpIHtcbiAgICB0aGlzLl9iaW5kaW5ncy5zZXQoa2V5LCBuZXcgSW5zdGFuY2UodmFsdWUpKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHJlc29sdmVyIGZ1bmN0aW9uIGludG8gdGhlIGNvbnRhaW5lciB1bmRlciB0aGUgcHJvdmlkZWQga2V5LiBUaGVcbiAgICogcmVzb2x2ZXIgd2lsbCBiZSBydW4gb25jZSBhbmQgdGhlIHJlc3VsdGluZyB2YWx1ZSB3aWxsIGJlIHJldHVybmVkIGZvciBhbGxcbiAgICogc3Vic2VxdWVudCByZXNvbHV0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtICB7YW55fSAgICAgIGtleVxuICAgKiBAcGFyYW0gIHtSZXNvbHZlcn0gcmVzb2x2ZXJcbiAgICogQHJldHVybiB7dGhpc31cbiAgICovXG4gIHNpbmdsZXRvbiAoa2V5LCByZXNvbHZlcikge1xuICAgIHRoaXMuX2JpbmRpbmdzLnNldChrZXksIG5ldyBTaW5nbGV0b24ocmVzb2x2ZXIpKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHJlc29sdmVyIGZ1bmN0aW9uIGludG8gdGhlIGNvbnRhaW5lciB1bmRlciB0aGUgcHJvdmlkZWQga2V5LiBUaGVcbiAgICogcmVzb2x2ZXIgd2lsbCBiZSBydW4gZWFjaCB0aW1lIHRoZSBrZXkgaXMgcmVzb2x2ZWQgcmVzdWx0aW5nIGluIG5ld1xuICAgKiBpbnN0YW5jZXMgZWFjaCByZXNvbHV0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIHthbnl9ICAgICAga2V5XG4gICAqIEBwYXJhbSAge1Jlc29sdmVyfSByZXNvbHZlclxuICAgKiBAcmV0dXJuIHt0aGlzfVxuICAgKi9cbiAgYmluZGluZyAoa2V5LCByZXNvbHZlcikge1xuICAgIHRoaXMuX2JpbmRpbmdzLnNldChrZXksIG5ldyBGYWN0b3J5KHJlc29sdmVyKSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmUgYSB2YWx1ZSBmcm9tIHRoZSBjb250YWluZXIgYnkgaXRzIGtleS5cbiAgICpcbiAgICogQHBhcmFtICB7YW55fSBrZXlcbiAgICogQHJldHVybiB7YW55fVxuICAgKi9cbiAgbWFrZSAoa2V5KSB7XG4gICAgaWYgKHRoaXMuX2JpbmRpbmdzLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYmluZGluZ3MuZ2V0KGtleSkucmVzb2x2ZSh0aGlzKVxuICAgIH1cbiAgICB0aHJvdyBuZXcgQ29udGFpbmVyRXhjZXB0aW9uKENvbnRhaW5lckV4Y2VwdGlvbi5SRVNPTFVUSU9OX1RZUEUsIGtleSlcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBzZXJ2aWNlIHByb3ZpZGVyIGludG8gdGhlIGNvbnRhaW5lciB0byByZWdpc3RlciBvbmUgb3IgbWFueSBiaW5kaW5nc1xuICAgKiBhcyBhIHVuaXQuXG4gICAqXG4gICAqIEBwYXJhbSAge1Byb3ZpZGVyfSBwcm92aWRlclxuICAgKiBAcmV0dXJuIHt0aGlzfVxuICAgKi9cbiAgcHJvdmlkZXIgKFByb3ZpZGVyQ2xhc3MpIHtcbiAgICBpZiAoIShQcm92aWRlckNsYXNzLnByb3RvdHlwZSBpbnN0YW5jZW9mIFByb3ZpZGVyKSkgdGhyb3cgbmV3IENvbnRhaW5lckV4Y2VwdGlvbihDb250YWluZXJFeGNlcHRpb24uUFJPVklERVJfVFlQRSwgUHJvdmlkZXJDbGFzcylcbiAgICBjb25zdCBwcm92aWRlciA9IG5ldyBQcm92aWRlckNsYXNzKHRoaXMpXG4gICAgcHJvdmlkZXIucmVnaXN0ZXIoKVxuICAgICF0aGlzLl9wcm92aWRlcnMuaGFzKHByb3ZpZGVyKSAmJiB0aGlzLl9wcm92aWRlcnMuYWRkKHByb3ZpZGVyKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIGNvbnRhaW5lciBzbyB0aGF0IGFsbCBmYWtlIGJpbmRpbmdzIGFyZSByZW1vdmVkIGFuZCBhbGwgb3JpZ2luYWxcbiAgICogYmluZGluZ3Mgd2lsbCBiZSB1c2VkIHdoZW4gcmVxdWVzdGVkLiBJZiBhIGhhcmQgcmVxdWVzdCBpcyBydW4sIHRoZW4gYm90aFxuICAgKiB0aGUgZmFrZXMgYW5kIHRoZSBiaW5kaW5ncyB3aWxsIGJlIGNsZWFyZWQuXG4gICAqXG4gICAqIEBwYXJhbSAge2Jvb2xlYW59IGhhcmRcbiAgICogQHJldHVybiB7dGhpc31cbiAgICovXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLl9iaW5kaW5ncy5jbGVhcigpXG4gICAgdGhpcy5fcHJvdmlkZXJzLmNsZWFyKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEF1dG8gRGlzY292ZXIgc2VydmljZXNcbiAgICpcbiAgICogQHJldHVybiB7dGhpc31cbiAgICovXG4gIGRpc2NvdmVyaW5nIChzZXJ2aWNlcyA9IFtdKSB7XG4gICAgKHNlcnZpY2VzID8/IFtdKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKCFpdGVtLm1ldGFkYXRhKSB0aHJvdyBuZXcgQ29udGFpbmVyRXhjZXB0aW9uKENvbnRhaW5lckV4Y2VwdGlvbi5OT1RfQV9TRVJWSUNFX1RZUEUsIGl0ZW0pXG4gICAgICB0aGlzLl9hdXRvQmluZGluZyhpdGVtLCBpdGVtKVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIF9hdXRvQmluZGluZyAobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuX2JpbmRpbmdzLmhhcyhuYW1lKSkge1xuICAgICAgaWYgKHZhbHVlLm1ldGFkYXRhICYmIHZhbHVlLm1ldGFkYXRhLnR5cGUgPT09IFNFUlZJQ0VfVFlQRSkge1xuICAgICAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSB2YWx1ZS5tZXRhZGF0YS5kZXBlbmRlbmNpZXMgPz8gW11cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGRlcGVuZGVuY2llcykge1xuICAgICAgICAgIHRoaXMuX2F1dG9CaW5kaW5nKGl0ZW0udmFsdWUubWV0YWRhdGEgPyBpdGVtLnZhbHVlIDogaXRlbS5uYW1lLCBpdGVtLnZhbHVlKVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlcHMgPSBPYmplY3QuZnJvbUVudHJpZXMoZGVwZW5kZW5jaWVzLm1hcChpdGVtID0+IFtpdGVtLm5hbWUsIHRoaXMubWFrZShpdGVtLnZhbHVlLm1ldGFkYXRhID8gaXRlbS52YWx1ZSA6IGl0ZW0ubmFtZSldKSlcbiAgICAgICAgY29uc3QgS2xhc3MgPSB2YWx1ZVxuICAgICAgICBjb25zdCByZXNvbHZlciA9ICgpID0+IG5ldyBLbGFzcyhkZXBzKVxuICAgICAgICB2YWx1ZS5tZXRhZGF0YS5zaW5nbGV0b24gPyB0aGlzLnNpbmdsZXRvbihuYW1lLCByZXNvbHZlcikgOiB0aGlzLmJpbmRpbmcobmFtZSwgcmVzb2x2ZXIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmluc3RhbmNlKG5hbWUsIHZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFByb3ZpZGVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBQcm92aWRlci5cbiAgICpcbiAgICogQHBhcmFtICB7Q29udGFpbmVyfSBjb250YWluZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yIChjb250YWluZXIpIHtcbiAgICB0aGlzLl9jb250YWluZXIgPSBjb250YWluZXJcbiAgfVxuXG4gIGdldCBjb250YWluZXIgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250YWluZXJcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbnkgYXBwbGljYXRpb24gc2VydmljZXMuXG4gICAqL1xuICByZWdpc3RlciAoKSB7fVxuXG4gIC8qKlxuICAgKiBCb290c3RyYXAgYW55IGFwcGxpY2F0aW9uIHNlcnZpY2VzLlxuICAgKi9cbiAgYm9vdCAoKSB7fVxufVxuIiwiaW1wb3J0IENvbnRhaW5lckV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb25zL0NvbnRhaW5lckV4Y2VwdGlvbi5tanMnXG5cbmV4cG9ydCBjb25zdCBTRVJWSUNFX1RZUEUgPSAnc2VydmljZSdcblxuZXhwb3J0IGNvbnN0IFNlcnZpY2UgPSAodmFsdWUpID0+IHtcbiAgaWYgKCF2YWx1ZSkgdGhyb3cgbmV3IENvbnRhaW5lckV4Y2VwdGlvbihDb250YWluZXJFeGNlcHRpb24uREVDT1JBVE9SX1ZBTFVFX1RZUEUpXG4gIHJldHVybiAodGFyZ2V0KSA9PiB7XG4gICAgdGFyZ2V0Lm1ldGFkYXRhID0geyAuLi52YWx1ZSwgdHlwZTogU0VSVklDRV9UWVBFIH1cbiAgfVxufVxuIiwiaW1wb3J0IENvbnRhaW5lckV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb25zL0NvbnRhaW5lckV4Y2VwdGlvbi5tanMnXG5cbmV4cG9ydCBjb25zdCBTRVJWSUNFX1BST1ZJREVSX1RZUEUgPSAnc2VydmljZV9wcm92aWRlcidcblxuZXhwb3J0IGNvbnN0IFNlcnZpY2VQcm92aWRlciA9ICh2YWx1ZSkgPT4ge1xuICBpZiAoIXZhbHVlKSB0aHJvdyBuZXcgQ29udGFpbmVyRXhjZXB0aW9uKENvbnRhaW5lckV4Y2VwdGlvbi5ERUNPUkFUT1JfVkFMVUVfVFlQRSlcbiAgcmV0dXJuICh0YXJnZXQpID0+IHtcbiAgICB0YXJnZXQubWV0YWRhdGEgPSB7IC4uLnZhbHVlLCB0eXBlOiBTRVJWSUNFX1BST1ZJREVSX1RZUEUgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWluZXJFeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XG4gIHN0YXRpYyBnZXQgQ09ORklHX1RZUEUgKCkgeyByZXR1cm4gJ2NvbmZpZycgfVxuICBzdGF0aWMgZ2V0IFBST1ZJREVSX1RZUEUgKCkgeyByZXR1cm4gJ3Byb3ZpZGVyJyB9XG4gIHN0YXRpYyBnZXQgUkVTT0xVVElPTl9UWVBFICgpIHsgcmV0dXJuICdyZXNvbHV0aW9uJyB9XG4gIHN0YXRpYyBnZXQgTk9UX0FfU0VSVklDRV9UWVBFICgpIHsgcmV0dXJuICdub3RfYV9zZXJ2aWNlJyB9XG4gIHN0YXRpYyBnZXQgREVDT1JBVE9SX1ZBTFVFX1RZUEUgKCkgeyByZXR1cm4gJ2RlY29yYXRvcl92YWx1ZScgfVxuICBzdGF0aWMgZ2V0IFNFUlZJQ0VfTk9UX0ZPVU5EX1RZUEUgKCkgeyByZXR1cm4gJ3NlcnZpY2Vfbm90X2ZvdW5kJyB9XG5cbiAgY29uc3RydWN0b3IgKHR5cGUsIG1lc3NhZ2UpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy50eXBlID0gdHlwZVxuICAgIHRoaXMubmFtZSA9ICdub293b3cuc2VydmljZV9jb250YWluZXInXG4gICAgdGhpcy5tZXNzYWdlID0gdGhpcy5nZXRNZXNzYWdlKHR5cGUsIG1lc3NhZ2UpXG4gIH1cblxuICBnZXRNZXNzYWdlICh0eXBlLCBtZXNzYWdlKSB7XG4gICAgY29uc3QgbWVzc2FnZXMgPSB7XG4gICAgICBbQ29udGFpbmVyRXhjZXB0aW9uLkNPTkZJR19UWVBFXTogJ05vIGNvbmZpZ3VyYXRpb25zIHByb3ZpZGVkLicsXG4gICAgICBbQ29udGFpbmVyRXhjZXB0aW9uLlJFU09MVVRJT05fVFlQRV06IHRoaXMuZ2V0UmVzb2x1dGlvbk1lc3NhZ2UobWVzc2FnZSksXG4gICAgICBbQ29udGFpbmVyRXhjZXB0aW9uLlNFUlZJQ0VfTk9UX0ZPVU5EX1RZUEVdOiBgU2VydmljZSgke21lc3NhZ2V9KSBub3QgZm91bmQuYCxcbiAgICAgIFtDb250YWluZXJFeGNlcHRpb24uREVDT1JBVE9SX1ZBTFVFX1RZUEVdOiAnTm8gY29uZmlndXJhdGlvbnMgcHJvdmlkZWQgZm9yIHRoaXMgZGVjb3JhdG9yLicsXG4gICAgICBbQ29udGFpbmVyRXhjZXB0aW9uLlBST1ZJREVSX1RZUEVdOiBgVGhpcyBjbGFzcygke21lc3NhZ2V9KSBpcyBub3QgYSBwcm92aWRlci4gQ2xhc3MgbXVzdCBleHRlbmRzIFByb3ZpZGVyIGNsYXNzLmAsXG4gICAgICBbQ29udGFpbmVyRXhjZXB0aW9uLk5PVF9BX1NFUlZJQ0VfVFlQRV06IGBUaGlzICgke21lc3NhZ2V9KSBpcyBub3Qgc2VydmljZS4gTXVzdCBjb250YWlucyBtZXRhZGF0YSBzdGF0aWMgcHJvcGVydHkgb3IgbXVzdCB1c2UgQFNlcnZpY2UgZGVjb3JhdG9yYFxuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZXNbdHlwZV0gPz8gJ0FuIGVycm9yIGhhcyBvY2N1cmVkLidcbiAgfVxuXG4gIGdldFJlc29sdXRpb25NZXNzYWdlIChrZXkpIHtcbiAgICBsZXQgdmFsdWUgPSAnJ1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgY2FzZSBrZXkgPT09IHVuZGVmaW5lZDpcbiAgICAgIHZhbHVlID0gJ3VuZGVmaW5lZCdcbiAgICAgIGJyZWFrXG4gICAgY2FzZSBrZXkgPT09IG51bGw6XG4gICAgICB2YWx1ZSA9ICdudWxsJ1xuICAgICAgYnJlYWtcbiAgICBjYXNlIHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbic6IHtcbiAgICAgIGNvbnN0IGZ1bmNOYW1lID0ga2V5Lm5hbWUgPyBgOiAke2tleS5uYW1lfWAgOiAnJ1xuICAgICAgdmFsdWUgPSBgW0Z1bmN0aW9uJHtmdW5jTmFtZX1dYFxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgY2FzZSB0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jzoge1xuICAgICAgdmFsdWUgPSBgW09iamVjdDogJHtrZXkuY29uc3RydWN0b3IubmFtZX1dYFxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgY2FzZSB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJzpcbiAgICAgIHZhbHVlID0gYHR5cGUgJHt0eXBlb2Yga2V5fSB3aXRoIGEgdmFsdWUgb2YgJyR7a2V5fSdgXG4gICAgICBicmVha1xuICAgIGNhc2UgdHlwZW9mIGtleSA9PT0gJ3N5bWJvbCc6XG4gICAgICB2YWx1ZSA9IGtleS50b1N0cmluZygpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB2YWx1ZSA9IGB0eXBlICR7dHlwZW9mIGtleX0gd2l0aCBhIHZhbHVlIG9mICR7a2V5fWBcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgcmV0dXJuIGBGYWlsZWQgdG8gcmVzb2x2ZSBhIGJpbmRpbmcgd2l0aCBhIGtleSBvZiAke3ZhbHVlfSBmcm9tIHRoZSBzZXJ2aWNlIGNvbnRhaW5lci5gXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpbmRpbmcge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEJpbmRpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55ID0gbnVsbH0gIHZhbHVlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAodmFsdWUgPSBudWxsKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZSBhbmQgcmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGUgYmluZGluZy5cbiAgICpcbiAgICogQHJldHVybiB7YW55fVxuICAgKi9cbiAgcmVzb2x2ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVcbiAgfVxufVxuIiwiaW1wb3J0IFJlc29sdmVyQmluZGluZyBmcm9tICcuL1Jlc29sdmVyQmluZGluZy5tanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhY3RvcnkgZXh0ZW5kcyBSZXNvbHZlckJpbmRpbmcge1xuICAvKipcbiAgICogUmVzb2x2ZSBhbmQgcmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGUgYmluZGluZy5cbiAgICpcbiAgICogQHBhcmFtICB7Q29udGFpbmVyfSBjb250YWluZXJcbiAgICogQHJldHVybiB7YW55fVxuICAgKi9cbiAgcmVzb2x2ZSAoY29udGFpbmVyKSB7XG4gICAgdGhpcy5oYXNSZXNvbHZlZCA9IHRydWVcbiAgICByZXR1cm4gdGhpcy5yZXNvbHZlcihjb250YWluZXIpXG4gIH1cbn1cbiIsImltcG9ydCBCaW5kaW5nIGZyb20gJy4vQmluZGluZy5tanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc3RhbmNlIGV4dGVuZHMgQmluZGluZyB7fVxuIiwiaW1wb3J0IEJpbmRpbmcgZnJvbSAnLi9CaW5kaW5nLm1qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzb2x2ZXJCaW5kaW5nIGV4dGVuZHMgQmluZGluZyB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzb2x2ZXJCaW5kaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlclxuICAgKi9cbiAgY29uc3RydWN0b3IgKHJlc29sdmVyKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuaGFzUmVzb2x2ZWQgPSBmYWxzZVxuICAgIHRoaXMuX3Jlc29sdmVyID0gcmVzb2x2ZXJcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgdmFsdWUgb2YgdGhlIHJlc29sdmVyIHByb3BlcnR5LlxuICAgKlxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG4gIGdldCByZXNvbHZlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc29sdmVyXG4gIH1cbn1cbiIsImltcG9ydCBSZXNvbHZlckJpbmRpbmcgZnJvbSAnLi9SZXNvbHZlckJpbmRpbmcubWpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW5nbGV0b24gZXh0ZW5kcyBSZXNvbHZlckJpbmRpbmcge1xuICAvKipcbiAgICogUmVzb2x2ZSBhbmQgcmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGUgYmluZGluZy5cbiAgICpcbiAgICogQHBhcmFtICB7Q29udGFpbmVyfSBjb250YWluZXJcbiAgICogQHJldHVybiB7YW55fVxuICAgKi9cbiAgcmVzb2x2ZSAoY29udGFpbmVyKSB7XG4gICAgaWYgKHRoaXMuaGFzUmVzb2x2ZWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmhhc1Jlc29sdmVkID0gdHJ1ZVxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucmVzb2x2ZXIoY29udGFpbmVyKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnZhbHVlXG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHsgUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVyLm1qcydcbmV4cG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4vQ29udGFpbmVyLm1qcydcbmV4cG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuL2RlY29yYXRvcnMvU2VydmljZS5tanMnXG5leHBvcnQgeyBTZXJ2aWNlUHJvdmlkZXIgfSBmcm9tICcuL2RlY29yYXRvcnMvU2VydmljZVByb3ZpZGVyLm1qcydcbiJdLCJuYW1lcyI6WyJQcm92aWRlciIsIkZhY3RvcnkiLCJJbnN0YW5jZSIsIlNpbmdsZXRvbiIsIkNvbnRhaW5lckV4Y2VwdGlvbiIsIlNFUlZJQ0VfVFlQRSIsIkNvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwiX2JpbmRpbmdzIiwiTWFwIiwiX3Byb3ZpZGVycyIsIlNldCIsImJpbmRpbmdzIiwiaW5zdGFuY2UiLCJrZXkiLCJ2YWx1ZSIsInNldCIsInNpbmdsZXRvbiIsInJlc29sdmVyIiwiYmluZGluZyIsIm1ha2UiLCJoYXMiLCJnZXQiLCJyZXNvbHZlIiwiUkVTT0xVVElPTl9UWVBFIiwicHJvdmlkZXIiLCJQcm92aWRlckNsYXNzIiwicHJvdG90eXBlIiwiUFJPVklERVJfVFlQRSIsInJlZ2lzdGVyIiwiYWRkIiwiY2xlYXIiLCJkaXNjb3ZlcmluZyIsInNlcnZpY2VzIiwiZm9yRWFjaCIsIml0ZW0iLCJtZXRhZGF0YSIsIk5PVF9BX1NFUlZJQ0VfVFlQRSIsIl9hdXRvQmluZGluZyIsIm5hbWUiLCJ0eXBlIiwiZGVwZW5kZW5jaWVzIiwiZGVwcyIsIk9iamVjdCIsImZyb21FbnRyaWVzIiwibWFwIiwiS2xhc3MiLCJjb250YWluZXIiLCJfY29udGFpbmVyIiwiYm9vdCIsIlNlcnZpY2UiLCJERUNPUkFUT1JfVkFMVUVfVFlQRSIsInRhcmdldCIsIl9vYmplY3RTcHJlYWQiLCJTRVJWSUNFX1BST1ZJREVSX1RZUEUiLCJTZXJ2aWNlUHJvdmlkZXIiLCJFcnJvciIsIkNPTkZJR19UWVBFIiwiU0VSVklDRV9OT1RfRk9VTkRfVFlQRSIsIm1lc3NhZ2UiLCJnZXRNZXNzYWdlIiwibWVzc2FnZXMiLCJnZXRSZXNvbHV0aW9uTWVzc2FnZSIsInVuZGVmaW5lZCIsImZ1bmNOYW1lIiwidG9TdHJpbmciLCJCaW5kaW5nIiwiUmVzb2x2ZXJCaW5kaW5nIiwiaGFzUmVzb2x2ZWQiLCJfcmVzb2x2ZXIiXSwic291cmNlUm9vdCI6IiJ9

/***/ }),

/***/ "./src/controllers/UserController.mjs":
/*!********************************************!*\
  !*** ./src/controllers/UserController.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _UserController)
/* harmony export */ });
/* harmony import */ var _services_UserService_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/UserService.mjs */ "./src/services/UserService.mjs");
/* harmony import */ var _noowow_community_service_container_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noowow-community/service-container-js */ "./node_modules/@noowow-community/service-container-js/dist/index.js");
var _initClass, _dec, _class;
function createAddInitializerMethod(e, t) { return function (r) { assertNotFinished(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; }
function assertInstanceIfPrivate(e, t) { if (!e(t)) throw new TypeError("Attempted to access private element on non-instance"); }
function memberDec(e, t, r, n, a, i, s, o, c, l) { var u; switch (i) { case 1: u = "accessor"; break; case 2: u = "method"; break; case 3: u = "getter"; break; case 4: u = "setter"; break; default: u = "field"; } var f, d, p = { kind: u, name: o ? "#" + r : r, static: s, private: o }, h = { v: !1 }; if (0 !== i && (p.addInitializer = createAddInitializerMethod(a, h)), o || 0 !== i && 2 !== i) { if (2 === i) f = function (e) { return assertInstanceIfPrivate(l, e), n.value; };else { var v = 0 === i || 1 === i; (v || 3 === i) && (f = o ? function (e) { return assertInstanceIfPrivate(l, e), n.get.call(e); } : function (e) { return n.get.call(e); }), (v || 4 === i) && (d = o ? function (e, t) { assertInstanceIfPrivate(l, e), n.set.call(e, t); } : function (e, t) { n.set.call(e, t); }); } } else f = function (e) { return e[r]; }, 0 === i && (d = function (e, t) { e[r] = t; }); var y = o ? l.bind() : function (e) { return r in e; }; p.access = f && d ? { get: f, set: d, has: y } : f ? { get: f, has: y } : { set: d, has: y }; try { return e.call(t, c, p); } finally { h.v = !0; } }
function assertNotFinished(e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }
function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); }
function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 5 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } }
function curryThis1(e) { return function () { return e(this); }; }
function curryThis2(e) { return function (t) { e(this, t); }; }
function applyMemberDec(e, t, r, n, a, i, s, o, c, l) { var u, f, d, p, h, v, y = r[0]; n || Array.isArray(y) || (y = [y]), o ? u = 0 === i || 1 === i ? { get: curryThis1(r[3]), set: curryThis2(r[4]) } : 3 === i ? { get: r[3] } : 4 === i ? { set: r[3] } : { value: r[3] } : 0 !== i && (u = Object.getOwnPropertyDescriptor(t, a)), 1 === i ? d = { get: u.get, set: u.set } : 2 === i ? d = u.value : 3 === i ? d = u.get : 4 === i && (d = u.set); for (var g = n ? 2 : 1, m = y.length - 1; m >= 0; m -= g) { var b; if (void 0 !== (p = memberDec(y[m], n ? y[m - 1] : void 0, a, u, c, i, s, o, d, l))) assertValidReturnValue(i, p), 0 === i ? b = p : 1 === i ? (b = p.init, h = p.get || d.get, v = p.set || d.set, d = { get: h, set: v }) : d = p, void 0 !== b && (void 0 === f ? f = b : "function" == typeof f ? f = [f, b] : f.push(b)); } if (0 === i || 1 === i) { if (void 0 === f) f = function (e, t) { return t; };else if ("function" != typeof f) { var I = f; f = function (e, t) { for (var r = t, n = I.length - 1; n >= 0; n--) r = I[n].call(e, r); return r; }; } else { var w = f; f = function (e, t) { return w.call(e, t); }; } e.push(f); } 0 !== i && (1 === i ? (u.get = d.get, u.set = d.set) : 2 === i ? u.value = d : 3 === i ? u.get = d : 4 === i && (u.set = d), o ? 1 === i ? (e.push(function (e, t) { return d.get.call(e, t); }), e.push(function (e, t) { return d.set.call(e, t); })) : 2 === i ? e.push(d) : e.push(function (e, t) { return d.call(e, t); }) : Object.defineProperty(t, a, u)); }
function applyMemberDecs(e, t, r) { for (var n, a, i, s = [], o = new Map(), c = new Map(), l = 0; l < t.length; l++) { var u = t[l]; if (Array.isArray(u)) { var f, d, p = u[1], h = u[2], v = u.length > 3, y = 16 & p, g = !!(8 & p), m = r; if (p &= 7, g ? (f = e, 0 !== p && (d = a = a || []), v && !i && (i = function (t) { return _checkInRHS(t) === e; }), m = i) : (f = e.prototype, 0 !== p && (d = n = n || [])), 0 !== p && !v) { var b = g ? c : o, I = b.get(h) || 0; if (!0 === I || 3 === I && 4 !== p || 4 === I && 3 !== p) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h); b.set(h, !(!I && p > 2) || p); } applyMemberDec(s, f, u, y, h, p, g, v, d, m); } } return pushInitializers(s, n), pushInitializers(s, a), s; }
function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); }
function applyClassDecs(e, t, r) { if (t.length) { for (var n = [], a = e, i = e.name, s = r ? 2 : 1, o = t.length - 1; o >= 0; o -= s) { var c = { v: !1 }; try { var l = t[o].call(r ? t[o - 1] : void 0, a, { kind: "class", name: i, addInitializer: createAddInitializerMethod(n, c) }); } finally { c.v = !0; } void 0 !== l && (assertValidReturnValue(5, l), a = l); } return [a, function () { for (var e = 0; e < n.length; e++) n[e].call(a); }]; } }
function _applyDecs(e, t, r, n, a) { return { e: applyMemberDecs(e, t, a), get c() { return applyClassDecs(e, r, n); } }; }
function _checkInRHS(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? typeof e : "null")); return e; }


let _UserController;
_dec = (0,_noowow_community_service_container_js__WEBPACK_IMPORTED_MODULE_1__.Service)({
  dependencies: [{
    name: 'userService',
    value: _services_UserService_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]
  }]
});
class UserController {
  constructor({
    userService
  }) {
    this.userService = userService;
  }
  list(request) {
    console.log('User controller list:', request);
    console.log('User controller user service:', this.userService.list());
  }
  show(request) {
    console.log('User controller show:', this.userService.show(request.id));
  }
}
_class = UserController;
[_UserController, _initClass] = _applyDecs(_class, [], [_dec]).c;
_initClass();


/***/ }),

/***/ "./src/middleware/AuthMiddleware.mjs":
/*!*******************************************!*\
  !*** ./src/middleware/AuthMiddleware.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _AuthMiddleware)
/* harmony export */ });
/* harmony import */ var _noowow_community_service_container_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @noowow-community/service-container-js */ "./node_modules/@noowow-community/service-container-js/dist/index.js");
/* harmony import */ var _services_ConfigurationService_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/ConfigurationService.mjs */ "./src/services/ConfigurationService.mjs");
var _initClass, _dec, _class;
function createAddInitializerMethod(e, t) { return function (r) { assertNotFinished(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; }
function assertInstanceIfPrivate(e, t) { if (!e(t)) throw new TypeError("Attempted to access private element on non-instance"); }
function memberDec(e, t, r, n, a, i, s, o, c, l) { var u; switch (i) { case 1: u = "accessor"; break; case 2: u = "method"; break; case 3: u = "getter"; break; case 4: u = "setter"; break; default: u = "field"; } var f, d, p = { kind: u, name: o ? "#" + r : r, static: s, private: o }, h = { v: !1 }; if (0 !== i && (p.addInitializer = createAddInitializerMethod(a, h)), o || 0 !== i && 2 !== i) { if (2 === i) f = function (e) { return assertInstanceIfPrivate(l, e), n.value; };else { var v = 0 === i || 1 === i; (v || 3 === i) && (f = o ? function (e) { return assertInstanceIfPrivate(l, e), n.get.call(e); } : function (e) { return n.get.call(e); }), (v || 4 === i) && (d = o ? function (e, t) { assertInstanceIfPrivate(l, e), n.set.call(e, t); } : function (e, t) { n.set.call(e, t); }); } } else f = function (e) { return e[r]; }, 0 === i && (d = function (e, t) { e[r] = t; }); var y = o ? l.bind() : function (e) { return r in e; }; p.access = f && d ? { get: f, set: d, has: y } : f ? { get: f, has: y } : { set: d, has: y }; try { return e.call(t, c, p); } finally { h.v = !0; } }
function assertNotFinished(e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }
function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); }
function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 5 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } }
function curryThis1(e) { return function () { return e(this); }; }
function curryThis2(e) { return function (t) { e(this, t); }; }
function applyMemberDec(e, t, r, n, a, i, s, o, c, l) { var u, f, d, p, h, v, y = r[0]; n || Array.isArray(y) || (y = [y]), o ? u = 0 === i || 1 === i ? { get: curryThis1(r[3]), set: curryThis2(r[4]) } : 3 === i ? { get: r[3] } : 4 === i ? { set: r[3] } : { value: r[3] } : 0 !== i && (u = Object.getOwnPropertyDescriptor(t, a)), 1 === i ? d = { get: u.get, set: u.set } : 2 === i ? d = u.value : 3 === i ? d = u.get : 4 === i && (d = u.set); for (var g = n ? 2 : 1, m = y.length - 1; m >= 0; m -= g) { var b; if (void 0 !== (p = memberDec(y[m], n ? y[m - 1] : void 0, a, u, c, i, s, o, d, l))) assertValidReturnValue(i, p), 0 === i ? b = p : 1 === i ? (b = p.init, h = p.get || d.get, v = p.set || d.set, d = { get: h, set: v }) : d = p, void 0 !== b && (void 0 === f ? f = b : "function" == typeof f ? f = [f, b] : f.push(b)); } if (0 === i || 1 === i) { if (void 0 === f) f = function (e, t) { return t; };else if ("function" != typeof f) { var I = f; f = function (e, t) { for (var r = t, n = I.length - 1; n >= 0; n--) r = I[n].call(e, r); return r; }; } else { var w = f; f = function (e, t) { return w.call(e, t); }; } e.push(f); } 0 !== i && (1 === i ? (u.get = d.get, u.set = d.set) : 2 === i ? u.value = d : 3 === i ? u.get = d : 4 === i && (u.set = d), o ? 1 === i ? (e.push(function (e, t) { return d.get.call(e, t); }), e.push(function (e, t) { return d.set.call(e, t); })) : 2 === i ? e.push(d) : e.push(function (e, t) { return d.call(e, t); }) : Object.defineProperty(t, a, u)); }
function applyMemberDecs(e, t, r) { for (var n, a, i, s = [], o = new Map(), c = new Map(), l = 0; l < t.length; l++) { var u = t[l]; if (Array.isArray(u)) { var f, d, p = u[1], h = u[2], v = u.length > 3, y = 16 & p, g = !!(8 & p), m = r; if (p &= 7, g ? (f = e, 0 !== p && (d = a = a || []), v && !i && (i = function (t) { return _checkInRHS(t) === e; }), m = i) : (f = e.prototype, 0 !== p && (d = n = n || [])), 0 !== p && !v) { var b = g ? c : o, I = b.get(h) || 0; if (!0 === I || 3 === I && 4 !== p || 4 === I && 3 !== p) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h); b.set(h, !(!I && p > 2) || p); } applyMemberDec(s, f, u, y, h, p, g, v, d, m); } } return pushInitializers(s, n), pushInitializers(s, a), s; }
function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); }
function applyClassDecs(e, t, r) { if (t.length) { for (var n = [], a = e, i = e.name, s = r ? 2 : 1, o = t.length - 1; o >= 0; o -= s) { var c = { v: !1 }; try { var l = t[o].call(r ? t[o - 1] : void 0, a, { kind: "class", name: i, addInitializer: createAddInitializerMethod(n, c) }); } finally { c.v = !0; } void 0 !== l && (assertValidReturnValue(5, l), a = l); } return [a, function () { for (var e = 0; e < n.length; e++) n[e].call(a); }]; } }
function _applyDecs(e, t, r, n, a) { return { e: applyMemberDecs(e, t, a), get c() { return applyClassDecs(e, r, n); } }; }
function _checkInRHS(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? typeof e : "null")); return e; }


let _AuthMiddleware;
_dec = (0,_noowow_community_service_container_js__WEBPACK_IMPORTED_MODULE_0__.Service)({
  singleton: true,
  dependencies: [{
    name: 'configurationService',
    value: _services_ConfigurationService_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]
  }]
});
class AuthMiddleware {
  constructor({
    configurationService
  }) {
    this.configurationService = configurationService;
  }
  handleRequest(request) {
    console.log('Middleware request:', request);
    console.log('Middleware request config:', this.configurationService.get('middleware.name'));
  }
  handleResponse(request, response) {
    console.log('Middleware response:', request, response);
  }
}
_class = AuthMiddleware;
[_AuthMiddleware, _initClass] = _applyDecs(_class, [], [_dec]).c;
_initClass();


/***/ }),

/***/ "./src/service-container.mjs":
/*!***********************************!*\
  !*** ./src/service-container.mjs ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   container: () => (/* binding */ container)
/* harmony export */ });
/* harmony import */ var _noowow_community_service_container_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @noowow-community/service-container-js */ "./node_modules/@noowow-community/service-container-js/dist/index.js");

const container = new _noowow_community_service_container_js__WEBPACK_IMPORTED_MODULE_0__.Container();

/***/ }),

/***/ "./src/services/ConfigurationService.mjs":
/*!***********************************************!*\
  !*** ./src/services/ConfigurationService.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _ConfigurationService)
/* harmony export */ });
/* harmony import */ var _noowow_community_service_container_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @noowow-community/service-container-js */ "./node_modules/@noowow-community/service-container-js/dist/index.js");
var _initClass, _dec, _class;
function createAddInitializerMethod(e, t) { return function (r) { assertNotFinished(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; }
function assertInstanceIfPrivate(e, t) { if (!e(t)) throw new TypeError("Attempted to access private element on non-instance"); }
function memberDec(e, t, r, n, a, i, s, o, c, l) { var u; switch (i) { case 1: u = "accessor"; break; case 2: u = "method"; break; case 3: u = "getter"; break; case 4: u = "setter"; break; default: u = "field"; } var f, d, p = { kind: u, name: o ? "#" + r : r, static: s, private: o }, h = { v: !1 }; if (0 !== i && (p.addInitializer = createAddInitializerMethod(a, h)), o || 0 !== i && 2 !== i) { if (2 === i) f = function (e) { return assertInstanceIfPrivate(l, e), n.value; };else { var v = 0 === i || 1 === i; (v || 3 === i) && (f = o ? function (e) { return assertInstanceIfPrivate(l, e), n.get.call(e); } : function (e) { return n.get.call(e); }), (v || 4 === i) && (d = o ? function (e, t) { assertInstanceIfPrivate(l, e), n.set.call(e, t); } : function (e, t) { n.set.call(e, t); }); } } else f = function (e) { return e[r]; }, 0 === i && (d = function (e, t) { e[r] = t; }); var y = o ? l.bind() : function (e) { return r in e; }; p.access = f && d ? { get: f, set: d, has: y } : f ? { get: f, has: y } : { set: d, has: y }; try { return e.call(t, c, p); } finally { h.v = !0; } }
function assertNotFinished(e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }
function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); }
function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 5 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } }
function curryThis1(e) { return function () { return e(this); }; }
function curryThis2(e) { return function (t) { e(this, t); }; }
function applyMemberDec(e, t, r, n, a, i, s, o, c, l) { var u, f, d, p, h, v, y = r[0]; n || Array.isArray(y) || (y = [y]), o ? u = 0 === i || 1 === i ? { get: curryThis1(r[3]), set: curryThis2(r[4]) } : 3 === i ? { get: r[3] } : 4 === i ? { set: r[3] } : { value: r[3] } : 0 !== i && (u = Object.getOwnPropertyDescriptor(t, a)), 1 === i ? d = { get: u.get, set: u.set } : 2 === i ? d = u.value : 3 === i ? d = u.get : 4 === i && (d = u.set); for (var g = n ? 2 : 1, m = y.length - 1; m >= 0; m -= g) { var b; if (void 0 !== (p = memberDec(y[m], n ? y[m - 1] : void 0, a, u, c, i, s, o, d, l))) assertValidReturnValue(i, p), 0 === i ? b = p : 1 === i ? (b = p.init, h = p.get || d.get, v = p.set || d.set, d = { get: h, set: v }) : d = p, void 0 !== b && (void 0 === f ? f = b : "function" == typeof f ? f = [f, b] : f.push(b)); } if (0 === i || 1 === i) { if (void 0 === f) f = function (e, t) { return t; };else if ("function" != typeof f) { var I = f; f = function (e, t) { for (var r = t, n = I.length - 1; n >= 0; n--) r = I[n].call(e, r); return r; }; } else { var w = f; f = function (e, t) { return w.call(e, t); }; } e.push(f); } 0 !== i && (1 === i ? (u.get = d.get, u.set = d.set) : 2 === i ? u.value = d : 3 === i ? u.get = d : 4 === i && (u.set = d), o ? 1 === i ? (e.push(function (e, t) { return d.get.call(e, t); }), e.push(function (e, t) { return d.set.call(e, t); })) : 2 === i ? e.push(d) : e.push(function (e, t) { return d.call(e, t); }) : Object.defineProperty(t, a, u)); }
function applyMemberDecs(e, t, r) { for (var n, a, i, s = [], o = new Map(), c = new Map(), l = 0; l < t.length; l++) { var u = t[l]; if (Array.isArray(u)) { var f, d, p = u[1], h = u[2], v = u.length > 3, y = 16 & p, g = !!(8 & p), m = r; if (p &= 7, g ? (f = e, 0 !== p && (d = a = a || []), v && !i && (i = function (t) { return _checkInRHS(t) === e; }), m = i) : (f = e.prototype, 0 !== p && (d = n = n || [])), 0 !== p && !v) { var b = g ? c : o, I = b.get(h) || 0; if (!0 === I || 3 === I && 4 !== p || 4 === I && 3 !== p) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h); b.set(h, !(!I && p > 2) || p); } applyMemberDec(s, f, u, y, h, p, g, v, d, m); } } return pushInitializers(s, n), pushInitializers(s, a), s; }
function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); }
function applyClassDecs(e, t, r) { if (t.length) { for (var n = [], a = e, i = e.name, s = r ? 2 : 1, o = t.length - 1; o >= 0; o -= s) { var c = { v: !1 }; try { var l = t[o].call(r ? t[o - 1] : void 0, a, { kind: "class", name: i, addInitializer: createAddInitializerMethod(n, c) }); } finally { c.v = !0; } void 0 !== l && (assertValidReturnValue(5, l), a = l); } return [a, function () { for (var e = 0; e < n.length; e++) n[e].call(a); }]; } }
function _applyDecs(e, t, r, n, a) { return { e: applyMemberDecs(e, t, a), get c() { return applyClassDecs(e, r, n); } }; }
function _checkInRHS(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? typeof e : "null")); return e; }

let _ConfigurationService;
_dec = (0,_noowow_community_service_container_js__WEBPACK_IMPORTED_MODULE_0__.Service)({
  dependencies: [{
    name: 'config',
    value: {
      config: {
        middleware: {
          name: 'Vensy Middleware'
        },
        user: {
          email: 'jonh.doe@noowow.com',
          names: ['Jonh', 'Doe', 'James']
        }
      }
    }
  }]
});
class ConfigurationService {
  constructor({
    config
  }) {
    if (!config) throw new Error('No configurations provided');
    this.configurations = config;
  }
  get(keyword, scope = 'config') {
    return keyword.split('.').reduce((config, key) => {
      if (!config[key]) throw new Error(`No config for this key: ${keyword}`);
      return config[key];
    }, scope ? this.configurations[scope] : this.configurations);
  }
}
_class = ConfigurationService;
[_ConfigurationService, _initClass] = _applyDecs(_class, [], [_dec]).c;
_initClass();


/***/ }),

/***/ "./src/services/UserService.mjs":
/*!**************************************!*\
  !*** ./src/services/UserService.mjs ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _UserService)
/* harmony export */ });
/* harmony import */ var _ConfigurationService_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfigurationService.mjs */ "./src/services/ConfigurationService.mjs");
/* harmony import */ var _noowow_community_service_container_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noowow-community/service-container-js */ "./node_modules/@noowow-community/service-container-js/dist/index.js");
var _initClass, _dec, _class;
function createAddInitializerMethod(e, t) { return function (r) { assertNotFinished(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; }
function assertInstanceIfPrivate(e, t) { if (!e(t)) throw new TypeError("Attempted to access private element on non-instance"); }
function memberDec(e, t, r, n, a, i, s, o, c, l) { var u; switch (i) { case 1: u = "accessor"; break; case 2: u = "method"; break; case 3: u = "getter"; break; case 4: u = "setter"; break; default: u = "field"; } var f, d, p = { kind: u, name: o ? "#" + r : r, static: s, private: o }, h = { v: !1 }; if (0 !== i && (p.addInitializer = createAddInitializerMethod(a, h)), o || 0 !== i && 2 !== i) { if (2 === i) f = function (e) { return assertInstanceIfPrivate(l, e), n.value; };else { var v = 0 === i || 1 === i; (v || 3 === i) && (f = o ? function (e) { return assertInstanceIfPrivate(l, e), n.get.call(e); } : function (e) { return n.get.call(e); }), (v || 4 === i) && (d = o ? function (e, t) { assertInstanceIfPrivate(l, e), n.set.call(e, t); } : function (e, t) { n.set.call(e, t); }); } } else f = function (e) { return e[r]; }, 0 === i && (d = function (e, t) { e[r] = t; }); var y = o ? l.bind() : function (e) { return r in e; }; p.access = f && d ? { get: f, set: d, has: y } : f ? { get: f, has: y } : { set: d, has: y }; try { return e.call(t, c, p); } finally { h.v = !0; } }
function assertNotFinished(e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }
function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); }
function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 5 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } }
function curryThis1(e) { return function () { return e(this); }; }
function curryThis2(e) { return function (t) { e(this, t); }; }
function applyMemberDec(e, t, r, n, a, i, s, o, c, l) { var u, f, d, p, h, v, y = r[0]; n || Array.isArray(y) || (y = [y]), o ? u = 0 === i || 1 === i ? { get: curryThis1(r[3]), set: curryThis2(r[4]) } : 3 === i ? { get: r[3] } : 4 === i ? { set: r[3] } : { value: r[3] } : 0 !== i && (u = Object.getOwnPropertyDescriptor(t, a)), 1 === i ? d = { get: u.get, set: u.set } : 2 === i ? d = u.value : 3 === i ? d = u.get : 4 === i && (d = u.set); for (var g = n ? 2 : 1, m = y.length - 1; m >= 0; m -= g) { var b; if (void 0 !== (p = memberDec(y[m], n ? y[m - 1] : void 0, a, u, c, i, s, o, d, l))) assertValidReturnValue(i, p), 0 === i ? b = p : 1 === i ? (b = p.init, h = p.get || d.get, v = p.set || d.set, d = { get: h, set: v }) : d = p, void 0 !== b && (void 0 === f ? f = b : "function" == typeof f ? f = [f, b] : f.push(b)); } if (0 === i || 1 === i) { if (void 0 === f) f = function (e, t) { return t; };else if ("function" != typeof f) { var I = f; f = function (e, t) { for (var r = t, n = I.length - 1; n >= 0; n--) r = I[n].call(e, r); return r; }; } else { var w = f; f = function (e, t) { return w.call(e, t); }; } e.push(f); } 0 !== i && (1 === i ? (u.get = d.get, u.set = d.set) : 2 === i ? u.value = d : 3 === i ? u.get = d : 4 === i && (u.set = d), o ? 1 === i ? (e.push(function (e, t) { return d.get.call(e, t); }), e.push(function (e, t) { return d.set.call(e, t); })) : 2 === i ? e.push(d) : e.push(function (e, t) { return d.call(e, t); }) : Object.defineProperty(t, a, u)); }
function applyMemberDecs(e, t, r) { for (var n, a, i, s = [], o = new Map(), c = new Map(), l = 0; l < t.length; l++) { var u = t[l]; if (Array.isArray(u)) { var f, d, p = u[1], h = u[2], v = u.length > 3, y = 16 & p, g = !!(8 & p), m = r; if (p &= 7, g ? (f = e, 0 !== p && (d = a = a || []), v && !i && (i = function (t) { return _checkInRHS(t) === e; }), m = i) : (f = e.prototype, 0 !== p && (d = n = n || [])), 0 !== p && !v) { var b = g ? c : o, I = b.get(h) || 0; if (!0 === I || 3 === I && 4 !== p || 4 === I && 3 !== p) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h); b.set(h, !(!I && p > 2) || p); } applyMemberDec(s, f, u, y, h, p, g, v, d, m); } } return pushInitializers(s, n), pushInitializers(s, a), s; }
function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); }
function applyClassDecs(e, t, r) { if (t.length) { for (var n = [], a = e, i = e.name, s = r ? 2 : 1, o = t.length - 1; o >= 0; o -= s) { var c = { v: !1 }; try { var l = t[o].call(r ? t[o - 1] : void 0, a, { kind: "class", name: i, addInitializer: createAddInitializerMethod(n, c) }); } finally { c.v = !0; } void 0 !== l && (assertValidReturnValue(5, l), a = l); } return [a, function () { for (var e = 0; e < n.length; e++) n[e].call(a); }]; } }
function _applyDecs(e, t, r, n, a) { return { e: applyMemberDecs(e, t, a), get c() { return applyClassDecs(e, r, n); } }; }
function _checkInRHS(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? typeof e : "null")); return e; }


let _UserService;
_dec = (0,_noowow_community_service_container_js__WEBPACK_IMPORTED_MODULE_1__.Service)({
  dependencies: [{
    name: 'configurationService',
    value: _ConfigurationService_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]
  }]
});
class UserService {
  constructor({
    configurationService
  }) {
    this.configurationService = configurationService;
  }
  list() {
    console.log('User service list');
    console.log('User service list config', this.configurationService.get('user.names'));
    return this.configurationService.get('user.names');
  }
  show(id) {
    console.log('User service show', id);
    console.log('User service show config', this.configurationService.get('user.email'));
    return this.configurationService.get('user.email');
  }
}
_class = UserService;
[_UserService, _initClass] = _applyDecs(_class, [], [_dec]).c;
_initClass();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./src/index.mjs ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service_container_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service-container.mjs */ "./src/service-container.mjs");
/* harmony import */ var _middleware_AuthMiddleware_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./middleware/AuthMiddleware.mjs */ "./src/middleware/AuthMiddleware.mjs");
/* harmony import */ var _controllers_UserController_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/UserController.mjs */ "./src/controllers/UserController.mjs");
/* harmony import */ var _services_UserService_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/UserService.mjs */ "./src/services/UserService.mjs");
/* harmony import */ var _services_ConfigurationService_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/ConfigurationService.mjs */ "./src/services/ConfigurationService.mjs");
// import { globSync } from "glob"
// import { getRelativePath } from "./utils.mjs"






// const importServiceClasses = async () => {
//   const klasses = new Set()
//   for (const folder of ['src']) {
//     const files = globSync(`${folder}/**/*.mjs`, { absolute: false })
//     for (const file of files) {
//       try {
//         const klass = (await import(getRelativePath(file))).default
//         klass.metadata && !klasses.has(klass) && klasses.add(klass)
//       } catch (e) {
//         console.log('Error while importing services', e);
//       }
//     }
//   }
//   return klasses
// }
const getModules = () => Promise.resolve([_services_UserService_mjs__WEBPACK_IMPORTED_MODULE_3__["default"], _controllers_UserController_mjs__WEBPACK_IMPORTED_MODULE_2__["default"], _services_ConfigurationService_mjs__WEBPACK_IMPORTED_MODULE_4__["default"], _middleware_AuthMiddleware_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]]);
getModules().then(modules => {
  _service_container_mjs__WEBPACK_IMPORTED_MODULE_0__.container.discovering(modules);
  console.log('Binding values:', _service_container_mjs__WEBPACK_IMPORTED_MODULE_0__.container.bindings.values());
  _service_container_mjs__WEBPACK_IMPORTED_MODULE_0__.container.make(_middleware_AuthMiddleware_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]).handleRequest({
    body: {
      name: 'Evens'
    }
  });
  _service_container_mjs__WEBPACK_IMPORTED_MODULE_0__.container.make(_controllers_UserController_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]).list({
    body: {
      name: 'Evens'
    }
  });
}).catch(e => console.log('Error', e));

// import { container } from "./service-container.mjs"
// import * as modules0 from "/Users/evenspierre/Projects/Noowow/libs/service-container-js/examples/src/service-container.mjs"; import * as modules1 from "/Users/evenspierre/Projects/Noowow/libs/service-container-js/examples/src/utils.mjs"
// console.log('modules', modules)
// console.log('palllll', container);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUU7SUFBUTtFQUFFLENBQUMsQ0FBQztFQUN6RTBCLDZEQUFTLENBQUN1QixJQUFJLENBQUMvQyx1RUFBYyxDQUFDLENBQUNHLElBQUksQ0FBQztJQUFFNkMsSUFBSSxFQUFFO01BQUVsRCxJQUFJLEVBQUU7SUFBUTtFQUFFLENBQUMsQ0FBQztBQUNsRSxDQUFDLENBQUMsQ0FBQ21ELEtBQUssQ0FBQ0MsQ0FBQyxJQUFJN0MsT0FBTyxDQUFDQyxHQUFHLENBQUMsT0FBTyxFQUFFNEMsQ0FBQyxDQUFDLENBQUM7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBLHFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQ29udGFpbmVyRXhhbXBsZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vQ29udGFpbmVyRXhhbXBsZS8uL25vZGVfbW9kdWxlcy9Abm9vd293LWNvbW11bml0eS9zZXJ2aWNlLWNvbnRhaW5lci1qcy9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL0NvbnRhaW5lckV4YW1wbGUvLi9zcmMvY29udHJvbGxlcnMvVXNlckNvbnRyb2xsZXIubWpzIiwid2VicGFjazovL0NvbnRhaW5lckV4YW1wbGUvLi9zcmMvbWlkZGxld2FyZS9BdXRoTWlkZGxld2FyZS5tanMiLCJ3ZWJwYWNrOi8vQ29udGFpbmVyRXhhbXBsZS8uL3NyYy9zZXJ2aWNlLWNvbnRhaW5lci5tanMiLCJ3ZWJwYWNrOi8vQ29udGFpbmVyRXhhbXBsZS8uL3NyYy9zZXJ2aWNlcy9Db25maWd1cmF0aW9uU2VydmljZS5tanMiLCJ3ZWJwYWNrOi8vQ29udGFpbmVyRXhhbXBsZS8uL3NyYy9zZXJ2aWNlcy9Vc2VyU2VydmljZS5tanMiLCJ3ZWJwYWNrOi8vQ29udGFpbmVyRXhhbXBsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Db250YWluZXJFeGFtcGxlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Db250YWluZXJFeGFtcGxlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQ29udGFpbmVyRXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0NvbnRhaW5lckV4YW1wbGUvLi9zcmMvaW5kZXgubWpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkNvbnRhaW5lckV4YW1wbGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQ29udGFpbmVyRXhhbXBsZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsICgpID0+IHtcbnJldHVybiAiLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJOb29Db250YWluZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTm9vQ29udGFpbmVyXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgKCkgPT4ge1xucmV0dXJuIC8qKioqKiovICgoKSA9PiB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0XCJ1c2Ugc3RyaWN0XCI7XG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gXCIuL3NyYy9Db250YWluZXIubWpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9zcmMvQ29udGFpbmVyLm1qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX19fd2VicGFja19tb2R1bGVfXywgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBDb250YWluZXI6ICgpID0+ICgvKiBiaW5kaW5nICovIENvbnRhaW5lcilcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9Qcm92aWRlcl9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vUHJvdmlkZXIubWpzICovIFwiLi9zcmMvUHJvdmlkZXIubWpzXCIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9tb2RlbHNfRmFjdG9yeV9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vbW9kZWxzL0ZhY3RvcnkubWpzICovIFwiLi9zcmMvbW9kZWxzL0ZhY3RvcnkubWpzXCIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9tb2RlbHNfSW5zdGFuY2VfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL21vZGVscy9JbnN0YW5jZS5tanMgKi8gXCIuL3NyYy9tb2RlbHMvSW5zdGFuY2UubWpzXCIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9tb2RlbHNfU2luZ2xldG9uX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9tb2RlbHMvU2luZ2xldG9uLm1qcyAqLyBcIi4vc3JjL21vZGVscy9TaW5nbGV0b24ubWpzXCIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9leGNlcHRpb25zX0NvbnRhaW5lckV4Y2VwdGlvbl9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vZXhjZXB0aW9ucy9Db250YWluZXJFeGNlcHRpb24ubWpzICovIFwiLi9zcmMvZXhjZXB0aW9ucy9Db250YWluZXJFeGNlcHRpb24ubWpzXCIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9kZWNvcmF0b3JzX1NlcnZpY2VfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2RlY29yYXRvcnMvU2VydmljZS5tanMgKi8gXCIuL3NyYy9kZWNvcmF0b3JzL1NlcnZpY2UubWpzXCIpO1xuXG5cblxuXG5cblxuY2xhc3MgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fYmluZGluZ3MgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5fcHJvdmlkZXJzID0gbmV3IFNldCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIHRoZSB2YWx1ZSBvZiB0aGUgYmluZGluZ3MgcHJvcGVydHkuXG4gICAqXG4gICAqIEByZXR1cm4ge0JpbmRpbmd9XG4gICAqL1xuICBnZXQgYmluZGluZ3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSBzaW5nbGUgaW5zdGFuY2Ugb3IgdmFsdWUgaW50byB0aGUgY29udGFpbmVyIHVuZGVyIHRoZSBwcm92aWRlZCBrZXkuXG4gICAqXG4gICAqIEBwYXJhbSAge2FueX0ga2V5XG4gICAqIEBwYXJhbSAge2FueX0gdmFsdWVcbiAgICogQHJldHVybiB7dGhpc31cbiAgICovXG4gIGluc3RhbmNlKGtleSwgdmFsdWUpIHtcbiAgICB0aGlzLl9iaW5kaW5ncy5zZXQoa2V5LCBuZXcgX21vZGVsc19JbnN0YW5jZV9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfX1tcImRlZmF1bHRcIl0odmFsdWUpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgcmVzb2x2ZXIgZnVuY3Rpb24gaW50byB0aGUgY29udGFpbmVyIHVuZGVyIHRoZSBwcm92aWRlZCBrZXkuIFRoZVxuICAgKiByZXNvbHZlciB3aWxsIGJlIHJ1biBvbmNlIGFuZCB0aGUgcmVzdWx0aW5nIHZhbHVlIHdpbGwgYmUgcmV0dXJuZWQgZm9yIGFsbFxuICAgKiBzdWJzZXF1ZW50IHJlc29sdXRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gIHthbnl9ICAgICAga2V5XG4gICAqIEBwYXJhbSAge1Jlc29sdmVyfSByZXNvbHZlclxuICAgKiBAcmV0dXJuIHt0aGlzfVxuICAgKi9cbiAgc2luZ2xldG9uKGtleSwgcmVzb2x2ZXIpIHtcbiAgICB0aGlzLl9iaW5kaW5ncy5zZXQoa2V5LCBuZXcgX21vZGVsc19TaW5nbGV0b25fbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX19bXCJkZWZhdWx0XCJdKHJlc29sdmVyKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHJlc29sdmVyIGZ1bmN0aW9uIGludG8gdGhlIGNvbnRhaW5lciB1bmRlciB0aGUgcHJvdmlkZWQga2V5LiBUaGVcbiAgICogcmVzb2x2ZXIgd2lsbCBiZSBydW4gZWFjaCB0aW1lIHRoZSBrZXkgaXMgcmVzb2x2ZWQgcmVzdWx0aW5nIGluIG5ld1xuICAgKiBpbnN0YW5jZXMgZWFjaCByZXNvbHV0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIHthbnl9ICAgICAga2V5XG4gICAqIEBwYXJhbSAge1Jlc29sdmVyfSByZXNvbHZlclxuICAgKiBAcmV0dXJuIHt0aGlzfVxuICAgKi9cbiAgYmluZGluZyhrZXksIHJlc29sdmVyKSB7XG4gICAgdGhpcy5fYmluZGluZ3Muc2V0KGtleSwgbmV3IF9tb2RlbHNfRmFjdG9yeV9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX1tcImRlZmF1bHRcIl0ocmVzb2x2ZXIpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlIGEgdmFsdWUgZnJvbSB0aGUgY29udGFpbmVyIGJ5IGl0cyBrZXkuXG4gICAqXG4gICAqIEBwYXJhbSAge2FueX0ga2V5XG4gICAqIEByZXR1cm4ge2FueX1cbiAgICovXG4gIG1ha2Uoa2V5KSB7XG4gICAgaWYgKHRoaXMuX2JpbmRpbmdzLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYmluZGluZ3MuZ2V0KGtleSkucmVzb2x2ZSh0aGlzKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IF9leGNlcHRpb25zX0NvbnRhaW5lckV4Y2VwdGlvbl9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfX1tcImRlZmF1bHRcIl0oX2V4Y2VwdGlvbnNfQ29udGFpbmVyRXhjZXB0aW9uX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fW1wiZGVmYXVsdFwiXS5SRVNPTFVUSU9OX1RZUEUsIGtleSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgc2VydmljZSBwcm92aWRlciBpbnRvIHRoZSBjb250YWluZXIgdG8gcmVnaXN0ZXIgb25lIG9yIG1hbnkgYmluZGluZ3NcbiAgICogYXMgYSB1bml0LlxuICAgKlxuICAgKiBAcGFyYW0gIHtQcm92aWRlcn0gcHJvdmlkZXJcbiAgICogQHJldHVybiB7dGhpc31cbiAgICovXG4gIHByb3ZpZGVyKFByb3ZpZGVyQ2xhc3MpIHtcbiAgICBpZiAoIShQcm92aWRlckNsYXNzLnByb3RvdHlwZSBpbnN0YW5jZW9mIF9Qcm92aWRlcl9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy5Qcm92aWRlcikpIHRocm93IG5ldyBfZXhjZXB0aW9uc19Db250YWluZXJFeGNlcHRpb25fbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X19bXCJkZWZhdWx0XCJdKF9leGNlcHRpb25zX0NvbnRhaW5lckV4Y2VwdGlvbl9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfX1tcImRlZmF1bHRcIl0uUFJPVklERVJfVFlQRSwgUHJvdmlkZXJDbGFzcyk7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBuZXcgUHJvdmlkZXJDbGFzcyh0aGlzKTtcbiAgICBwcm92aWRlci5yZWdpc3RlcigpO1xuICAgICF0aGlzLl9wcm92aWRlcnMuaGFzKHByb3ZpZGVyKSAmJiB0aGlzLl9wcm92aWRlcnMuYWRkKHByb3ZpZGVyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgY29udGFpbmVyIHNvIHRoYXQgYWxsIGZha2UgYmluZGluZ3MgYXJlIHJlbW92ZWQgYW5kIGFsbCBvcmlnaW5hbFxuICAgKiBiaW5kaW5ncyB3aWxsIGJlIHVzZWQgd2hlbiByZXF1ZXN0ZWQuIElmIGEgaGFyZCByZXF1ZXN0IGlzIHJ1biwgdGhlbiBib3RoXG4gICAqIHRoZSBmYWtlcyBhbmQgdGhlIGJpbmRpbmdzIHdpbGwgYmUgY2xlYXJlZC5cbiAgICpcbiAgICogQHBhcmFtICB7Ym9vbGVhbn0gaGFyZFxuICAgKiBAcmV0dXJuIHt0aGlzfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5fYmluZGluZ3MuY2xlYXIoKTtcbiAgICB0aGlzLl9wcm92aWRlcnMuY2xlYXIoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdXRvIERpc2NvdmVyIHNlcnZpY2VzXG4gICAqXG4gICAqIEByZXR1cm4ge3RoaXN9XG4gICAqL1xuICBkaXNjb3ZlcmluZyhzZXJ2aWNlcyA9IFtdKSB7XG4gICAgKHNlcnZpY2VzID8/IFtdKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKCFpdGVtLm1ldGFkYXRhKSB0aHJvdyBuZXcgX2V4Y2VwdGlvbnNfQ29udGFpbmVyRXhjZXB0aW9uX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fW1wiZGVmYXVsdFwiXShfZXhjZXB0aW9uc19Db250YWluZXJFeGNlcHRpb25fbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X19bXCJkZWZhdWx0XCJdLk5PVF9BX1NFUlZJQ0VfVFlQRSwgaXRlbSk7XG4gICAgICB0aGlzLl9hdXRvQmluZGluZyhpdGVtLCBpdGVtKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBfYXV0b0JpbmRpbmcobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuX2JpbmRpbmdzLmhhcyhuYW1lKSkge1xuICAgICAgaWYgKHZhbHVlLm1ldGFkYXRhICYmIHZhbHVlLm1ldGFkYXRhLnR5cGUgPT09IF9kZWNvcmF0b3JzX1NlcnZpY2VfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18uU0VSVklDRV9UWVBFKSB7XG4gICAgICAgIGNvbnN0IGRlcGVuZGVuY2llcyA9IHZhbHVlLm1ldGFkYXRhLmRlcGVuZGVuY2llcyA/PyBbXTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGRlcGVuZGVuY2llcykge1xuICAgICAgICAgIHRoaXMuX2F1dG9CaW5kaW5nKGl0ZW0udmFsdWUubWV0YWRhdGEgPyBpdGVtLnZhbHVlIDogaXRlbS5uYW1lLCBpdGVtLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZXBzID0gT2JqZWN0LmZyb21FbnRyaWVzKGRlcGVuZGVuY2llcy5tYXAoaXRlbSA9PiBbaXRlbS5uYW1lLCB0aGlzLm1ha2UoaXRlbS52YWx1ZS5tZXRhZGF0YSA/IGl0ZW0udmFsdWUgOiBpdGVtLm5hbWUpXSkpO1xuICAgICAgICBjb25zdCBLbGFzcyA9IHZhbHVlO1xuICAgICAgICBjb25zdCByZXNvbHZlciA9ICgpID0+IG5ldyBLbGFzcyhkZXBzKTtcbiAgICAgICAgdmFsdWUubWV0YWRhdGEuc2luZ2xldG9uID8gdGhpcy5zaW5nbGV0b24obmFtZSwgcmVzb2x2ZXIpIDogdGhpcy5iaW5kaW5nKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW5zdGFuY2UobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL3NyYy9Qcm92aWRlci5tanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL1Byb3ZpZGVyLm1qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfX193ZWJwYWNrX21vZHVsZV9fLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFByb3ZpZGVyOiAoKSA9PiAoLyogYmluZGluZyAqLyBQcm92aWRlcilcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuY2xhc3MgUHJvdmlkZXIge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIFByb3ZpZGVyLlxuICAgKlxuICAgKiBAcGFyYW0gIHtDb250YWluZXJ9IGNvbnRhaW5lclxuICAgKi9cbiAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgdGhpcy5fY29udGFpbmVyID0gY29udGFpbmVyO1xuICB9XG4gIGdldCBjb250YWluZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbnkgYXBwbGljYXRpb24gc2VydmljZXMuXG4gICAqL1xuICByZWdpc3RlcigpIHt9XG5cbiAgLyoqXG4gICAqIEJvb3RzdHJhcCBhbnkgYXBwbGljYXRpb24gc2VydmljZXMuXG4gICAqL1xuICBib290KCkge31cbn1cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9zcmMvZGVjb3JhdG9ycy9TZXJ2aWNlLm1qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL2RlY29yYXRvcnMvU2VydmljZS5tanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovICgoX191bnVzZWRfd2VicGFja19fX3dlYnBhY2tfbW9kdWxlX18sIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pID0+IHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgU0VSVklDRV9UWVBFOiAoKSA9PiAoLyogYmluZGluZyAqLyBTRVJWSUNFX1RZUEUpLFxuLyogaGFybW9ueSBleHBvcnQgKi8gICBTZXJ2aWNlOiAoKSA9PiAoLyogYmluZGluZyAqLyBTZXJ2aWNlKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX2V4Y2VwdGlvbnNfQ29udGFpbmVyRXhjZXB0aW9uX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vZXhjZXB0aW9ucy9Db250YWluZXJFeGNlcHRpb24ubWpzICovIFwiLi9zcmMvZXhjZXB0aW9ucy9Db250YWluZXJFeGNlcHRpb24ubWpzXCIpO1xuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGVudW1lcmFibGVPbmx5ICYmIChzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSkpLCBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBudWxsICE9IGFyZ3VtZW50c1tpXSA/IGFyZ3VtZW50c1tpXSA6IHt9OyBpICUgMiA/IG93bktleXMoT2JqZWN0KHNvdXJjZSksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpIDogb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7IHZhciBrZXkgPSBfdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTsgcmV0dXJuIHR5cGVvZiBrZXkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7IGlmICh0eXBlb2YgaW5wdXQgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDsgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7IHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpOyBpZiAodHlwZW9mIHJlcyAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlczsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpOyB9XG5cbmNvbnN0IFNFUlZJQ0VfVFlQRSA9ICdzZXJ2aWNlJztcbmNvbnN0IFNlcnZpY2UgPSB2YWx1ZSA9PiB7XG4gIGlmICghdmFsdWUpIHRocm93IG5ldyBfZXhjZXB0aW9uc19Db250YWluZXJFeGNlcHRpb25fbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bXCJkZWZhdWx0XCJdKF9leGNlcHRpb25zX0NvbnRhaW5lckV4Y2VwdGlvbl9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcImRlZmF1bHRcIl0uREVDT1JBVE9SX1ZBTFVFX1RZUEUpO1xuICByZXR1cm4gdGFyZ2V0ID0+IHtcbiAgICB0YXJnZXQubWV0YWRhdGEgPSBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIHZhbHVlKSwge30sIHtcbiAgICAgIHR5cGU6IFNFUlZJQ0VfVFlQRVxuICAgIH0pO1xuICB9O1xufTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9zcmMvZGVjb3JhdG9ycy9TZXJ2aWNlUHJvdmlkZXIubWpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3NyYy9kZWNvcmF0b3JzL1NlcnZpY2VQcm92aWRlci5tanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX19fd2VicGFja19tb2R1bGVfXywgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBTRVJWSUNFX1BST1ZJREVSX1RZUEU6ICgpID0+ICgvKiBiaW5kaW5nICovIFNFUlZJQ0VfUFJPVklERVJfVFlQRSksXG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFNlcnZpY2VQcm92aWRlcjogKCkgPT4gKC8qIGJpbmRpbmcgKi8gU2VydmljZVByb3ZpZGVyKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX2V4Y2VwdGlvbnNfQ29udGFpbmVyRXhjZXB0aW9uX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vZXhjZXB0aW9ucy9Db250YWluZXJFeGNlcHRpb24ubWpzICovIFwiLi9zcmMvZXhjZXB0aW9ucy9Db250YWluZXJFeGNlcHRpb24ubWpzXCIpO1xuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGVudW1lcmFibGVPbmx5ICYmIChzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSkpLCBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBudWxsICE9IGFyZ3VtZW50c1tpXSA/IGFyZ3VtZW50c1tpXSA6IHt9OyBpICUgMiA/IG93bktleXMoT2JqZWN0KHNvdXJjZSksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpIDogb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7IHZhciBrZXkgPSBfdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTsgcmV0dXJuIHR5cGVvZiBrZXkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7IGlmICh0eXBlb2YgaW5wdXQgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDsgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7IHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpOyBpZiAodHlwZW9mIHJlcyAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlczsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpOyB9XG5cbmNvbnN0IFNFUlZJQ0VfUFJPVklERVJfVFlQRSA9ICdzZXJ2aWNlX3Byb3ZpZGVyJztcbmNvbnN0IFNlcnZpY2VQcm92aWRlciA9IHZhbHVlID0+IHtcbiAgaWYgKCF2YWx1ZSkgdGhyb3cgbmV3IF9leGNlcHRpb25zX0NvbnRhaW5lckV4Y2VwdGlvbl9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcImRlZmF1bHRcIl0oX2V4Y2VwdGlvbnNfQ29udGFpbmVyRXhjZXB0aW9uX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fW1wiZGVmYXVsdFwiXS5ERUNPUkFUT1JfVkFMVUVfVFlQRSk7XG4gIHJldHVybiB0YXJnZXQgPT4ge1xuICAgIHRhcmdldC5tZXRhZGF0YSA9IF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgdmFsdWUpLCB7fSwge1xuICAgICAgdHlwZTogU0VSVklDRV9QUk9WSURFUl9UWVBFXG4gICAgfSk7XG4gIH07XG59O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL3NyYy9leGNlcHRpb25zL0NvbnRhaW5lckV4Y2VwdGlvbi5tanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL2V4Y2VwdGlvbnMvQ29udGFpbmVyRXhjZXB0aW9uLm1qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfX193ZWJwYWNrX21vZHVsZV9fLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiZGVmYXVsdFwiOiAoKSA9PiAoLyogYmluZGluZyAqLyBDb250YWluZXJFeGNlcHRpb24pXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbmNsYXNzIENvbnRhaW5lckV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcbiAgc3RhdGljIGdldCBDT05GSUdfVFlQRSgpIHtcbiAgICByZXR1cm4gJ2NvbmZpZyc7XG4gIH1cbiAgc3RhdGljIGdldCBQUk9WSURFUl9UWVBFKCkge1xuICAgIHJldHVybiAncHJvdmlkZXInO1xuICB9XG4gIHN0YXRpYyBnZXQgUkVTT0xVVElPTl9UWVBFKCkge1xuICAgIHJldHVybiAncmVzb2x1dGlvbic7XG4gIH1cbiAgc3RhdGljIGdldCBOT1RfQV9TRVJWSUNFX1RZUEUoKSB7XG4gICAgcmV0dXJuICdub3RfYV9zZXJ2aWNlJztcbiAgfVxuICBzdGF0aWMgZ2V0IERFQ09SQVRPUl9WQUxVRV9UWVBFKCkge1xuICAgIHJldHVybiAnZGVjb3JhdG9yX3ZhbHVlJztcbiAgfVxuICBzdGF0aWMgZ2V0IFNFUlZJQ0VfTk9UX0ZPVU5EX1RZUEUoKSB7XG4gICAgcmV0dXJuICdzZXJ2aWNlX25vdF9mb3VuZCc7XG4gIH1cbiAgY29uc3RydWN0b3IodHlwZSwgbWVzc2FnZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLm5hbWUgPSAnbm9vd293LnNlcnZpY2VfY29udGFpbmVyJztcbiAgICB0aGlzLm1lc3NhZ2UgPSB0aGlzLmdldE1lc3NhZ2UodHlwZSwgbWVzc2FnZSk7XG4gIH1cbiAgZ2V0TWVzc2FnZSh0eXBlLCBtZXNzYWdlKSB7XG4gICAgY29uc3QgbWVzc2FnZXMgPSB7XG4gICAgICBbQ29udGFpbmVyRXhjZXB0aW9uLkNPTkZJR19UWVBFXTogJ05vIGNvbmZpZ3VyYXRpb25zIHByb3ZpZGVkLicsXG4gICAgICBbQ29udGFpbmVyRXhjZXB0aW9uLlJFU09MVVRJT05fVFlQRV06IHRoaXMuZ2V0UmVzb2x1dGlvbk1lc3NhZ2UobWVzc2FnZSksXG4gICAgICBbQ29udGFpbmVyRXhjZXB0aW9uLlNFUlZJQ0VfTk9UX0ZPVU5EX1RZUEVdOiBgU2VydmljZSgke21lc3NhZ2V9KSBub3QgZm91bmQuYCxcbiAgICAgIFtDb250YWluZXJFeGNlcHRpb24uREVDT1JBVE9SX1ZBTFVFX1RZUEVdOiAnTm8gY29uZmlndXJhdGlvbnMgcHJvdmlkZWQgZm9yIHRoaXMgZGVjb3JhdG9yLicsXG4gICAgICBbQ29udGFpbmVyRXhjZXB0aW9uLlBST1ZJREVSX1RZUEVdOiBgVGhpcyBjbGFzcygke21lc3NhZ2V9KSBpcyBub3QgYSBwcm92aWRlci4gQ2xhc3MgbXVzdCBleHRlbmRzIFByb3ZpZGVyIGNsYXNzLmAsXG4gICAgICBbQ29udGFpbmVyRXhjZXB0aW9uLk5PVF9BX1NFUlZJQ0VfVFlQRV06IGBUaGlzICgke21lc3NhZ2V9KSBpcyBub3Qgc2VydmljZS4gTXVzdCBjb250YWlucyBtZXRhZGF0YSBzdGF0aWMgcHJvcGVydHkgb3IgbXVzdCB1c2UgQFNlcnZpY2UgZGVjb3JhdG9yYFxuICAgIH07XG4gICAgcmV0dXJuIG1lc3NhZ2VzW3R5cGVdID8/ICdBbiBlcnJvciBoYXMgb2NjdXJlZC4nO1xuICB9XG4gIGdldFJlc29sdXRpb25NZXNzYWdlKGtleSkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBrZXkgPT09IHVuZGVmaW5lZDpcbiAgICAgICAgdmFsdWUgPSAndW5kZWZpbmVkJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleSA9PT0gbnVsbDpcbiAgICAgICAgdmFsdWUgPSAnbnVsbCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgZnVuY05hbWUgPSBrZXkubmFtZSA/IGA6ICR7a2V5Lm5hbWV9YCA6ICcnO1xuICAgICAgICAgIHZhbHVlID0gYFtGdW5jdGlvbiR7ZnVuY05hbWV9XWA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGNhc2UgdHlwZW9mIGtleSA9PT0gJ29iamVjdCc6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IGBbT2JqZWN0OiAke2tleS5jb25zdHJ1Y3Rvci5uYW1lfV1gO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBjYXNlIHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnOlxuICAgICAgICB2YWx1ZSA9IGB0eXBlICR7dHlwZW9mIGtleX0gd2l0aCBhIHZhbHVlIG9mICcke2tleX0nYDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnOlxuICAgICAgICB2YWx1ZSA9IGtleS50b1N0cmluZygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhbHVlID0gYHR5cGUgJHt0eXBlb2Yga2V5fSB3aXRoIGEgdmFsdWUgb2YgJHtrZXl9YDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBgRmFpbGVkIHRvIHJlc29sdmUgYSBiaW5kaW5nIHdpdGggYSBrZXkgb2YgJHt2YWx1ZX0gZnJvbSB0aGUgc2VydmljZSBjb250YWluZXIuYDtcbiAgfVxufVxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL3NyYy9tb2RlbHMvQmluZGluZy5tanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL21vZGVscy9CaW5kaW5nLm1qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfX193ZWJwYWNrX21vZHVsZV9fLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiZGVmYXVsdFwiOiAoKSA9PiAoLyogYmluZGluZyAqLyBCaW5kaW5nKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG5jbGFzcyBCaW5kaW5nIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBCaW5kaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge2FueSA9IG51bGx9ICB2YWx1ZVxuICAgKi9cbiAgY29uc3RydWN0b3IodmFsdWUgPSBudWxsKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmUgYW5kIHJldHVybiB0aGUgdmFsdWUgb2YgdGhlIGJpbmRpbmcuXG4gICAqXG4gICAqIEByZXR1cm4ge2FueX1cbiAgICovXG4gIHJlc29sdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cbn1cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9zcmMvbW9kZWxzL0ZhY3RvcnkubWpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3NyYy9tb2RlbHMvRmFjdG9yeS5tanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX19fd2VicGFja19tb2R1bGVfXywgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImRlZmF1bHRcIjogKCkgPT4gKC8qIGJpbmRpbmcgKi8gRmFjdG9yeSlcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9SZXNvbHZlckJpbmRpbmdfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL1Jlc29sdmVyQmluZGluZy5tanMgKi8gXCIuL3NyYy9tb2RlbHMvUmVzb2x2ZXJCaW5kaW5nLm1qc1wiKTtcblxuY2xhc3MgRmFjdG9yeSBleHRlbmRzIF9SZXNvbHZlckJpbmRpbmdfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bXCJkZWZhdWx0XCJdIHtcbiAgLyoqXG4gICAqIFJlc29sdmUgYW5kIHJldHVybiB0aGUgdmFsdWUgb2YgdGhlIGJpbmRpbmcuXG4gICAqXG4gICAqIEBwYXJhbSAge0NvbnRhaW5lcn0gY29udGFpbmVyXG4gICAqIEByZXR1cm4ge2FueX1cbiAgICovXG4gIHJlc29sdmUoY29udGFpbmVyKSB7XG4gICAgdGhpcy5oYXNSZXNvbHZlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZXIoY29udGFpbmVyKTtcbiAgfVxufVxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL3NyYy9tb2RlbHMvSW5zdGFuY2UubWpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9zcmMvbW9kZWxzL0luc3RhbmNlLm1qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX19fd2VicGFja19tb2R1bGVfXywgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImRlZmF1bHRcIjogKCkgPT4gKC8qIGJpbmRpbmcgKi8gSW5zdGFuY2UpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfQmluZGluZ19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vQmluZGluZy5tanMgKi8gXCIuL3NyYy9tb2RlbHMvQmluZGluZy5tanNcIik7XG5cbmNsYXNzIEluc3RhbmNlIGV4dGVuZHMgX0JpbmRpbmdfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bXCJkZWZhdWx0XCJdIHt9XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vc3JjL21vZGVscy9SZXNvbHZlckJpbmRpbmcubWpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL21vZGVscy9SZXNvbHZlckJpbmRpbmcubWpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX19fd2VicGFja19tb2R1bGVfXywgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImRlZmF1bHRcIjogKCkgPT4gKC8qIGJpbmRpbmcgKi8gUmVzb2x2ZXJCaW5kaW5nKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX0JpbmRpbmdfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0JpbmRpbmcubWpzICovIFwiLi9zcmMvbW9kZWxzL0JpbmRpbmcubWpzXCIpO1xuXG5jbGFzcyBSZXNvbHZlckJpbmRpbmcgZXh0ZW5kcyBfQmluZGluZ19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcImRlZmF1bHRcIl0ge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIFJlc29sdmVyQmluZGluZy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJlc29sdmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmhhc1Jlc29sdmVkID0gZmFsc2U7XG4gICAgdGhpcy5fcmVzb2x2ZXIgPSByZXNvbHZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgdmFsdWUgb2YgdGhlIHJlc29sdmVyIHByb3BlcnR5LlxuICAgKlxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG4gIGdldCByZXNvbHZlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZXI7XG4gIH1cbn1cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9zcmMvbW9kZWxzL1NpbmdsZXRvbi5tanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9zcmMvbW9kZWxzL1NpbmdsZXRvbi5tanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfX193ZWJwYWNrX21vZHVsZV9fLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiZGVmYXVsdFwiOiAoKSA9PiAoLyogYmluZGluZyAqLyBTaW5nbGV0b24pXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfUmVzb2x2ZXJCaW5kaW5nX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9SZXNvbHZlckJpbmRpbmcubWpzICovIFwiLi9zcmMvbW9kZWxzL1Jlc29sdmVyQmluZGluZy5tanNcIik7XG5cbmNsYXNzIFNpbmdsZXRvbiBleHRlbmRzIF9SZXNvbHZlckJpbmRpbmdfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bXCJkZWZhdWx0XCJdIHtcbiAgLyoqXG4gICAqIFJlc29sdmUgYW5kIHJldHVybiB0aGUgdmFsdWUgb2YgdGhlIGJpbmRpbmcuXG4gICAqXG4gICAqIEBwYXJhbSAge0NvbnRhaW5lcn0gY29udGFpbmVyXG4gICAqIEByZXR1cm4ge2FueX1cbiAgICovXG4gIHJlc29sdmUoY29udGFpbmVyKSB7XG4gICAgaWYgKHRoaXMuaGFzUmVzb2x2ZWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmhhc1Jlc29sdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnJlc29sdmVyKGNvbnRhaW5lcik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG59XG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpXG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBUaGlzIGVudHJ5IG5lZWQgdG8gYmUgd3JhcHBlZCBpbiBhbiBJSUZFIGJlY2F1c2UgaXQgbmVlZCB0byBiZSBpc29sYXRlZCBhZ2FpbnN0IG90aGVyIG1vZHVsZXMgaW4gdGhlIGNodW5rLlxuKCgpID0+IHtcbi8qISoqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL2luZGV4Lm1qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKiovXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBDb250YWluZXI6ICgpID0+ICgvKiByZWV4cG9ydCBzYWZlICovIF9Db250YWluZXJfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18uQ29udGFpbmVyKSxcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgUHJvdmlkZXI6ICgpID0+ICgvKiByZWV4cG9ydCBzYWZlICovIF9Qcm92aWRlcl9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy5Qcm92aWRlciksXG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFNlcnZpY2U6ICgpID0+ICgvKiByZWV4cG9ydCBzYWZlICovIF9kZWNvcmF0b3JzX1NlcnZpY2VfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18uU2VydmljZSksXG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFNlcnZpY2VQcm92aWRlcjogKCkgPT4gKC8qIHJlZXhwb3J0IHNhZmUgKi8gX2RlY29yYXRvcnNfU2VydmljZVByb3ZpZGVyX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fLlNlcnZpY2VQcm92aWRlcilcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9Qcm92aWRlcl9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vUHJvdmlkZXIubWpzICovIFwiLi9zcmMvUHJvdmlkZXIubWpzXCIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9Db250YWluZXJfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0NvbnRhaW5lci5tanMgKi8gXCIuL3NyYy9Db250YWluZXIubWpzXCIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9kZWNvcmF0b3JzX1NlcnZpY2VfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2RlY29yYXRvcnMvU2VydmljZS5tanMgKi8gXCIuL3NyYy9kZWNvcmF0b3JzL1NlcnZpY2UubWpzXCIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9kZWNvcmF0b3JzX1NlcnZpY2VQcm92aWRlcl9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vZGVjb3JhdG9ycy9TZXJ2aWNlUHJvdmlkZXIubWpzICovIFwiLi9zcmMvZGVjb3JhdG9ycy9TZXJ2aWNlUHJvdmlkZXIubWpzXCIpO1xuXG5cblxuXG59KSgpO1xuXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfZXhwb3J0c19fO1xuLyoqKioqKi8gfSkoKVxuO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1EwRkJRenRCUVVORUxFODdPenM3T3pzN096czdPenM3T3pzN096czdPMEZEVm5sRE8wRkJRME03UVVGRFJUdEJRVU5GTzBGQlEzTkNPMEZCUTJJN1FVRkZhRVFzVFVGQlRVMHNVMEZCVXl4RFFVRkRPMFZCUTNKQ1F5eFhRVUZYUVN4RFFVRkJMRVZCUVVrN1NVRkRZaXhKUVVGSkxFTkJRVU5ETEZOQlFWTXNSMEZCUnl4SlFVRkpReXhIUVVGSExFTkJRVU1zUTBGQlF6dEpRVU14UWl4SlFVRkpMRU5CUVVORExGVkJRVlVzUjBGQlJ5eEpRVUZKUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRGUVVNM1FqczdSVUZGUVR0QlFVTkdPMEZCUTBFN1FVRkRRVHRCUVVOQk8wVkJRMFVzU1VGQlNVTXNVVUZCVVVFc1EwRkJRU3hGUVVGSk8wbEJRMlFzVDBGQlR5eEpRVUZKTEVOQlFVTktMRk5CUVZNN1JVRkRka0k3TzBWQlJVRTdRVUZEUmp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UlVGRFJVc3NVVUZCVVVFc1EwRkJSVU1zUjBGQlJ5eEZRVUZGUXl4TFFVRkxMRVZCUVVVN1NVRkRjRUlzU1VGQlNTeERRVUZEVUN4VFFVRlRMRU5CUVVOUkxFZEJRVWNzUTBGQlEwWXNSMEZCUnl4RlFVRkZMRWxCUVVsYUxEUkVRVUZSTEVOQlFVTmhMRXRCUVVzc1EwRkJReXhEUVVGRE8wbEJRelZETEU5QlFVOHNTVUZCU1R0RlFVTmlPenRGUVVWQk8wRkJRMFk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRGUVVORlJTeFRRVUZUUVN4RFFVRkZTQ3hIUVVGSExFVkJRVVZKTEZGQlFWRXNSVUZCUlR0SlFVTjRRaXhKUVVGSkxFTkJRVU5XTEZOQlFWTXNRMEZCUTFFc1IwRkJSeXhEUVVGRFJpeEhRVUZITEVWQlFVVXNTVUZCU1Znc05rUkJRVk1zUTBGQlEyVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1NVRkRhRVFzVDBGQlR5eEpRVUZKTzBWQlEySTdPMFZCUlVFN1FVRkRSanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMFZCUTBWRExFOUJRVTlCTEVOQlFVVk1MRWRCUVVjc1JVRkJSVWtzVVVGQlVTeEZRVUZGTzBsQlEzUkNMRWxCUVVrc1EwRkJRMVlzVTBGQlV5eERRVUZEVVN4SFFVRkhMRU5CUVVOR0xFZEJRVWNzUlVGQlJTeEpRVUZKWWl3eVJFRkJUeXhEUVVGRGFVSXNVVUZCVVN4RFFVRkRMRU5CUVVNN1NVRkRPVU1zVDBGQlR5eEpRVUZKTzBWQlEySTdPMFZCUlVFN1FVRkRSanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBWQlEwVkZMRWxCUVVsQkxFTkJRVVZPTEVkQlFVY3NSVUZCUlR0SlFVTlVMRWxCUVVrc1NVRkJTU3hEUVVGRFRpeFRRVUZUTEVOQlFVTmhMRWRCUVVjc1EwRkJRMUFzUjBGQlJ5eERRVUZETEVWQlFVVTdUVUZETTBJc1QwRkJUeXhKUVVGSkxFTkJRVU5PTEZOQlFWTXNRMEZCUTJNc1IwRkJSeXhEUVVGRFVpeEhRVUZITEVOQlFVTXNRMEZCUTFNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF6dEpRVU01UXp0SlFVTkJMRTFCUVUwc1NVRkJTVzVDTERCRlFVRnJRaXhEUVVGRFFTd3dSVUZCYTBJc1EwRkJRMjlDTEdWQlFXVXNSVUZCUlZZc1IwRkJSeXhEUVVGRE8wVkJRM1pGT3p0RlFVVkJPMEZCUTBZN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBWQlEwVlhMRkZCUVZGQkxFTkJRVVZETEdGQlFXRXNSVUZCUlR0SlFVTjJRaXhKUVVGSkxFVkJRVVZCTEdGQlFXRXNRMEZCUTBNc1UwRkJVeXhaUVVGWk0wSXNiVVJCUVZFc1EwRkJReXhGUVVGRkxFMUJRVTBzU1VGQlNVa3NNRVZCUVd0Q0xFTkJRVU5CTERCRlFVRnJRaXhEUVVGRGQwSXNZVUZCWVN4RlFVRkZSaXhoUVVGaExFTkJRVU03U1VGRGFra3NUVUZCVFVRc1VVRkJVU3hIUVVGSExFbEJRVWxETEdGQlFXRXNRMEZCUXl4SlFVRkpMRU5CUVVNN1NVRkRlRU5FTEZGQlFWRXNRMEZCUTBrc1VVRkJVU3hEUVVGRExFTkJRVU03U1VGRGJrSXNRMEZCUXl4SlFVRkpMRU5CUVVOdVFpeFZRVUZWTEVOQlFVTlhMRWRCUVVjc1EwRkJRMGtzVVVGQlVTeERRVUZETEVsQlFVa3NTVUZCU1N4RFFVRkRaaXhWUVVGVkxFTkJRVU52UWl4SFFVRkhMRU5CUVVOTUxGRkJRVkVzUTBGQlF6dEpRVU12UkN4UFFVRlBMRWxCUVVrN1JVRkRZanM3UlVGRlFUdEJRVU5HTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wVkJRMFZOTEV0QlFVdEJMRU5CUVVFc1JVRkJTVHRKUVVOUUxFbEJRVWtzUTBGQlEzWkNMRk5CUVZNc1EwRkJRM1ZDTEV0QlFVc3NRMEZCUXl4RFFVRkRPMGxCUTNSQ0xFbEJRVWtzUTBGQlEzSkNMRlZCUVZVc1EwRkJRM0ZDTEV0QlFVc3NRMEZCUXl4RFFVRkRPMGxCUTNaQ0xFOUJRVThzU1VGQlNUdEZRVU5pT3p0RlFVVkJPMEZCUTBZN1FVRkRRVHRCUVVOQk8wRkJRMEU3UlVGRFJVTXNWMEZCVjBFc1EwRkJSVU1zVVVGQlVTeEhRVUZITEVWQlFVVXNSVUZCUlR0SlFVTXhRaXhEUVVGRFFTeFJRVUZSTEVsQlFVa3NSVUZCUlN4RlFVRkZReXhQUVVGUExFTkJRVU5ETEVsQlFVa3NTVUZCU1R0TlFVTXZRaXhKUVVGSkxFTkJRVU5CTEVsQlFVa3NRMEZCUTBNc1VVRkJVU3hGUVVGRkxFMUJRVTBzU1VGQlNXaERMREJGUVVGclFpeERRVUZEUVN3d1JVRkJhMElzUTBGQlEybERMR3RDUVVGclFpeEZRVUZGUml4SlFVRkpMRU5CUVVNN1RVRkROMFlzU1VGQlNTeERRVUZEUnl4WlFVRlpMRU5CUVVOSUxFbEJRVWtzUlVGQlJVRXNTVUZCU1N4RFFVRkRPMGxCUXk5Q0xFTkJRVU1zUTBGQlF6dEpRVU5HTEU5QlFVOHNTVUZCU1R0RlFVTmlPMFZCUlVGSExGbEJRVmxCTEVOQlFVVkRMRWxCUVVrc1JVRkJSWGhDTEV0QlFVc3NSVUZCUlR0SlFVTjZRaXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZEVUN4VFFVRlRMRU5CUVVOaExFZEJRVWNzUTBGQlEydENMRWxCUVVrc1EwRkJReXhGUVVGRk8wMUJRemRDTEVsQlFVbDRRaXhMUVVGTExFTkJRVU54UWl4UlFVRlJMRWxCUVVseVFpeExRVUZMTEVOQlFVTnhRaXhSUVVGUkxFTkJRVU5KTEVsQlFVa3NTMEZCUzI1RExHbEZRVUZaTEVWQlFVVTdVVUZETVVRc1RVRkJUVzlETEZsQlFWa3NSMEZCUnpGQ0xFdEJRVXNzUTBGQlEzRkNMRkZCUVZFc1EwRkJRMHNzV1VGQldTeEpRVUZKTEVWQlFVVTdVVUZEZEVRc1MwRkJTeXhOUVVGTlRpeEpRVUZKTEVsQlFVbE5MRmxCUVZrc1JVRkJSVHRWUVVNdlFpeEpRVUZKTEVOQlFVTklMRmxCUVZrc1EwRkJRMGdzU1VGQlNTeERRVUZEY0VJc1MwRkJTeXhEUVVGRGNVSXNVVUZCVVN4SFFVRkhSQ3hKUVVGSkxFTkJRVU53UWl4TFFVRkxMRWRCUVVkdlFpeEpRVUZKTEVOQlFVTkpMRWxCUVVrc1JVRkJSVW9zU1VGQlNTeERRVUZEY0VJc1MwRkJTeXhEUVVGRE8xRkJRemRGTzFGQlEwRXNUVUZCVFRKQ0xFbEJRVWtzUjBGQlIwTXNUVUZCVFN4RFFVRkRReXhYUVVGWExFTkJRVU5JTEZsQlFWa3NRMEZCUTBrc1IwRkJSeXhEUVVGRFZpeEpRVUZKTEVsQlFVa3NRMEZCUTBFc1NVRkJTU3hEUVVGRFNTeEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRia0lzU1VGQlNTeERRVUZEWlN4SlFVRkpMRU5CUVVOd1FpeExRVUZMTEVOQlFVTnhRaXhSUVVGUkxFZEJRVWRFTEVsQlFVa3NRMEZCUTNCQ0xFdEJRVXNzUjBGQlIyOUNMRWxCUVVrc1EwRkJRMGtzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUXk5SUxFMUJRVTFQTEV0QlFVc3NSMEZCUnk5Q0xFdEJRVXM3VVVGRGJrSXNUVUZCVFVjc1VVRkJVU3hIUVVGSFFTeERRVUZCTEV0QlFVMHNTVUZCU1RSQ0xFdEJRVXNzUTBGQlEwb3NTVUZCU1N4RFFVRkRPMUZCUTNSRE0wSXNTMEZCU3l4RFFVRkRjVUlzVVVGQlVTeERRVUZEYmtJc1UwRkJVeXhIUVVGSExFbEJRVWtzUTBGQlEwRXNVMEZCVXl4RFFVRkRjMElzU1VGQlNTeEZRVUZGY2tJc1VVRkJVU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZEUXl4UFFVRlBMRU5CUVVOdlFpeEpRVUZKTEVWQlFVVnlRaXhSUVVGUkxFTkJRVU03VFVGRE1VWXNRMEZCUXl4TlFVRk5PMUZCUTB3c1NVRkJTU3hEUVVGRFRDeFJRVUZSTEVOQlFVTXdRaXhKUVVGSkxFVkJRVVY0UWl4TFFVRkxMRU5CUVVNN1RVRkROVUk3U1VGRFJqdEZRVU5HTzBGQlEwWTdPenM3T3pzN096czdPenM3TzBGRGNrbFBMRTFCUVUxbUxGRkJRVkVzUTBGQlF6dEZRVU53UWp0QlFVTkdPMEZCUTBFN1FVRkRRVHRCUVVOQk8wVkJRMFZQTEZkQlFWZEJMRU5CUVVWM1F5eFRRVUZUTEVWQlFVVTdTVUZEZEVJc1NVRkJTU3hEUVVGRFF5eFZRVUZWTEVkQlFVZEVMRk5CUVZNN1JVRkROMEk3UlVGRlFTeEpRVUZKUVN4VFFVRlRRU3hEUVVGQkxFVkJRVWs3U1VGRFppeFBRVUZQTEVsQlFVa3NRMEZCUTBNc1ZVRkJWVHRGUVVONFFqczdSVUZGUVR0QlFVTkdPMEZCUTBFN1JVRkRSVzVDTEZGQlFWRkJMRU5CUVVFc1JVRkJTU3hEUVVGRE96dEZRVVZpTzBGQlEwWTdRVUZEUVR0RlFVTkZiMElzU1VGQlNVRXNRMEZCUVN4RlFVRkpMRU5CUVVNN1FVRkRXRHM3T3pzN096czdPenM3T3pzN096czdPenM3TzBGRGRrSnhSVHRCUVVVNVJDeE5RVUZOTlVNc1dVRkJXU3hIUVVGSExGTkJRVk03UVVGRk9VSXNUVUZCVFRaRExFOUJRVThzUjBGQlNXNURMRXRCUVVzc1NVRkJTenRGUVVOb1F5eEpRVUZKTEVOQlFVTkJMRXRCUVVzc1JVRkJSU3hOUVVGTkxFbEJRVWxZTERCRlFVRnJRaXhEUVVGRFFTd3dSVUZCYTBJc1EwRkJReXRETEc5Q1FVRnZRaXhEUVVGRE8wVkJRMnBHTEU5QlFWRkRMRTFCUVUwc1NVRkJTenRKUVVOcVFrRXNUVUZCVFN4RFFVRkRhRUlzVVVGQlVTeEhRVUZCYVVJc1lVRkJRU3hEUVVGQlFTeGhRVUZCTEV0QlFWRjBReXhMUVVGTE8wMUJRVVY1UWl4SlFVRkpMRVZCUVVWdVF6dEpRVUZaTEVWQlFVVTdSVUZEY0VRc1EwRkJRenRCUVVOSUxFTkJRVU03T3pzN096czdPenM3T3pzN096czdPenM3T3p0QlExUnZSVHRCUVVVNVJDeE5RVUZOYVVRc2NVSkJRWEZDTEVkQlFVY3NhMEpCUVd0Q08wRkJSV2hFTEUxQlFVMURMR1ZCUVdVc1IwRkJTWGhETEV0QlFVc3NTVUZCU3p0RlFVTjRReXhKUVVGSkxFTkJRVU5CTEV0QlFVc3NSVUZCUlN4TlFVRk5MRWxCUVVsWUxEQkZRVUZyUWl4RFFVRkRRU3d3UlVGQmEwSXNRMEZCUXl0RExHOUNRVUZ2UWl4RFFVRkRPMFZCUTJwR0xFOUJRVkZETEUxQlFVMHNTVUZCU3p0SlFVTnFRa0VzVFVGQlRTeERRVUZEYUVJc1VVRkJVU3hIUVVGQmFVSXNZVUZCUVN4RFFVRkJRU3hoUVVGQkxFdEJRVkYwUXl4TFFVRkxPMDFCUVVWNVFpeEpRVUZKTEVWQlFVVmpPMGxCUVhGQ0xFVkJRVVU3UlVGRE4wUXNRMEZCUXp0QlFVTklMRU5CUVVNN096czdPenM3T3pzN096czdPMEZEVkdNc1RVRkJUV3hFTEd0Q1FVRnJRaXhUUVVGVGIwUXNTMEZCU3l4RFFVRkRPMFZCUTNCRUxGZEJRVmRETEZkQlFWZEJMRU5CUVVFc1JVRkJTVHRKUVVGRkxFOUJRVThzVVVGQlVUdEZRVUZETzBWQlF6VkRMRmRCUVZjM1FpeGhRVUZoUVN4RFFVRkJMRVZCUVVrN1NVRkJSU3hQUVVGUExGVkJRVlU3UlVGQlF6dEZRVU5vUkN4WFFVRlhTaXhsUVVGbFFTeERRVUZCTEVWQlFVazdTVUZCUlN4UFFVRlBMRmxCUVZrN1JVRkJRenRGUVVOd1JDeFhRVUZYWVN4clFrRkJhMEpCTEVOQlFVRXNSVUZCU1R0SlFVRkZMRTlCUVU4c1pVRkJaVHRGUVVGRE8wVkJRekZFTEZkQlFWZGpMRzlDUVVGdlFrRXNRMEZCUVN4RlFVRkpPMGxCUVVVc1QwRkJUeXhwUWtGQmFVSTdSVUZCUXp0RlFVTTVSQ3hYUVVGWFR5eHpRa0ZCYzBKQkxFTkJRVUVzUlVGQlNUdEpRVUZGTEU5QlFVOHNiVUpCUVcxQ08wVkJRVU03UlVGRmJFVnVSQ3hYUVVGWFFTeERRVUZGYVVNc1NVRkJTU3hGUVVGRmJVSXNUMEZCVHl4RlFVRkZPMGxCUXpGQ0xFdEJRVXNzUTBGQlF5eERRVUZETzBsQlExQXNTVUZCU1N4RFFVRkRia0lzU1VGQlNTeEhRVUZIUVN4SlFVRkpPMGxCUTJoQ0xFbEJRVWtzUTBGQlEwUXNTVUZCU1N4SFFVRkhMREJDUVVFd1FqdEpRVU4wUXl4SlFVRkpMRU5CUVVOdlFpeFBRVUZQTEVkQlFVY3NTVUZCU1N4RFFVRkRReXhWUVVGVkxFTkJRVU53UWl4SlFVRkpMRVZCUVVWdFFpeFBRVUZQTEVOQlFVTTdSVUZETDBNN1JVRkZRVU1zVlVGQlZVRXNRMEZCUlhCQ0xFbEJRVWtzUlVGQlJXMUNMRTlCUVU4c1JVRkJSVHRKUVVONlFpeE5RVUZOUlN4UlFVRlJMRWRCUVVjN1RVRkRaaXhEUVVGRGVrUXNhMEpCUVd0Q0xFTkJRVU54UkN4WFFVRlhMRWRCUVVjc05rSkJRVFpDTzAxQlF5OUVMRU5CUVVOeVJDeHJRa0ZCYTBJc1EwRkJRMjlDTEdWQlFXVXNSMEZCUnl4SlFVRkpMRU5CUVVOelF5eHZRa0ZCYjBJc1EwRkJRMGdzVDBGQlR5eERRVUZETzAxQlEzaEZMRU5CUVVOMlJDeHJRa0ZCYTBJc1EwRkJRM05FTEhOQ1FVRnpRaXhIUVVGSkxGZEJRVlZETEU5QlFWRXNZMEZCWVR0TlFVTTNSU3hEUVVGRGRrUXNhMEpCUVd0Q0xFTkJRVU1yUXl4dlFrRkJiMElzUjBGQlJ5eG5SRUZCWjBRN1RVRkRNMFlzUTBGQlF5OURMR3RDUVVGclFpeERRVUZEZDBJc1lVRkJZU3hIUVVGSkxHTkJRV0VyUWl4UFFVRlJMSGxFUVVGM1JEdE5RVU5zU0N4RFFVRkRka1FzYTBKQlFXdENMRU5CUVVOcFF5eHJRa0ZCYTBJc1IwRkJTU3hUUVVGUmMwSXNUMEZCVVR0SlFVTTFSQ3hEUVVGRE8wbEJRMFFzVDBGQlQwVXNVVUZCVVN4RFFVRkRja0lzU1VGQlNTeERRVUZETEVsQlFVa3NkVUpCUVhWQ08wVkJRMnhFTzBWQlJVRnpRaXh2UWtGQmIwSkJMRU5CUVVWb1JDeEhRVUZITEVWQlFVVTdTVUZEZWtJc1NVRkJTVU1zUzBGQlN5eEhRVUZITEVWQlFVVTdTVUZGWkN4UlFVRlJMRWxCUVVrN1RVRkRXaXhMUVVGTFJDeEhRVUZITEV0QlFVdHBSQ3hUUVVGVE8xRkJRM0JDYUVRc1MwRkJTeXhIUVVGSExGZEJRVmM3VVVGRGJrSTdUVUZEUml4TFFVRkxSQ3hIUVVGSExFdEJRVXNzU1VGQlNUdFJRVU5tUXl4TFFVRkxMRWRCUVVjc1RVRkJUVHRSUVVOa08wMUJRMFlzUzBGQlN5eFBRVUZQUkN4SFFVRkhMRXRCUVVzc1ZVRkJWVHRSUVVGRk8xVkJRemxDTEUxQlFVMXJSQ3hSUVVGUkxFZEJRVWRzUkN4SFFVRkhMRU5CUVVONVFpeEpRVUZKTEVkQlFVa3NTMEZCU1hwQ0xFZEJRVWNzUTBGQlEzbENMRWxCUVVzc1JVRkJReXhIUVVGSExFVkJRVVU3VlVGRGFFUjRRaXhMUVVGTExFZEJRVWtzV1VGQlYybEVMRkZCUVZNc1IwRkJSVHRWUVVNdlFqdFJRVU5HTzAxQlEwRXNTMEZCU3l4UFFVRlBiRVFzUjBGQlJ5eExRVUZMTEZGQlFWRTdVVUZCUlR0VlFVTTFRa01zUzBGQlN5eEhRVUZKTEZsQlFWZEVMRWRCUVVjc1EwRkJRMUFzVjBGQlZ5eERRVUZEWjBNc1NVRkJTeXhIUVVGRk8xVkJRek5ETzFGQlEwWTdUVUZEUVN4TFFVRkxMRTlCUVU5NlFpeEhRVUZITEV0QlFVc3NVVUZCVVR0UlFVTXhRa01zUzBGQlN5eEhRVUZKTEZGQlFVOHNUMEZCVDBRc1IwRkJTU3h4UWtGQmIwSkJMRWRCUVVrc1IwRkJSVHRSUVVOeVJEdE5RVU5HTEV0QlFVc3NUMEZCVDBFc1IwRkJSeXhMUVVGTExGRkJRVkU3VVVGRE1VSkRMRXRCUVVzc1IwRkJSMFFzUjBGQlJ5eERRVUZEYlVRc1VVRkJVU3hEUVVGRExFTkJRVU03VVVGRGRFSTdUVUZEUmp0UlFVTkZiRVFzUzBGQlN5eEhRVUZKTEZGQlFVOHNUMEZCVDBRc1IwRkJTU3h2UWtGQmJVSkJMRWRCUVVrc1JVRkJRenRSUVVOdVJEdEpRVU5HTzBsQlJVRXNUMEZCVVN3MlEwRkJORU5ETEV0QlFVMHNPRUpCUVRaQ08wVkJRM3BHTzBGQlEwWTdPenM3T3pzN096czdPenM3TzBGRE0wUmxMRTFCUVUxdFJDeFBRVUZQTEVOQlFVTTdSVUZETTBJN1FVRkRSanRCUVVOQk8wRkJRMEU3UVVGRFFUdEZRVU5GTTBRc1YwRkJWMEVzUTBGQlJWRXNTMEZCU3l4SFFVRkhMRWxCUVVrc1JVRkJSVHRKUVVONlFpeEpRVUZKTEVOQlFVTkJMRXRCUVVzc1IwRkJSMEVzUzBGQlN6dEZRVU53UWpzN1JVRkZRVHRCUVVOR08wRkJRMEU3UVVGRFFUdEJRVU5CTzBWQlEwVlJMRTlCUVU5QkxFTkJRVUVzUlVGQlNUdEpRVU5VTEU5QlFVOHNTVUZCU1N4RFFVRkRVaXhMUVVGTE8wVkJRMjVDTzBGQlEwWTdPenM3T3pzN096czdPenM3T3p0QlEyeENiVVE3UVVGRmNFTXNUVUZCVFdRc1QwRkJUeXhUUVVGVGEwVXNORVJCUVdVc1EwRkJRenRGUVVOdVJEdEJRVU5HTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1JVRkRSVFZETEU5QlFVOUJMRU5CUVVWM1FpeFRRVUZUTEVWQlFVVTdTVUZEYkVJc1NVRkJTU3hEUVVGRGNVSXNWMEZCVnl4SFFVRkhMRWxCUVVrN1NVRkRka0lzVDBGQlR5eEpRVUZKTEVOQlFVTnNSQ3hSUVVGUkxFTkJRVU0yUWl4VFFVRlRMRU5CUVVNN1JVRkRha003UVVGRFJqczdPenM3T3pzN096czdPenM3TzBGRFltMURPMEZCUlhCQ0xFMUJRVTAzUXl4UlFVRlJMRk5CUVZOblJTeHZSRUZCVHl4RFFVRkRPenM3T3pzN096czdPenM3T3pzN1FVTkdXRHRCUVVWd1FpeE5RVUZOUXl4bFFVRmxMRk5CUVZORUxHOUVRVUZQTEVOQlFVTTdSVUZEYmtRN1FVRkRSanRCUVVOQk8wRkJRMEU3UVVGRFFUdEZRVU5GTTBRc1YwRkJWMEVzUTBGQlJWY3NVVUZCVVN4RlFVRkZPMGxCUTNKQ0xFdEJRVXNzUTBGQlF5eERRVUZETzBsQlExQXNTVUZCU1N4RFFVRkRhMFFzVjBGQlZ5eEhRVUZITEV0QlFVczdTVUZEZUVJc1NVRkJTU3hEUVVGRFF5eFRRVUZUTEVkQlFVZHVSQ3hSUVVGUk8wVkJRek5DT3p0RlFVVkJPMEZCUTBZN1FVRkRRVHRCUVVOQk8wRkJRMEU3UlVGRFJTeEpRVUZKUVN4UlFVRlJRU3hEUVVGQkxFVkJRVWs3U1VGRFpDeFBRVUZQTEVsQlFVa3NRMEZCUTIxRUxGTkJRVk03UlVGRGRrSTdRVUZEUmpzN096czdPenM3T3pzN096czdPMEZEZEVKdFJEdEJRVVZ3UXl4TlFVRk5iRVVzVTBGQlV5eFRRVUZUWjBVc05FUkJRV1VzUTBGQlF6dEZRVU55UkR0QlFVTkdPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UlVGRFJUVkRMRTlCUVU5QkxFTkJRVVYzUWl4VFFVRlRMRVZCUVVVN1NVRkRiRUlzU1VGQlNTeEpRVUZKTEVOQlFVTnhRaXhYUVVGWExFdEJRVXNzUzBGQlN5eEZRVUZGTzAxQlF6bENMRWxCUVVrc1EwRkJRMEVzVjBGQlZ5eEhRVUZITEVsQlFVazdUVUZEZGtJc1NVRkJTU3hEUVVGRGNrUXNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJRMGNzVVVGQlVTeERRVUZETmtJc1UwRkJVeXhEUVVGRE8wbEJRM1pETzBsQlJVRXNUMEZCVHl4SlFVRkpMRU5CUVVOb1F5eExRVUZMTzBWQlEyNUNPMEZCUTBZN096czdPenRWUTJwQ1FUdFZRVU5CT3p0VlFVVkJPMVZCUTBFN1ZVRkRRVHRWUVVOQk8xVkJRMEU3VlVGRFFUdFZRVU5CTzFWQlEwRTdWVUZEUVR0VlFVTkJPMVZCUTBFN1ZVRkRRVHRWUVVOQk96dFZRVVZCTzFWQlEwRTdPMVZCUlVFN1ZVRkRRVHRWUVVOQk96czdPenRYUTNSQ1FUdFhRVU5CTzFkQlEwRTdWMEZEUVR0WFFVTkJMSGxEUVVGNVF5eDNRMEZCZDBNN1YwRkRha1k3VjBGRFFUdFhRVU5CT3pzN096dFhRMUJCT3pzN096dFhRMEZCTzFkQlEwRTdWMEZEUVR0WFFVTkJMSFZFUVVGMVJDeHBRa0ZCYVVJN1YwRkRlRVU3VjBGRFFTeG5SRUZCWjBRc1lVRkJZVHRYUVVNM1JEczdPenM3T3pzN096czdPenM3T3pzN096czdPMEZEVG5sRE8wRkJRMFU3UVVGRFR5SXNJbk52ZFhKalpYTWlPbHNpZDJWaWNHRmphem92TDA1dmIwTnZiblJoYVc1bGNpOTNaV0p3WVdOckwzVnVhWFpsY25OaGJFMXZaSFZzWlVSbFptbHVhWFJwYjI0aUxDSjNaV0p3WVdOck9pOHZUbTl2UTI5dWRHRnBibVZ5THk0dmMzSmpMME52Ym5SaGFXNWxjaTV0YW5NaUxDSjNaV0p3WVdOck9pOHZUbTl2UTI5dWRHRnBibVZ5THk0dmMzSmpMMUJ5YjNacFpHVnlMbTFxY3lJc0luZGxZbkJoWTJzNkx5OU9iMjlEYjI1MFlXbHVaWEl2TGk5emNtTXZaR1ZqYjNKaGRHOXljeTlUWlhKMmFXTmxMbTFxY3lJc0luZGxZbkJoWTJzNkx5OU9iMjlEYjI1MFlXbHVaWEl2TGk5emNtTXZaR1ZqYjNKaGRHOXljeTlUWlhKMmFXTmxVSEp2ZG1sa1pYSXViV3B6SWl3aWQyVmljR0ZqYXpvdkwwNXZiME52Ym5SaGFXNWxjaTh1TDNOeVl5OWxlR05sY0hScGIyNXpMME52Ym5SaGFXNWxja1Y0WTJWd2RHbHZiaTV0YW5NaUxDSjNaV0p3WVdOck9pOHZUbTl2UTI5dWRHRnBibVZ5THk0dmMzSmpMMjF2WkdWc2N5OUNhVzVrYVc1bkxtMXFjeUlzSW5kbFluQmhZMnM2THk5T2IyOURiMjUwWVdsdVpYSXZMaTl6Y21NdmJXOWtaV3h6TDBaaFkzUnZjbmt1Yldweklpd2lkMlZpY0dGamF6b3ZMMDV2YjBOdmJuUmhhVzVsY2k4dUwzTnlZeTl0YjJSbGJITXZTVzV6ZEdGdVkyVXViV3B6SWl3aWQyVmljR0ZqYXpvdkwwNXZiME52Ym5SaGFXNWxjaTh1TDNOeVl5OXRiMlJsYkhNdlVtVnpiMngyWlhKQ2FXNWthVzVuTG0xcWN5SXNJbmRsWW5CaFkyczZMeTlPYjI5RGIyNTBZV2x1WlhJdkxpOXpjbU12Ylc5a1pXeHpMMU5wYm1kc1pYUnZiaTV0YW5NaUxDSjNaV0p3WVdOck9pOHZUbTl2UTI5dWRHRnBibVZ5TDNkbFluQmhZMnN2WW05dmRITjBjbUZ3SWl3aWQyVmljR0ZqYXpvdkwwNXZiME52Ym5SaGFXNWxjaTkzWldKd1lXTnJMM0oxYm5ScGJXVXZaR1ZtYVc1bElIQnliM0JsY25SNUlHZGxkSFJsY25NaUxDSjNaV0p3WVdOck9pOHZUbTl2UTI5dWRHRnBibVZ5TDNkbFluQmhZMnN2Y25WdWRHbHRaUzlvWVhOUGQyNVFjbTl3WlhKMGVTQnphRzl5ZEdoaGJtUWlMQ0ozWldKd1lXTnJPaTh2VG05dlEyOXVkR0ZwYm1WeUwzZGxZbkJoWTJzdmNuVnVkR2x0WlM5dFlXdGxJRzVoYldWemNHRmpaU0J2WW1wbFkzUWlMQ0ozWldKd1lXTnJPaTh2VG05dlEyOXVkR0ZwYm1WeUx5NHZjM0pqTDJsdVpHVjRMbTFxY3lKZExDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW9ablZ1WTNScGIyNGdkMlZpY0dGamExVnVhWFpsY25OaGJFMXZaSFZzWlVSbFptbHVhWFJwYjI0b2NtOXZkQ3dnWm1GamRHOXllU2tnZTF4dVhIUnBaaWgwZVhCbGIyWWdaWGh3YjNKMGN5QTlQVDBnSjI5aWFtVmpkQ2NnSmlZZ2RIbHdaVzltSUcxdlpIVnNaU0E5UFQwZ0oyOWlhbVZqZENjcFhHNWNkRngwYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtWVdOMGIzSjVLQ2s3WEc1Y2RHVnNjMlVnYVdZb2RIbHdaVzltSUdSbFptbHVaU0E5UFQwZ0oyWjFibU4wYVc5dUp5QW1KaUJrWldacGJtVXVZVzFrS1Z4dVhIUmNkR1JsWm1sdVpTaGJYU3dnWm1GamRHOXllU2s3WEc1Y2RHVnNjMlVnYVdZb2RIbHdaVzltSUdWNGNHOXlkSE1nUFQwOUlDZHZZbXBsWTNRbktWeHVYSFJjZEdWNGNHOXlkSE5iWENKT2IyOURiMjUwWVdsdVpYSmNJbDBnUFNCbVlXTjBiM0o1S0NrN1hHNWNkR1ZzYzJWY2JseDBYSFJ5YjI5MFcxd2lUbTl2UTI5dWRHRnBibVZ5WENKZElEMGdabUZqZEc5eWVTZ3BPMXh1ZlNrb2RHaHBjeXdnS0NrZ1BUNGdlMXh1Y21WMGRYSnVJQ0lzSW1sdGNHOXlkQ0I3SUZCeWIzWnBaR1Z5SUgwZ1puSnZiU0FuTGk5UWNtOTJhV1JsY2k1dGFuTW5YRzVwYlhCdmNuUWdSbUZqZEc5eWVTQm1jbTl0SUNjdUwyMXZaR1ZzY3k5R1lXTjBiM0o1TG0xcWN5ZGNibWx0Y0c5eWRDQkpibk4wWVc1alpTQm1jbTl0SUNjdUwyMXZaR1ZzY3k5SmJuTjBZVzVqWlM1dGFuTW5YRzVwYlhCdmNuUWdVMmx1WjJ4bGRHOXVJR1p5YjIwZ0p5NHZiVzlrWld4ekwxTnBibWRzWlhSdmJpNXRhbk1uWEc1cGJYQnZjblFnUTI5dWRHRnBibVZ5UlhoalpYQjBhVzl1SUdaeWIyMGdKeTR2WlhoalpYQjBhVzl1Y3k5RGIyNTBZV2x1WlhKRmVHTmxjSFJwYjI0dWJXcHpKMXh1YVcxd2IzSjBJSHNnVTBWU1ZrbERSVjlVV1ZCRklIMGdabkp2YlNBbkxpOWtaV052Y21GMGIzSnpMMU5sY25acFkyVXViV3B6SjF4dVhHNWxlSEJ2Y25RZ1kyeGhjM01nUTI5dWRHRnBibVZ5SUh0Y2JpQWdZMjl1YzNSeWRXTjBiM0lnS0NrZ2UxeHVJQ0FnSUhSb2FYTXVYMkpwYm1ScGJtZHpJRDBnYm1WM0lFMWhjQ2dwWEc0Z0lDQWdkR2hwY3k1ZmNISnZkbWxrWlhKeklEMGdibVYzSUZObGRDZ3BYRzRnSUgxY2JseHVJQ0F2S2lwY2JpQWdJQ29nVW1WMGNtbGxkbVVnZEdobElIWmhiSFZsSUc5bUlIUm9aU0JpYVc1a2FXNW5jeUJ3Y205d1pYSjBlUzVjYmlBZ0lDcGNiaUFnSUNvZ1FISmxkSFZ5YmlCN1FtbHVaR2x1WjMxY2JpQWdJQ292WEc0Z0lHZGxkQ0JpYVc1a2FXNW5jeUFvS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFJvYVhNdVgySnBibVJwYm1kelhHNGdJSDFjYmx4dUlDQXZLaXBjYmlBZ0lDb2dRbWx1WkNCaElITnBibWRzWlNCcGJuTjBZVzVqWlNCdmNpQjJZV3gxWlNCcGJuUnZJSFJvWlNCamIyNTBZV2x1WlhJZ2RXNWtaWElnZEdobElIQnliM1pwWkdWa0lHdGxlUzVjYmlBZ0lDcGNiaUFnSUNvZ1FIQmhjbUZ0SUNCN1lXNTVmU0JyWlhsY2JpQWdJQ29nUUhCaGNtRnRJQ0I3WVc1NWZTQjJZV3gxWlZ4dUlDQWdLaUJBY21WMGRYSnVJSHQwYUdsemZWeHVJQ0FnS2k5Y2JpQWdhVzV6ZEdGdVkyVWdLR3RsZVN3Z2RtRnNkV1VwSUh0Y2JpQWdJQ0IwYUdsekxsOWlhVzVrYVc1bmN5NXpaWFFvYTJWNUxDQnVaWGNnU1c1emRHRnVZMlVvZG1Gc2RXVXBLVnh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpYRzRnSUgxY2JseHVJQ0F2S2lwY2JpQWdJQ29nUW1sdVpDQmhJSEpsYzI5c2RtVnlJR1oxYm1OMGFXOXVJR2x1ZEc4Z2RHaGxJR052Ym5SaGFXNWxjaUIxYm1SbGNpQjBhR1VnY0hKdmRtbGtaV1FnYTJWNUxpQlVhR1ZjYmlBZ0lDb2djbVZ6YjJ4MlpYSWdkMmxzYkNCaVpTQnlkVzRnYjI1alpTQmhibVFnZEdobElISmxjM1ZzZEdsdVp5QjJZV3gxWlNCM2FXeHNJR0psSUhKbGRIVnlibVZrSUdadmNpQmhiR3hjYmlBZ0lDb2djM1ZpYzJWeGRXVnVkQ0J5WlhOdmJIVjBhVzl1Y3k1Y2JpQWdJQ3BjYmlBZ0lDb2dRSEJoY21GdElDQjdZVzU1ZlNBZ0lDQWdJR3RsZVZ4dUlDQWdLaUJBY0dGeVlXMGdJSHRTWlhOdmJIWmxjbjBnY21WemIyeDJaWEpjYmlBZ0lDb2dRSEpsZEhWeWJpQjdkR2hwYzMxY2JpQWdJQ292WEc0Z0lITnBibWRzWlhSdmJpQW9hMlY1TENCeVpYTnZiSFpsY2lrZ2UxeHVJQ0FnSUhSb2FYTXVYMkpwYm1ScGJtZHpMbk5sZENoclpYa3NJRzVsZHlCVGFXNW5iR1YwYjI0b2NtVnpiMngyWlhJcEtWeHVJQ0FnSUhKbGRIVnliaUIwYUdselhHNGdJSDFjYmx4dUlDQXZLaXBjYmlBZ0lDb2dRbWx1WkNCaElISmxjMjlzZG1WeUlHWjFibU4wYVc5dUlHbHVkRzhnZEdobElHTnZiblJoYVc1bGNpQjFibVJsY2lCMGFHVWdjSEp2ZG1sa1pXUWdhMlY1TGlCVWFHVmNiaUFnSUNvZ2NtVnpiMngyWlhJZ2QybHNiQ0JpWlNCeWRXNGdaV0ZqYUNCMGFXMWxJSFJvWlNCclpYa2dhWE1nY21WemIyeDJaV1FnY21WemRXeDBhVzVuSUdsdUlHNWxkMXh1SUNBZ0tpQnBibk4wWVc1alpYTWdaV0ZqYUNCeVpYTnZiSFYwYVc5dUxseHVJQ0FnS2x4dUlDQWdLaUJBY0dGeVlXMGdJSHRoYm5sOUlDQWdJQ0FnYTJWNVhHNGdJQ0FxSUVCd1lYSmhiU0FnZTFKbGMyOXNkbVZ5ZlNCeVpYTnZiSFpsY2x4dUlDQWdLaUJBY21WMGRYSnVJSHQwYUdsemZWeHVJQ0FnS2k5Y2JpQWdZbWx1WkdsdVp5QW9hMlY1TENCeVpYTnZiSFpsY2lrZ2UxeHVJQ0FnSUhSb2FYTXVYMkpwYm1ScGJtZHpMbk5sZENoclpYa3NJRzVsZHlCR1lXTjBiM0o1S0hKbGMyOXNkbVZ5S1NsY2JpQWdJQ0J5WlhSMWNtNGdkR2hwYzF4dUlDQjlYRzVjYmlBZ0x5b3FYRzRnSUNBcUlGSmxjMjlzZG1VZ1lTQjJZV3gxWlNCbWNtOXRJSFJvWlNCamIyNTBZV2x1WlhJZ1lua2dhWFJ6SUd0bGVTNWNiaUFnSUNwY2JpQWdJQ29nUUhCaGNtRnRJQ0I3WVc1NWZTQnJaWGxjYmlBZ0lDb2dRSEpsZEhWeWJpQjdZVzU1ZlZ4dUlDQWdLaTljYmlBZ2JXRnJaU0FvYTJWNUtTQjdYRzRnSUNBZ2FXWWdLSFJvYVhNdVgySnBibVJwYm1kekxtaGhjeWhyWlhrcEtTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z2RHaHBjeTVmWW1sdVpHbHVaM011WjJWMEtHdGxlU2t1Y21WemIyeDJaU2gwYUdsektWeHVJQ0FnSUgxY2JpQWdJQ0IwYUhKdmR5QnVaWGNnUTI5dWRHRnBibVZ5UlhoalpYQjBhVzl1S0VOdmJuUmhhVzVsY2tWNFkyVndkR2x2Ymk1U1JWTlBURlZVU1U5T1gxUlpVRVVzSUd0bGVTbGNiaUFnZlZ4dVhHNGdJQzhxS2x4dUlDQWdLaUJCWkdRZ1lTQnpaWEoyYVdObElIQnliM1pwWkdWeUlHbHVkRzhnZEdobElHTnZiblJoYVc1bGNpQjBieUJ5WldkcGMzUmxjaUJ2Ym1VZ2IzSWdiV0Z1ZVNCaWFXNWthVzVuYzF4dUlDQWdLaUJoY3lCaElIVnVhWFF1WEc0Z0lDQXFYRzRnSUNBcUlFQndZWEpoYlNBZ2UxQnliM1pwWkdWeWZTQndjbTkyYVdSbGNseHVJQ0FnS2lCQWNtVjBkWEp1SUh0MGFHbHpmVnh1SUNBZ0tpOWNiaUFnY0hKdmRtbGtaWElnS0ZCeWIzWnBaR1Z5UTJ4aGMzTXBJSHRjYmlBZ0lDQnBaaUFvSVNoUWNtOTJhV1JsY2tOc1lYTnpMbkJ5YjNSdmRIbHdaU0JwYm5OMFlXNWpaVzltSUZCeWIzWnBaR1Z5S1NrZ2RHaHliM2NnYm1WM0lFTnZiblJoYVc1bGNrVjRZMlZ3ZEdsdmJpaERiMjUwWVdsdVpYSkZlR05sY0hScGIyNHVVRkpQVmtsRVJWSmZWRmxRUlN3Z1VISnZkbWxrWlhKRGJHRnpjeWxjYmlBZ0lDQmpiMjV6ZENCd2NtOTJhV1JsY2lBOUlHNWxkeUJRY205MmFXUmxja05zWVhOektIUm9hWE1wWEc0Z0lDQWdjSEp2ZG1sa1pYSXVjbVZuYVhOMFpYSW9LVnh1SUNBZ0lDRjBhR2x6TGw5d2NtOTJhV1JsY25NdWFHRnpLSEJ5YjNacFpHVnlLU0FtSmlCMGFHbHpMbDl3Y205MmFXUmxjbk11WVdSa0tIQnliM1pwWkdWeUtWeHVJQ0FnSUhKbGRIVnliaUIwYUdselhHNGdJSDFjYmx4dUlDQXZLaXBjYmlBZ0lDb2dVbVZ6WlhRZ2RHaGxJR052Ym5SaGFXNWxjaUJ6YnlCMGFHRjBJR0ZzYkNCbVlXdGxJR0pwYm1ScGJtZHpJR0Z5WlNCeVpXMXZkbVZrSUdGdVpDQmhiR3dnYjNKcFoybHVZV3hjYmlBZ0lDb2dZbWx1WkdsdVozTWdkMmxzYkNCaVpTQjFjMlZrSUhkb1pXNGdjbVZ4ZFdWemRHVmtMaUJKWmlCaElHaGhjbVFnY21WeGRXVnpkQ0JwY3lCeWRXNHNJSFJvWlc0Z1ltOTBhRnh1SUNBZ0tpQjBhR1VnWm1GclpYTWdZVzVrSUhSb1pTQmlhVzVrYVc1bmN5QjNhV3hzSUdKbElHTnNaV0Z5WldRdVhHNGdJQ0FxWEc0Z0lDQXFJRUJ3WVhKaGJTQWdlMkp2YjJ4bFlXNTlJR2hoY21SY2JpQWdJQ29nUUhKbGRIVnliaUI3ZEdocGMzMWNiaUFnSUNvdlhHNGdJR05zWldGeUlDZ3BJSHRjYmlBZ0lDQjBhR2x6TGw5aWFXNWthVzVuY3k1amJHVmhjaWdwWEc0Z0lDQWdkR2hwY3k1ZmNISnZkbWxrWlhKekxtTnNaV0Z5S0NsY2JpQWdJQ0J5WlhSMWNtNGdkR2hwYzF4dUlDQjlYRzVjYmlBZ0x5b3FYRzRnSUNBcUlFRjFkRzhnUkdselkyOTJaWElnYzJWeWRtbGpaWE5jYmlBZ0lDcGNiaUFnSUNvZ1FISmxkSFZ5YmlCN2RHaHBjMzFjYmlBZ0lDb3ZYRzRnSUdScGMyTnZkbVZ5YVc1bklDaHpaWEoyYVdObGN5QTlJRnRkS1NCN1hHNGdJQ0FnS0hObGNuWnBZMlZ6SUQ4L0lGdGRLUzVtYjNKRllXTm9LR2wwWlcwZ1BUNGdlMXh1SUNBZ0lDQWdhV1lnS0NGcGRHVnRMbTFsZEdGa1lYUmhLU0IwYUhKdmR5QnVaWGNnUTI5dWRHRnBibVZ5UlhoalpYQjBhVzl1S0VOdmJuUmhhVzVsY2tWNFkyVndkR2x2Ymk1T1QxUmZRVjlUUlZKV1NVTkZYMVJaVUVVc0lHbDBaVzBwWEc0Z0lDQWdJQ0IwYUdsekxsOWhkWFJ2UW1sdVpHbHVaeWhwZEdWdExDQnBkR1Z0S1Z4dUlDQWdJSDBwWEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE5jYmlBZ2ZWeHVYRzRnSUY5aGRYUnZRbWx1WkdsdVp5QW9ibUZ0WlN3Z2RtRnNkV1VwSUh0Y2JpQWdJQ0JwWmlBb0lYUm9hWE11WDJKcGJtUnBibWR6TG1oaGN5aHVZVzFsS1NrZ2UxeHVJQ0FnSUNBZ2FXWWdLSFpoYkhWbExtMWxkR0ZrWVhSaElDWW1JSFpoYkhWbExtMWxkR0ZrWVhSaExuUjVjR1VnUFQwOUlGTkZVbFpKUTBWZlZGbFFSU2tnZTF4dUlDQWdJQ0FnSUNCamIyNXpkQ0JrWlhCbGJtUmxibU5wWlhNZ1BTQjJZV3gxWlM1dFpYUmhaR0YwWVM1a1pYQmxibVJsYm1OcFpYTWdQejhnVzExY2JpQWdJQ0FnSUNBZ1ptOXlJQ2hqYjI1emRDQnBkR1Z0SUc5bUlHUmxjR1Z1WkdWdVkybGxjeWtnZTF4dUlDQWdJQ0FnSUNBZ0lIUm9hWE11WDJGMWRHOUNhVzVrYVc1bktHbDBaVzB1ZG1Gc2RXVXViV1YwWVdSaGRHRWdQeUJwZEdWdExuWmhiSFZsSURvZ2FYUmxiUzV1WVcxbExDQnBkR1Z0TG5aaGJIVmxLVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJR1JsY0hNZ1BTQlBZbXBsWTNRdVpuSnZiVVZ1ZEhKcFpYTW9aR1Z3Wlc1a1pXNWphV1Z6TG0xaGNDaHBkR1Z0SUQwK0lGdHBkR1Z0TG01aGJXVXNJSFJvYVhNdWJXRnJaU2hwZEdWdExuWmhiSFZsTG0xbGRHRmtZWFJoSUQ4Z2FYUmxiUzUyWVd4MVpTQTZJR2wwWlcwdWJtRnRaU2xkS1NsY2JpQWdJQ0FnSUNBZ1kyOXVjM1FnUzJ4aGMzTWdQU0IyWVd4MVpWeHVJQ0FnSUNBZ0lDQmpiMjV6ZENCeVpYTnZiSFpsY2lBOUlDZ3BJRDArSUc1bGR5QkxiR0Z6Y3loa1pYQnpLVnh1SUNBZ0lDQWdJQ0IyWVd4MVpTNXRaWFJoWkdGMFlTNXphVzVuYkdWMGIyNGdQeUIwYUdsekxuTnBibWRzWlhSdmJpaHVZVzFsTENCeVpYTnZiSFpsY2lrZ09pQjBhR2x6TG1KcGJtUnBibWNvYm1GdFpTd2djbVZ6YjJ4MlpYSXBYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1sdWMzUmhibU5sS0c1aGJXVXNJSFpoYkhWbEtWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdmVnh1ZlZ4dUlpd2laWGh3YjNKMElHTnNZWE56SUZCeWIzWnBaR1Z5SUh0Y2JpQWdMeW9xWEc0Z0lDQXFJRU55WldGMFpTQmhJRzVsZHlCcGJuTjBZVzVqWlNCdlppQlFjbTkyYVdSbGNpNWNiaUFnSUNwY2JpQWdJQ29nUUhCaGNtRnRJQ0I3UTI5dWRHRnBibVZ5ZlNCamIyNTBZV2x1WlhKY2JpQWdJQ292WEc0Z0lHTnZibk4wY25WamRHOXlJQ2hqYjI1MFlXbHVaWElwSUh0Y2JpQWdJQ0IwYUdsekxsOWpiMjUwWVdsdVpYSWdQU0JqYjI1MFlXbHVaWEpjYmlBZ2ZWeHVYRzRnSUdkbGRDQmpiMjUwWVdsdVpYSWdLQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TGw5amIyNTBZV2x1WlhKY2JpQWdmVnh1WEc0Z0lDOHFLbHh1SUNBZ0tpQlNaV2RwYzNSbGNpQmhibmtnWVhCd2JHbGpZWFJwYjI0Z2MyVnlkbWxqWlhNdVhHNGdJQ0FxTDF4dUlDQnlaV2RwYzNSbGNpQW9LU0I3ZlZ4dVhHNGdJQzhxS2x4dUlDQWdLaUJDYjI5MGMzUnlZWEFnWVc1NUlHRndjR3hwWTJGMGFXOXVJSE5sY25acFkyVnpMbHh1SUNBZ0tpOWNiaUFnWW05dmRDQW9LU0I3ZlZ4dWZWeHVJaXdpYVcxd2IzSjBJRU52Ym5SaGFXNWxja1Y0WTJWd2RHbHZiaUJtY205dElDY3VMaTlsZUdObGNIUnBiMjV6TDBOdmJuUmhhVzVsY2tWNFkyVndkR2x2Ymk1dGFuTW5YRzVjYm1WNGNHOXlkQ0JqYjI1emRDQlRSVkpXU1VORlgxUlpVRVVnUFNBbmMyVnlkbWxqWlNkY2JseHVaWGh3YjNKMElHTnZibk4wSUZObGNuWnBZMlVnUFNBb2RtRnNkV1VwSUQwK0lIdGNiaUFnYVdZZ0tDRjJZV3gxWlNrZ2RHaHliM2NnYm1WM0lFTnZiblJoYVc1bGNrVjRZMlZ3ZEdsdmJpaERiMjUwWVdsdVpYSkZlR05sY0hScGIyNHVSRVZEVDFKQlZFOVNYMVpCVEZWRlgxUlpVRVVwWEc0Z0lISmxkSFZ5YmlBb2RHRnlaMlYwS1NBOVBpQjdYRzRnSUNBZ2RHRnlaMlYwTG0xbGRHRmtZWFJoSUQwZ2V5QXVMaTUyWVd4MVpTd2dkSGx3WlRvZ1UwVlNWa2xEUlY5VVdWQkZJSDFjYmlBZ2ZWeHVmVnh1SWl3aWFXMXdiM0owSUVOdmJuUmhhVzVsY2tWNFkyVndkR2x2YmlCbWNtOXRJQ2N1TGk5bGVHTmxjSFJwYjI1ekwwTnZiblJoYVc1bGNrVjRZMlZ3ZEdsdmJpNXRhbk1uWEc1Y2JtVjRjRzl5ZENCamIyNXpkQ0JUUlZKV1NVTkZYMUJTVDFaSlJFVlNYMVJaVUVVZ1BTQW5jMlZ5ZG1salpWOXdjbTkyYVdSbGNpZGNibHh1Wlhod2IzSjBJR052Ym5OMElGTmxjblpwWTJWUWNtOTJhV1JsY2lBOUlDaDJZV3gxWlNrZ1BUNGdlMXh1SUNCcFppQW9JWFpoYkhWbEtTQjBhSEp2ZHlCdVpYY2dRMjl1ZEdGcGJtVnlSWGhqWlhCMGFXOXVLRU52Ym5SaGFXNWxja1Y0WTJWd2RHbHZiaTVFUlVOUFVrRlVUMUpmVmtGTVZVVmZWRmxRUlNsY2JpQWdjbVYwZFhKdUlDaDBZWEpuWlhRcElEMCtJSHRjYmlBZ0lDQjBZWEpuWlhRdWJXVjBZV1JoZEdFZ1BTQjdJQzR1TG5aaGJIVmxMQ0IwZVhCbE9pQlRSVkpXU1VORlgxQlNUMVpKUkVWU1gxUlpVRVVnZlZ4dUlDQjlYRzU5WEc0aUxDSmxlSEJ2Y25RZ1pHVm1ZWFZzZENCamJHRnpjeUJEYjI1MFlXbHVaWEpGZUdObGNIUnBiMjRnWlhoMFpXNWtjeUJGY25KdmNpQjdYRzRnSUhOMFlYUnBZeUJuWlhRZ1EwOU9Sa2xIWDFSWlVFVWdLQ2tnZXlCeVpYUjFjbTRnSjJOdmJtWnBaeWNnZlZ4dUlDQnpkR0YwYVdNZ1oyVjBJRkJTVDFaSlJFVlNYMVJaVUVVZ0tDa2dleUJ5WlhSMWNtNGdKM0J5YjNacFpHVnlKeUI5WEc0Z0lITjBZWFJwWXlCblpYUWdVa1ZUVDB4VlZFbFBUbDlVV1ZCRklDZ3BJSHNnY21WMGRYSnVJQ2R5WlhOdmJIVjBhVzl1SnlCOVhHNGdJSE4wWVhScFl5Qm5aWFFnVGs5VVgwRmZVMFZTVmtsRFJWOVVXVkJGSUNncElIc2djbVYwZFhKdUlDZHViM1JmWVY5elpYSjJhV05sSnlCOVhHNGdJSE4wWVhScFl5Qm5aWFFnUkVWRFQxSkJWRTlTWDFaQlRGVkZYMVJaVUVVZ0tDa2dleUJ5WlhSMWNtNGdKMlJsWTI5eVlYUnZjbDkyWVd4MVpTY2dmVnh1SUNCemRHRjBhV01nWjJWMElGTkZVbFpKUTBWZlRrOVVYMFpQVlU1RVgxUlpVRVVnS0NrZ2V5QnlaWFIxY200Z0ozTmxjblpwWTJWZmJtOTBYMlp2ZFc1a0p5QjlYRzVjYmlBZ1kyOXVjM1J5ZFdOMGIzSWdLSFI1Y0dVc0lHMWxjM05oWjJVcElIdGNiaUFnSUNCemRYQmxjaWdwWEc0Z0lDQWdkR2hwY3k1MGVYQmxJRDBnZEhsd1pWeHVJQ0FnSUhSb2FYTXVibUZ0WlNBOUlDZHViMjkzYjNjdWMyVnlkbWxqWlY5amIyNTBZV2x1WlhJblhHNGdJQ0FnZEdocGN5NXRaWE56WVdkbElEMGdkR2hwY3k1blpYUk5aWE56WVdkbEtIUjVjR1VzSUcxbGMzTmhaMlVwWEc0Z0lIMWNibHh1SUNCblpYUk5aWE56WVdkbElDaDBlWEJsTENCdFpYTnpZV2RsS1NCN1hHNGdJQ0FnWTI5dWMzUWdiV1Z6YzJGblpYTWdQU0I3WEc0Z0lDQWdJQ0JiUTI5dWRHRnBibVZ5UlhoalpYQjBhVzl1TGtOUFRrWkpSMTlVV1ZCRlhUb2dKMDV2SUdOdmJtWnBaM1Z5WVhScGIyNXpJSEJ5YjNacFpHVmtMaWNzWEc0Z0lDQWdJQ0JiUTI5dWRHRnBibVZ5UlhoalpYQjBhVzl1TGxKRlUwOU1WVlJKVDA1ZlZGbFFSVjA2SUhSb2FYTXVaMlYwVW1WemIyeDFkR2x2YmsxbGMzTmhaMlVvYldWemMyRm5aU2tzWEc0Z0lDQWdJQ0JiUTI5dWRHRnBibVZ5UlhoalpYQjBhVzl1TGxORlVsWkpRMFZmVGs5VVgwWlBWVTVFWDFSWlVFVmRPaUJnVTJWeWRtbGpaU2drZTIxbGMzTmhaMlY5S1NCdWIzUWdabTkxYm1RdVlDeGNiaUFnSUNBZ0lGdERiMjUwWVdsdVpYSkZlR05sY0hScGIyNHVSRVZEVDFKQlZFOVNYMVpCVEZWRlgxUlpVRVZkT2lBblRtOGdZMjl1Wm1sbmRYSmhkR2x2Ym5NZ2NISnZkbWxrWldRZ1ptOXlJSFJvYVhNZ1pHVmpiM0poZEc5eUxpY3NYRzRnSUNBZ0lDQmJRMjl1ZEdGcGJtVnlSWGhqWlhCMGFXOXVMbEJTVDFaSlJFVlNYMVJaVUVWZE9pQmdWR2hwY3lCamJHRnpjeWdrZTIxbGMzTmhaMlY5S1NCcGN5QnViM1FnWVNCd2NtOTJhV1JsY2k0Z1EyeGhjM01nYlhWemRDQmxlSFJsYm1SeklGQnliM1pwWkdWeUlHTnNZWE56TG1Bc1hHNGdJQ0FnSUNCYlEyOXVkR0ZwYm1WeVJYaGpaWEIwYVc5dUxrNVBWRjlCWDFORlVsWkpRMFZmVkZsUVJWMDZJR0JVYUdseklDZ2tlMjFsYzNOaFoyVjlLU0JwY3lCdWIzUWdjMlZ5ZG1salpTNGdUWFZ6ZENCamIyNTBZV2x1Y3lCdFpYUmhaR0YwWVNCemRHRjBhV01nY0hKdmNHVnlkSGtnYjNJZ2JYVnpkQ0IxYzJVZ1FGTmxjblpwWTJVZ1pHVmpiM0poZEc5eVlGeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdiV1Z6YzJGblpYTmJkSGx3WlYwZ1B6OGdKMEZ1SUdWeWNtOXlJR2hoY3lCdlkyTjFjbVZrTGlkY2JpQWdmVnh1WEc0Z0lHZGxkRkpsYzI5c2RYUnBiMjVOWlhOellXZGxJQ2hyWlhrcElIdGNiaUFnSUNCc1pYUWdkbUZzZFdVZ1BTQW5KMXh1WEc0Z0lDQWdjM2RwZEdOb0lDaDBjblZsS1NCN1hHNGdJQ0FnWTJGelpTQnJaWGtnUFQwOUlIVnVaR1ZtYVc1bFpEcGNiaUFnSUNBZ0lIWmhiSFZsSUQwZ0ozVnVaR1ZtYVc1bFpDZGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNCclpYa2dQVDA5SUc1MWJHdzZYRzRnSUNBZ0lDQjJZV3gxWlNBOUlDZHVkV3hzSjF4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCallYTmxJSFI1Y0dWdlppQnJaWGtnUFQwOUlDZG1kVzVqZEdsdmJpYzZJSHRjYmlBZ0lDQWdJR052Ym5OMElHWjFibU5PWVcxbElEMGdhMlY1TG01aGJXVWdQeUJnT2lBa2UydGxlUzV1WVcxbGZXQWdPaUFuSjF4dUlDQWdJQ0FnZG1Gc2RXVWdQU0JnVzBaMWJtTjBhVzl1Skh0bWRXNWpUbUZ0WlgxZFlGeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQjlYRzRnSUNBZ1kyRnpaU0IwZVhCbGIyWWdhMlY1SUQwOVBTQW5iMkpxWldOMEp6b2dlMXh1SUNBZ0lDQWdkbUZzZFdVZ1BTQmdXMDlpYW1WamREb2dKSHRyWlhrdVkyOXVjM1J5ZFdOMGIzSXVibUZ0WlgxZFlGeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQjlYRzRnSUNBZ1kyRnpaU0IwZVhCbGIyWWdhMlY1SUQwOVBTQW5jM1J5YVc1bkp6cGNiaUFnSUNBZ0lIWmhiSFZsSUQwZ1lIUjVjR1VnSkh0MGVYQmxiMllnYTJWNWZTQjNhWFJvSUdFZ2RtRnNkV1VnYjJZZ0p5UjdhMlY1ZlNkZ1hHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHTmhjMlVnZEhsd1pXOW1JR3RsZVNBOVBUMGdKM041YldKdmJDYzZYRzRnSUNBZ0lDQjJZV3gxWlNBOUlHdGxlUzUwYjFOMGNtbHVaeWdwWEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdSbFptRjFiSFE2WEc0Z0lDQWdJQ0IyWVd4MVpTQTlJR0IwZVhCbElDUjdkSGx3Wlc5bUlHdGxlWDBnZDJsMGFDQmhJSFpoYkhWbElHOW1JQ1I3YTJWNWZXQmNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdmVnh1WEc0Z0lDQWdjbVYwZFhKdUlHQkdZV2xzWldRZ2RHOGdjbVZ6YjJ4MlpTQmhJR0pwYm1ScGJtY2dkMmwwYUNCaElHdGxlU0J2WmlBa2UzWmhiSFZsZlNCbWNtOXRJSFJvWlNCelpYSjJhV05sSUdOdmJuUmhhVzVsY2k1Z1hHNGdJSDFjYm4xY2JpSXNJbVY0Y0c5eWRDQmtaV1poZFd4MElHTnNZWE56SUVKcGJtUnBibWNnZTF4dUlDQXZLaXBjYmlBZ0lDb2dRM0psWVhSbElHRWdibVYzSUdsdWMzUmhibU5sSUc5bUlFSnBibVJwYm1jdVhHNGdJQ0FxWEc0Z0lDQXFJRUJ3WVhKaGJTQjdZVzU1SUQwZ2JuVnNiSDBnSUhaaGJIVmxYRzRnSUNBcUwxeHVJQ0JqYjI1emRISjFZM1J2Y2lBb2RtRnNkV1VnUFNCdWRXeHNLU0I3WEc0Z0lDQWdkR2hwY3k1MllXeDFaU0E5SUhaaGJIVmxYRzRnSUgxY2JseHVJQ0F2S2lwY2JpQWdJQ29nVW1WemIyeDJaU0JoYm1RZ2NtVjBkWEp1SUhSb1pTQjJZV3gxWlNCdlppQjBhR1VnWW1sdVpHbHVaeTVjYmlBZ0lDcGNiaUFnSUNvZ1FISmxkSFZ5YmlCN1lXNTVmVnh1SUNBZ0tpOWNiaUFnY21WemIyeDJaU0FvS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFJvYVhNdWRtRnNkV1ZjYmlBZ2ZWeHVmVnh1SWl3aWFXMXdiM0owSUZKbGMyOXNkbVZ5UW1sdVpHbHVaeUJtY205dElDY3VMMUpsYzI5c2RtVnlRbWx1WkdsdVp5NXRhbk1uWEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdOc1lYTnpJRVpoWTNSdmNua2daWGgwWlc1a2N5QlNaWE52YkhabGNrSnBibVJwYm1jZ2UxeHVJQ0F2S2lwY2JpQWdJQ29nVW1WemIyeDJaU0JoYm1RZ2NtVjBkWEp1SUhSb1pTQjJZV3gxWlNCdlppQjBhR1VnWW1sdVpHbHVaeTVjYmlBZ0lDcGNiaUFnSUNvZ1FIQmhjbUZ0SUNCN1EyOXVkR0ZwYm1WeWZTQmpiMjUwWVdsdVpYSmNiaUFnSUNvZ1FISmxkSFZ5YmlCN1lXNTVmVnh1SUNBZ0tpOWNiaUFnY21WemIyeDJaU0FvWTI5dWRHRnBibVZ5S1NCN1hHNGdJQ0FnZEdocGN5NW9ZWE5TWlhOdmJIWmxaQ0E5SUhSeWRXVmNiaUFnSUNCeVpYUjFjbTRnZEdocGN5NXlaWE52YkhabGNpaGpiMjUwWVdsdVpYSXBYRzRnSUgxY2JuMWNiaUlzSW1sdGNHOXlkQ0JDYVc1a2FXNW5JR1p5YjIwZ0p5NHZRbWx1WkdsdVp5NXRhbk1uWEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdOc1lYTnpJRWx1YzNSaGJtTmxJR1Y0ZEdWdVpITWdRbWx1WkdsdVp5QjdmVnh1SWl3aWFXMXdiM0owSUVKcGJtUnBibWNnWm5KdmJTQW5MaTlDYVc1a2FXNW5MbTFxY3lkY2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1kyeGhjM01nVW1WemIyeDJaWEpDYVc1a2FXNW5JR1Y0ZEdWdVpITWdRbWx1WkdsdVp5QjdYRzRnSUM4cUtseHVJQ0FnS2lCRGNtVmhkR1VnWVNCdVpYY2dhVzV6ZEdGdVkyVWdiMllnVW1WemIyeDJaWEpDYVc1a2FXNW5MbHh1SUNBZ0tseHVJQ0FnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCeVpYTnZiSFpsY2x4dUlDQWdLaTljYmlBZ1kyOXVjM1J5ZFdOMGIzSWdLSEpsYzI5c2RtVnlLU0I3WEc0Z0lDQWdjM1Z3WlhJb0tWeHVJQ0FnSUhSb2FYTXVhR0Z6VW1WemIyeDJaV1FnUFNCbVlXeHpaVnh1SUNBZ0lIUm9hWE11WDNKbGMyOXNkbVZ5SUQwZ2NtVnpiMngyWlhKY2JpQWdmVnh1WEc0Z0lDOHFLbHh1SUNBZ0tpQlNaWFJ5YVdWMlpTQjBhR1VnZG1Gc2RXVWdiMllnZEdobElISmxjMjlzZG1WeUlIQnliM0JsY25SNUxseHVJQ0FnS2x4dUlDQWdLaUJBY21WMGRYSnVJSHRHZFc1amRHbHZibjFjYmlBZ0lDb3ZYRzRnSUdkbGRDQnlaWE52YkhabGNpQW9LU0I3WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE11WDNKbGMyOXNkbVZ5WEc0Z0lIMWNibjFjYmlJc0ltbHRjRzl5ZENCU1pYTnZiSFpsY2tKcGJtUnBibWNnWm5KdmJTQW5MaTlTWlhOdmJIWmxja0pwYm1ScGJtY3ViV3B6SjF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCamJHRnpjeUJUYVc1bmJHVjBiMjRnWlhoMFpXNWtjeUJTWlhOdmJIWmxja0pwYm1ScGJtY2dlMXh1SUNBdktpcGNiaUFnSUNvZ1VtVnpiMngyWlNCaGJtUWdjbVYwZFhKdUlIUm9aU0IyWVd4MVpTQnZaaUIwYUdVZ1ltbHVaR2x1Wnk1Y2JpQWdJQ3BjYmlBZ0lDb2dRSEJoY21GdElDQjdRMjl1ZEdGcGJtVnlmU0JqYjI1MFlXbHVaWEpjYmlBZ0lDb2dRSEpsZEhWeWJpQjdZVzU1ZlZ4dUlDQWdLaTljYmlBZ2NtVnpiMngyWlNBb1kyOXVkR0ZwYm1WeUtTQjdYRzRnSUNBZ2FXWWdLSFJvYVhNdWFHRnpVbVZ6YjJ4MlpXUWdQVDA5SUdaaGJITmxLU0I3WEc0Z0lDQWdJQ0IwYUdsekxtaGhjMUpsYzI5c2RtVmtJRDBnZEhKMVpWeHVJQ0FnSUNBZ2RHaHBjeTUyWVd4MVpTQTlJSFJvYVhNdWNtVnpiMngyWlhJb1kyOXVkR0ZwYm1WeUtWeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGRIVnliaUIwYUdsekxuWmhiSFZsWEc0Z0lIMWNibjFjYmlJc0lpOHZJRlJvWlNCdGIyUjFiR1VnWTJGamFHVmNiblpoY2lCZlgzZGxZbkJoWTJ0ZmJXOWtkV3hsWDJOaFkyaGxYMThnUFNCN2ZUdGNibHh1THk4Z1ZHaGxJSEpsY1hWcGNtVWdablZ1WTNScGIyNWNibVoxYm1OMGFXOXVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvYlc5a2RXeGxTV1FwSUh0Y2JseDBMeThnUTJobFkyc2dhV1lnYlc5a2RXeGxJR2x6SUdsdUlHTmhZMmhsWEc1Y2RIWmhjaUJqWVdOb1pXUk5iMlIxYkdVZ1BTQmZYM2RsWW5CaFkydGZiVzlrZFd4bFgyTmhZMmhsWDE5YmJXOWtkV3hsU1dSZE8xeHVYSFJwWmlBb1kyRmphR1ZrVFc5a2RXeGxJQ0U5UFNCMWJtUmxabWx1WldRcElIdGNibHgwWEhSeVpYUjFjbTRnWTJGamFHVmtUVzlrZFd4bExtVjRjRzl5ZEhNN1hHNWNkSDFjYmx4MEx5OGdRM0psWVhSbElHRWdibVYzSUcxdlpIVnNaU0FvWVc1a0lIQjFkQ0JwZENCcGJuUnZJSFJvWlNCallXTm9aU2xjYmx4MGRtRnlJRzF2WkhWc1pTQTlJRjlmZDJWaWNHRmphMTl0YjJSMWJHVmZZMkZqYUdWZlgxdHRiMlIxYkdWSlpGMGdQU0I3WEc1Y2RGeDBMeThnYm04Z2JXOWtkV3hsTG1sa0lHNWxaV1JsWkZ4dVhIUmNkQzh2SUc1dklHMXZaSFZzWlM1c2IyRmtaV1FnYm1WbFpHVmtYRzVjZEZ4MFpYaHdiM0owY3pvZ2UzMWNibHgwZlR0Y2JseHVYSFF2THlCRmVHVmpkWFJsSUhSb1pTQnRiMlIxYkdVZ1puVnVZM1JwYjI1Y2JseDBYMTkzWldKd1lXTnJYMjF2WkhWc1pYTmZYMXR0YjJSMWJHVkpaRjBvYlc5a2RXeGxMQ0J0YjJSMWJHVXVaWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWs3WEc1Y2JseDBMeThnVW1WMGRYSnVJSFJvWlNCbGVIQnZjblJ6SUc5bUlIUm9aU0J0YjJSMWJHVmNibHgwY21WMGRYSnVJRzF2WkhWc1pTNWxlSEJ2Y25Sek8xeHVmVnh1WEc0aUxDSXZMeUJrWldacGJtVWdaMlYwZEdWeUlHWjFibU4wYVc5dWN5Qm1iM0lnYUdGeWJXOXVlU0JsZUhCdmNuUnpYRzVmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1RZ1BTQW9aWGh3YjNKMGN5d2daR1ZtYVc1cGRHbHZiaWtnUFQ0Z2UxeHVYSFJtYjNJb2RtRnlJR3RsZVNCcGJpQmtaV1pwYm1sMGFXOXVLU0I3WEc1Y2RGeDBhV1lvWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1dktHUmxabWx1YVhScGIyNHNJR3RsZVNrZ0ppWWdJVjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YnlobGVIQnZjblJ6TENCclpYa3BLU0I3WEc1Y2RGeDBYSFJQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb1pYaHdiM0owY3l3Z2EyVjVMQ0I3SUdWdWRXMWxjbUZpYkdVNklIUnlkV1VzSUdkbGREb2daR1ZtYVc1cGRHbHZibHRyWlhsZElIMHBPMXh1WEhSY2RIMWNibHgwZlZ4dWZUc2lMQ0pmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG04Z1BTQW9iMkpxTENCd2NtOXdLU0E5UGlBb1QySnFaV04wTG5CeWIzUnZkSGx3WlM1b1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tHOWlhaXdnY0hKdmNDa3BJaXdpTHk4Z1pHVm1hVzVsSUY5ZlpYTk5iMlIxYkdVZ2IyNGdaWGh3YjNKMGMxeHVYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV5SUQwZ0tHVjRjRzl5ZEhNcElEMCtJSHRjYmx4MGFXWW9kSGx3Wlc5bUlGTjViV0p2YkNBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NnSmlZZ1UzbHRZbTlzTG5SdlUzUnlhVzVuVkdGbktTQjdYRzVjZEZ4MFQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRk41YldKdmJDNTBiMU4wY21sdVoxUmhaeXdnZXlCMllXeDFaVG9nSjAxdlpIVnNaU2NnZlNrN1hHNWNkSDFjYmx4MFQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJQ2RmWDJWelRXOWtkV3hsSnl3Z2V5QjJZV3gxWlRvZ2RISjFaU0I5S1R0Y2JuMDdJaXdpWlhod2IzSjBJSHNnVUhKdmRtbGtaWElnZlNCbWNtOXRJQ2N1TDFCeWIzWnBaR1Z5TG0xcWN5ZGNibVY0Y0c5eWRDQjdJRU52Ym5SaGFXNWxjaUI5SUdaeWIyMGdKeTR2UTI5dWRHRnBibVZ5TG0xcWN5ZGNibVY0Y0c5eWRDQjdJRk5sY25acFkyVWdmU0JtY205dElDY3VMMlJsWTI5eVlYUnZjbk12VTJWeWRtbGpaUzV0YW5NblhHNWxlSEJ2Y25RZ2V5QlRaWEoyYVdObFVISnZkbWxrWlhJZ2ZTQm1jbTl0SUNjdUwyUmxZMjl5WVhSdmNuTXZVMlZ5ZG1salpWQnliM1pwWkdWeUxtMXFjeWRjYmlKZExDSnVZVzFsY3lJNld5SlFjbTkyYVdSbGNpSXNJa1poWTNSdmNua2lMQ0pKYm5OMFlXNWpaU0lzSWxOcGJtZHNaWFJ2YmlJc0lrTnZiblJoYVc1bGNrVjRZMlZ3ZEdsdmJpSXNJbE5GVWxaSlEwVmZWRmxRUlNJc0lrTnZiblJoYVc1bGNpSXNJbU52Ym5OMGNuVmpkRzl5SWl3aVgySnBibVJwYm1keklpd2lUV0Z3SWl3aVgzQnliM1pwWkdWeWN5SXNJbE5sZENJc0ltSnBibVJwYm1keklpd2lhVzV6ZEdGdVkyVWlMQ0pyWlhraUxDSjJZV3gxWlNJc0luTmxkQ0lzSW5OcGJtZHNaWFJ2YmlJc0luSmxjMjlzZG1WeUlpd2lZbWx1WkdsdVp5SXNJbTFoYTJVaUxDSm9ZWE1pTENKblpYUWlMQ0p5WlhOdmJIWmxJaXdpVWtWVFQweFZWRWxQVGw5VVdWQkZJaXdpY0hKdmRtbGtaWElpTENKUWNtOTJhV1JsY2tOc1lYTnpJaXdpY0hKdmRHOTBlWEJsSWl3aVVGSlBWa2xFUlZKZlZGbFFSU0lzSW5KbFoybHpkR1Z5SWl3aVlXUmtJaXdpWTJ4bFlYSWlMQ0prYVhOamIzWmxjbWx1WnlJc0luTmxjblpwWTJWeklpd2labTl5UldGamFDSXNJbWwwWlcwaUxDSnRaWFJoWkdGMFlTSXNJazVQVkY5QlgxTkZVbFpKUTBWZlZGbFFSU0lzSWw5aGRYUnZRbWx1WkdsdVp5SXNJbTVoYldVaUxDSjBlWEJsSWl3aVpHVndaVzVrWlc1amFXVnpJaXdpWkdWd2N5SXNJazlpYW1WamRDSXNJbVp5YjIxRmJuUnlhV1Z6SWl3aWJXRndJaXdpUzJ4aGMzTWlMQ0pqYjI1MFlXbHVaWElpTENKZlkyOXVkR0ZwYm1WeUlpd2lZbTl2ZENJc0lsTmxjblpwWTJVaUxDSkVSVU5QVWtGVVQxSmZWa0ZNVlVWZlZGbFFSU0lzSW5SaGNtZGxkQ0lzSWw5dlltcGxZM1JUY0hKbFlXUWlMQ0pUUlZKV1NVTkZYMUJTVDFaSlJFVlNYMVJaVUVVaUxDSlRaWEoyYVdObFVISnZkbWxrWlhJaUxDSkZjbkp2Y2lJc0lrTlBUa1pKUjE5VVdWQkZJaXdpVTBWU1ZrbERSVjlPVDFSZlJrOVZUa1JmVkZsUVJTSXNJbTFsYzNOaFoyVWlMQ0puWlhSTlpYTnpZV2RsSWl3aWJXVnpjMkZuWlhNaUxDSm5aWFJTWlhOdmJIVjBhVzl1VFdWemMyRm5aU0lzSW5WdVpHVm1hVzVsWkNJc0ltWjFibU5PWVcxbElpd2lkRzlUZEhKcGJtY2lMQ0pDYVc1a2FXNW5JaXdpVW1WemIyeDJaWEpDYVc1a2FXNW5JaXdpYUdGelVtVnpiMngyWldRaUxDSmZjbVZ6YjJ4MlpYSWlYU3dpYzI5MWNtTmxVbTl2ZENJNklpSjkiLCJpbXBvcnQgVXNlclNlcnZpY2UgZnJvbSBcIi4uL3NlcnZpY2VzL1VzZXJTZXJ2aWNlLm1qc1wiXG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIkBub293b3ctY29tbXVuaXR5L3NlcnZpY2UtY29udGFpbmVyLWpzXCJcblxuQFNlcnZpY2Uoe1xuICBkZXBlbmRlbmNpZXM6IFtcbiAgICB7IG5hbWU6ICd1c2VyU2VydmljZScsIHZhbHVlOiBVc2VyU2VydmljZSB9XG4gIF1cbn0pXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yICh7IHVzZXJTZXJ2aWNlIH0pIHtcbiAgICB0aGlzLnVzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2VcbiAgfVxuXG4gIGxpc3QocmVxdWVzdCkge1xuICAgIGNvbnNvbGUubG9nKCdVc2VyIGNvbnRyb2xsZXIgbGlzdDonLCByZXF1ZXN0KTtcbiAgICBjb25zb2xlLmxvZygnVXNlciBjb250cm9sbGVyIHVzZXIgc2VydmljZTonLCB0aGlzLnVzZXJTZXJ2aWNlLmxpc3QoKSk7XG4gIH1cblxuICBzaG93KHJlcXVlc3QpIHtcbiAgICBjb25zb2xlLmxvZygnVXNlciBjb250cm9sbGVyIHNob3c6JywgdGhpcy51c2VyU2VydmljZS5zaG93KHJlcXVlc3QuaWQpKTtcbiAgfVxufSIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiQG5vb3dvdy1jb21tdW5pdHkvc2VydmljZS1jb250YWluZXItanNcIlxuaW1wb3J0IENvbmZpZ3VyYXRpb25TZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlcy9Db25maWd1cmF0aW9uU2VydmljZS5tanNcIlxuXG5AU2VydmljZSh7XG4gIHNpbmdsZXRvbjogdHJ1ZSxcbiAgZGVwZW5kZW5jaWVzOiBbXG4gICAgeyBuYW1lOiAnY29uZmlndXJhdGlvblNlcnZpY2UnLCB2YWx1ZTogQ29uZmlndXJhdGlvblNlcnZpY2UgfVxuICBdXG59KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0aE1pZGRsZXdhcmUge1xuICBjb25zdHJ1Y3RvciAoeyBjb25maWd1cmF0aW9uU2VydmljZSB9KSB7XG4gICAgdGhpcy5jb25maWd1cmF0aW9uU2VydmljZSA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlXG4gIH1cblxuICBoYW5kbGVSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICBjb25zb2xlLmxvZygnTWlkZGxld2FyZSByZXF1ZXN0OicsIHJlcXVlc3QpXG4gICAgY29uc29sZS5sb2coJ01pZGRsZXdhcmUgcmVxdWVzdCBjb25maWc6JywgdGhpcy5jb25maWd1cmF0aW9uU2VydmljZS5nZXQoJ21pZGRsZXdhcmUubmFtZScpKVxuICB9XG5cbiAgaGFuZGxlUmVzcG9uc2UocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgICBjb25zb2xlLmxvZygnTWlkZGxld2FyZSByZXNwb25zZTonLCByZXF1ZXN0LCByZXNwb25zZSlcbiAgfVxufSIsImltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gXCJAbm9vd293LWNvbW11bml0eS9zZXJ2aWNlLWNvbnRhaW5lci1qc1wiXG5cbmV4cG9ydCBjb25zdCBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyKCkiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIkBub293b3ctY29tbXVuaXR5L3NlcnZpY2UtY29udGFpbmVyLWpzXCJcblxuQFNlcnZpY2Uoe1xuICBkZXBlbmRlbmNpZXM6IFtcbiAgICB7IG5hbWU6ICdjb25maWcnLCB2YWx1ZTogeyBjb25maWc6IHsgbWlkZGxld2FyZTogeyBuYW1lOiAnVmVuc3kgTWlkZGxld2FyZScgfSwgdXNlcjogeyBlbWFpbDogJ2pvbmguZG9lQG5vb3dvdy5jb20nLCBuYW1lczogWydKb25oJywgJ0RvZScsICdKYW1lcyddIH0gfSB9IH1cbiAgXVxufSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpZ3VyYXRpb25TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IgKHsgY29uZmlnIH0pIHtcbiAgICBpZiAoIWNvbmZpZykgdGhyb3cgbmV3IEVycm9yKCdObyBjb25maWd1cmF0aW9ucyBwcm92aWRlZCcpXG4gICAgdGhpcy5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ1xuICB9XG5cbiAgZ2V0IChrZXl3b3JkLCBzY29wZSA9ICdjb25maWcnKSB7XG4gICAgcmV0dXJuIGtleXdvcmRcbiAgICAgIC5zcGxpdCgnLicpXG4gICAgICAucmVkdWNlKChjb25maWcsIGtleSkgPT4ge1xuICAgICAgICBpZiAoIWNvbmZpZ1trZXldKSB0aHJvdyBuZXcgRXJyb3IoYE5vIGNvbmZpZyBmb3IgdGhpcyBrZXk6ICR7a2V5d29yZH1gKVxuICAgICAgICByZXR1cm4gY29uZmlnW2tleV1cbiAgICAgIH0sIHNjb3BlID8gdGhpcy5jb25maWd1cmF0aW9uc1tzY29wZV0gOiB0aGlzLmNvbmZpZ3VyYXRpb25zKVxuICB9XG59IiwiaW1wb3J0IENvbmZpZ3VyYXRpb25TZXJ2aWNlIGZyb20gXCIuL0NvbmZpZ3VyYXRpb25TZXJ2aWNlLm1qc1wiO1xuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCJAbm9vd293LWNvbW11bml0eS9zZXJ2aWNlLWNvbnRhaW5lci1qc1wiXG5cbkBTZXJ2aWNlKHtcbiAgZGVwZW5kZW5jaWVzOiBbXG4gICAgeyBuYW1lOiAnY29uZmlndXJhdGlvblNlcnZpY2UnLCB2YWx1ZTogQ29uZmlndXJhdGlvblNlcnZpY2UgfVxuICBdXG59KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciAoeyBjb25maWd1cmF0aW9uU2VydmljZSB9KSB7XG4gICAgdGhpcy5jb25maWd1cmF0aW9uU2VydmljZSA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlXG4gIH1cblxuICBsaXN0KCkge1xuICAgIGNvbnNvbGUubG9nKCdVc2VyIHNlcnZpY2UgbGlzdCcpO1xuICAgIGNvbnNvbGUubG9nKCdVc2VyIHNlcnZpY2UgbGlzdCBjb25maWcnLCB0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlLmdldCgndXNlci5uYW1lcycpKVxuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlLmdldCgndXNlci5uYW1lcycpXG4gIH1cblxuICBzaG93KGlkKSB7XG4gICAgY29uc29sZS5sb2coJ1VzZXIgc2VydmljZSBzaG93JywgaWQpO1xuICAgIGNvbnNvbGUubG9nKCdVc2VyIHNlcnZpY2Ugc2hvdyBjb25maWcnLCB0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlLmdldCgndXNlci5lbWFpbCcpKVxuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlLmdldCgndXNlci5lbWFpbCcpXG4gIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGltcG9ydCB7IGdsb2JTeW5jIH0gZnJvbSBcImdsb2JcIlxuLy8gaW1wb3J0IHsgZ2V0UmVsYXRpdmVQYXRoIH0gZnJvbSBcIi4vdXRpbHMubWpzXCJcbmltcG9ydCB7IGNvbnRhaW5lciB9IGZyb20gXCIuL3NlcnZpY2UtY29udGFpbmVyLm1qc1wiXG5pbXBvcnQgQXV0aE1pZGRsZXdhcmUgZnJvbSBcIi4vbWlkZGxld2FyZS9BdXRoTWlkZGxld2FyZS5tanNcIlxuaW1wb3J0IFVzZXJDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJzL1VzZXJDb250cm9sbGVyLm1qc1wiXG5pbXBvcnQgVXNlclNlcnZpY2UgZnJvbSBcIi4vc2VydmljZXMvVXNlclNlcnZpY2UubWpzXCJcbmltcG9ydCBDb25maWd1cmF0aW9uU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlcy9Db25maWd1cmF0aW9uU2VydmljZS5tanNcIlxuXG4vLyBjb25zdCBpbXBvcnRTZXJ2aWNlQ2xhc3NlcyA9IGFzeW5jICgpID0+IHtcbi8vICAgY29uc3Qga2xhc3NlcyA9IG5ldyBTZXQoKVxuLy8gICBmb3IgKGNvbnN0IGZvbGRlciBvZiBbJ3NyYyddKSB7XG4vLyAgICAgY29uc3QgZmlsZXMgPSBnbG9iU3luYyhgJHtmb2xkZXJ9LyoqLyoubWpzYCwgeyBhYnNvbHV0ZTogZmFsc2UgfSlcbi8vICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbi8vICAgICAgIHRyeSB7XG4vLyAgICAgICAgIGNvbnN0IGtsYXNzID0gKGF3YWl0IGltcG9ydChnZXRSZWxhdGl2ZVBhdGgoZmlsZSkpKS5kZWZhdWx0XG4vLyAgICAgICAgIGtsYXNzLm1ldGFkYXRhICYmICFrbGFzc2VzLmhhcyhrbGFzcykgJiYga2xhc3Nlcy5hZGQoa2xhc3MpXG4vLyAgICAgICB9IGNhdGNoIChlKSB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciB3aGlsZSBpbXBvcnRpbmcgc2VydmljZXMnLCBlKTtcbi8vICAgICAgIH1cbi8vICAgICB9XG4vLyAgIH1cbi8vICAgcmV0dXJuIGtsYXNzZXNcbi8vIH1cbmNvbnN0IGdldE1vZHVsZXMgPSAoKSA9PiBQcm9taXNlLnJlc29sdmUoW1VzZXJTZXJ2aWNlLCBVc2VyQ29udHJvbGxlciwgQ29uZmlndXJhdGlvblNlcnZpY2UsIEF1dGhNaWRkbGV3YXJlXSlcblxuZ2V0TW9kdWxlcygpLnRoZW4obW9kdWxlcyA9PiB7XG4gIGNvbnRhaW5lci5kaXNjb3ZlcmluZyhtb2R1bGVzKVxuICBjb25zb2xlLmxvZygnQmluZGluZyB2YWx1ZXM6JywgY29udGFpbmVyLmJpbmRpbmdzLnZhbHVlcygpKTtcbiAgY29udGFpbmVyLm1ha2UoQXV0aE1pZGRsZXdhcmUpLmhhbmRsZVJlcXVlc3QoeyBib2R5OiB7IG5hbWU6ICdFdmVucycgfSB9KVxuICBjb250YWluZXIubWFrZShVc2VyQ29udHJvbGxlcikubGlzdCh7IGJvZHk6IHsgbmFtZTogJ0V2ZW5zJyB9IH0pXG59KS5jYXRjaChlID0+IGNvbnNvbGUubG9nKCdFcnJvcicsIGUpKVxuXG4vLyBpbXBvcnQgeyBjb250YWluZXIgfSBmcm9tIFwiLi9zZXJ2aWNlLWNvbnRhaW5lci5tanNcIlxuLy8gaW1wb3J0ICogYXMgbW9kdWxlczAgZnJvbSBcIi9Vc2Vycy9ldmVuc3BpZXJyZS9Qcm9qZWN0cy9Ob293b3cvbGlicy9zZXJ2aWNlLWNvbnRhaW5lci1qcy9leGFtcGxlcy9zcmMvc2VydmljZS1jb250YWluZXIubWpzXCI7IGltcG9ydCAqIGFzIG1vZHVsZXMxIGZyb20gXCIvVXNlcnMvZXZlbnNwaWVycmUvUHJvamVjdHMvTm9vd293L2xpYnMvc2VydmljZS1jb250YWluZXItanMvZXhhbXBsZXMvc3JjL3V0aWxzLm1qc1wiXG4vLyBjb25zb2xlLmxvZygnbW9kdWxlcycsIG1vZHVsZXMpXG4vLyBjb25zb2xlLmxvZygncGFsbGxsbCcsIGNvbnRhaW5lcik7Il0sIm5hbWVzIjpbIlVzZXJTZXJ2aWNlIiwiU2VydmljZSIsIl9Vc2VyQ29udHJvbGxlciIsIl9kZWMiLCJkZXBlbmRlbmNpZXMiLCJuYW1lIiwidmFsdWUiLCJVc2VyQ29udHJvbGxlciIsImNvbnN0cnVjdG9yIiwidXNlclNlcnZpY2UiLCJsaXN0IiwicmVxdWVzdCIsImNvbnNvbGUiLCJsb2ciLCJzaG93IiwiaWQiLCJfY2xhc3MiLCJfaW5pdENsYXNzIiwiX2FwcGx5RGVjcyIsImMiLCJkZWZhdWx0IiwiQ29uZmlndXJhdGlvblNlcnZpY2UiLCJfQXV0aE1pZGRsZXdhcmUiLCJzaW5nbGV0b24iLCJBdXRoTWlkZGxld2FyZSIsImNvbmZpZ3VyYXRpb25TZXJ2aWNlIiwiaGFuZGxlUmVxdWVzdCIsImdldCIsImhhbmRsZVJlc3BvbnNlIiwicmVzcG9uc2UiLCJDb250YWluZXIiLCJjb250YWluZXIiLCJfQ29uZmlndXJhdGlvblNlcnZpY2UiLCJjb25maWciLCJtaWRkbGV3YXJlIiwidXNlciIsImVtYWlsIiwibmFtZXMiLCJFcnJvciIsImNvbmZpZ3VyYXRpb25zIiwia2V5d29yZCIsInNjb3BlIiwic3BsaXQiLCJyZWR1Y2UiLCJrZXkiLCJfVXNlclNlcnZpY2UiLCJnZXRNb2R1bGVzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwibW9kdWxlcyIsImRpc2NvdmVyaW5nIiwiYmluZGluZ3MiLCJ2YWx1ZXMiLCJtYWtlIiwiYm9keSIsImNhdGNoIiwiZSJdLCJzb3VyY2VSb290IjoiIn0=