# observe-dom-resize
# DOM元素监听尺寸变化

*****
> 该插件通过一定巧妙的策略，使得任意元素可以监听resize 事件, 通过事件驱动回调，相比MutationObserver 或者循环检查 性能更高, 兼容ie9以上所有浏览器
*****

## 安装方法
```javascript
    npm install observe-dom-resize
```

## 示例

### 监听dom尺寸变化
```javascript
    import DOMObserver, {
        DOMObserverResize,
	    DOMObserveWidth,
        DOMObserveHeight
    } from 'observer-dom-resize';

    const someDom = document.querySelector('.some');
    // 监听dom尺寸变化
    const unObserver1 = DOMObserver('resize', someDom, () => {
        console.log('DOM 尺寸发生变化了')
    })

    // 监听Dom 的Width变化
     const unObserver2 = DOMObserveWidth(someDom, () => {
        console.log('DOM width发生变化了');
    }); // ===  DOMObserver('width', someDom, ()=> {})

    // 监听Dom 的Height变化
    const unObserver3 = DOMObserveWidth(someDom, () => {
        console.log('DOM height发生变化了');
    }); // ===  DOMObserver('height', someDom, ()=> {})

    // 监听Dom 的resize变化
    const unObserver4 = DOMObserveResize(some, () => {
        console.log('DOM 尺寸发生变化了');
    }); // ===  DOMObserver('resize', someDom, ()=> {})

    // 取消监听dom
    unObserver1(); unObserver2(); unObserver3(); unObserver4();
```

> Note: DOMObserver type 只能为 resize, width, height