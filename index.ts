import {Component, createElement} from 'react';

/**
 * 异步加载组件
 * @param load 组件加载函数，load 函数会返回一个 Promise，在文件加载完成时 resolve
 * @returns {AsyncComponent} 返回一个高阶组件用于封装需要异步加载的组件
 */
export default function getComponentAsync<T>(load: () => Promise<{
    default: T
}>) {
    return class AsyncComponent extends Component<{}, {
        component?: T
    }> {

        shouldComponentUpdate() {
            return false;
        }

        componentDidMount() {
            // 在高阶组件 DidMount 时才去执行网络加载步骤
            load().then(({default: component}) => {
                // 代码加载成功，获取到了代码导出的值，调用 setState 通知高阶组件重新渲染子组件
                this.setState({
                    component,
                }, () => {
                    this.forceUpdate();
                })
            });
        }

        render() {
            const {component = null} = this.state || {};
            if (component) {
                // component 是 React.Component 类型，需要通过 React.createElement 生产一个组件实例
                return createElement(component as any);
            }
            return null;
        }
    }
}