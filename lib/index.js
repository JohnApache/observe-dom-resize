let supportsPassive = false;
try {
	var opts = Object.defineProperty({}, 'passive', {
		get: function() {
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
const isHTMLElement = (element) => {
	return element instanceof HTMLElement;
};

/**
 * 判断是否是单标签html元素
 * @param {HTMLElement} element 
 */
const isSingleLabel = (element) => {
	if(!element || !element.tagName) return false;
	return !(/^(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr|script|style|textarea|title)$/i.test(element.tagName));
};

const isFunction = (cb) => {
	return typeof(cb) === 'function';
};

const checkObserverType = (type) => {
	if(typeof type !== 'string') return false;
	return (
		type === 'resize' || 
        type === 'width'  ||
        type === 'height'
	);
};

/**
 * 监听dom元素尺寸是否发生了变化
 * @param {HTMLElement} element 
 * @param {function} callback 
 */
export const DOMObserver = (observerType, element, callback) => {

	if(!checkObserverType(observerType)) 
		throw new TypeError('observer type only can choose "resize, width or height"');
	if(!isHTMLElement(element)) 
		throw new TypeError('element is need a HTMLElement');
	if(!isSingleLabel(element))
		throw new TypeError('Unsupported tag type. Change the tag or wrap it in a supported tag(e.g. div).');
	if(!isFunction(callback)) 
		throw new TypeError('callback is need a function');
        
	const maxWidth 	=  3e7,
		maxHeight 	= 3e7,
		maxLeft 	= 3.35544e+07,
		maxTop 		= 3.35544e+07;

	const observerDom = document.createElement('div');
	const observerDomChild = document.createElement('div');
	observerDom.style.cssText = `position:absolute;width:100%;height:100%;left:${-maxLeft}px;top:${-maxTop}px;overflow:hidden`;
    
	if(observerType === 'width') {
		observerDomChild.style.cssText = `width:${maxWidth}px;height:100%`;
	}else if(observerType === 'height') {
		observerDomChild.style.cssText = `width:100%;height:${maxHeight}px`;
	}else {
		observerDomChild.style.cssText = `width:${maxWidth}px;height:${maxHeight}px`;
	}
    
	observerDom.appendChild(observerDomChild);
	element.appendChild(observerDom);
    
	observerDom.scrollTop = maxHeight;
	observerDom.scrollLeft = maxWidth;
    
	const fn = (e) => {callback && callback(e);};
	observerDom.addEventListener('scroll', fn, supportsPassive ? { passive: true } : false);

    
	return () => observerDom.removeEventListener('scroll', fn);
};

// 监听宽高的变化
export const DOMObserveResize = (element, callback) => {
	return DOMObserver('resize', element, callback);
};
// 只监听宽度的变化
export const DOMObserveWidth = (element, callback) => {
	return DOMObserver('width', element, callback);
};
// 只监听高度的变化
export const DOMObserveHeight = (element, callback) => {
	return DOMObserver('height', element, callback);
};

// export default DOMObserver;
