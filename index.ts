import {Component, createElement, ReactElement} from 'react';

interface IState {
    instance?: ReactElement<any>
}

/**
 * 异步加载组件
 * @param load 组件加载函数，load 函数会返回一个 Promise，在文件加载完成时 resolve
 * @returns {AsyncComponent} 返回一个高阶组件用于封装需要异步加载的组件
 */
export default function getComponentAsync<T>(load: () => Promise<{
    default: T
}>) {
    return class AsyncComponent extends Component<{}, IState> {

        state: IState = {};

        shouldComponentUpdate(_: any, nextState: IState) {
            return this.state.instance !== nextState.instance;
        }

        componentDidMount() {
            // 在高阶组件 DidMount 时才去执行网络加载步骤
            load().then(({default: component}) => {
                // 代码加载成功，获取到了代码导出的值，调用 setState 通知高阶组件重新渲染子组件
                this.setState({
                    instance: createElement(component as any),
                })
            });
        }

        render() {
            return this.state.instance || null;
        }
    }
}