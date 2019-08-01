(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.DOMObserver = {}));
}(this, function (exports) { 'use strict';

	var supportsPassive = false;

	try {
	  var opts = Object.defineProperty({}, 'passive', {
	    get: function get() {
	      supportsPassive = true;
	    }
	  });
	  window.addEventListener('testPassive', null, opts);
	  window.removeEventListener('testPassive', null, opts);
	} catch (e) {}
	/**
	 * 判断是否是html元素
	 * @param {HTMLElement} element 
	 */


	var isHTMLElement = function isHTMLElement(element) {
	  return element instanceof HTMLElement;
	};
	/**
	 * 判断是否是单标签html元素
	 * @param {HTMLElement} element 
	 */


	var isSingleLabel = function isSingleLabel(element) {
	  if (!element || !element.tagName) return false;
	  return !/^(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr|script|style|textarea|title)$/i.test(element.tagName);
	};

	var isFunction = function isFunction(cb) {
	  return typeof cb === 'function';
	};

	var checkObserverType = function checkObserverType(type) {
	  if (typeof type !== 'string') return false;
	  return type === 'resize' || type === 'width' || type === 'height';
	};
	/**
	 * 监听dom元素尺寸是否发生了变化
	 * @param {HTMLElement} element 
	 * @param {function} callback 
	 */


	var DOMObserver = function DOMObserver(observerType, element, callback) {
	  if (!checkObserverType(observerType)) throw new TypeError('observer type only can choose "resize, width or height"');
	  if (!isHTMLElement(element)) throw new TypeError('element is need a HTMLElement');
	  if (!isSingleLabel(element)) throw new TypeError('Unsupported tag type. Change the tag or wrap it in a supported tag(e.g. div).');
	  if (!isFunction(callback)) throw new TypeError('callback is need a function');
	  var width = element.offsetWidth || 1;
	  var height = element.offsetHeight || 1;
	  var maxWidth = width * 1e4;
	  var maxHeight = height * 1e4;
	  var observerDom = document.createElement('div');
	  var observerDomChild = document.createElement('div');
	  observerDom.style.cssText = "position:absolute;width:100%;height:100%;left:".concat(-1e7, "px;top:0;overflow:hidden");

	  if (observerType === 'width') {
	    observerDomChild.style.cssText = "width:".concat(maxWidth, "px;height:100%");
	  } else if (observerType === 'height') {
	    observerDomChild.style.cssText = "width:100%;height:".concat(maxHeight, "px");
	  } else {
	    observerDomChild.style.cssText = "width:".concat(maxWidth, "px;height:").concat(maxHeight, "px");
	  }

	  observerDom.appendChild(observerDomChild);
	  element.appendChild(observerDom);
	  observerDom.scrollTop = maxHeight;
	  observerDom.scrollLeft = maxWidth;

	  var fn = function fn(e) {
	    callback && callback(e);
	  };

	  observerDom.addEventListener('scroll', fn, supportsPassive ? {
	    passive: true
	  } : false);
	  return function () {
	    return observerDom.removeEventListener('scroll', fn);
	  };
	}; // 监听宽高的变化


	var DOMObserveResize = function DOMObserveResize(element, callback) {
	  return DOMObserver('resize', element, callback);
	}; // 只监听宽度的变化


	var DOMObserveWidth = function DOMObserveWidth(element, callback) {
	  return DOMObserver('width', element, callback);
	}; // 只监听高度的变化


	var DOMObserveHeight = function DOMObserveHeight(element, callback) {
	  return DOMObserver('height', element, callback);
	};

	exports.DOMObserveHeight = DOMObserveHeight;
	exports.DOMObserveResize = DOMObserveResize;
	exports.DOMObserveWidth = DOMObserveWidth;
	exports.DOMObserver = DOMObserver;
	exports.default = DOMObserver;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
