import {
  Component,
  ComponentClass,
  createElement,
  ReactElement,
  ReactNode,
  SFC
} from "react";

interface IState {
  instance?: ReactElement<any>;
}

let defaultLoading: ReactNode = null;

/**
 * 统一设置默认的 loading
 * @param {React.ReactNode} loading
 */
export function setDefaultLoading(loading: ReactNode) {
  defaultLoading = loading;
}

/**
 * 异步加载组件
 * @param load 组件加载函数，load 函数会返回一个 Promise，在文件加载完成时 resolve
 * @param loading 在对应的源码的异步代码没有加载到前，临时暂时的loading
 * @returns {AsyncComponent} 返回一个高阶组件用于封装需要异步加载的组件
 */
export function getComponentAsyncByElement<Props>(
  load: () => Promise<{
    default: ReactElement<Props>;
  }>,
  loading?: ReactNode
) {
  return class AsyncComponent extends Component<{}, IState> {
    state: IState = {};

    shouldComponentUpdate(_: any, nextState: IState) {
      return this.state.instance !== nextState.instance;
    }

    componentDidMount() {
      // 在高阶组件 DidMount 时才去执行网络加载步骤
      load().then(({ default: element }) => {
        // 代码加载成功，获取到了代码导出的值，调用 setState 通知高阶组件重新渲染子组件
        this.setState({
          instance: element
        });
      });
    }

    render() {
      return this.state.instance || loading || defaultLoading;
    }
  };
}

/**
 * 异步加载组件
 * @param load 组件加载函数，load 函数会返回一个 Promise，在文件加载完成时 resolve
 * @param loading 在对应的源码的异步代码没有加载到前，临时暂时的loading
 * @param props 传给组件的属性
 * @returns {AsyncComponent} 返回一个高阶组件用于封装需要异步加载的组件
 */
export function getComponentAsync<Props>(
  load: () => Promise<{
    default: ComponentClass<Props> | SFC<Props>;
  }>,
  loading?: ReactNode,
  props?: Props
) {
  return getComponentAsyncByElement(() => {
    // 在高阶组件 DidMount 时才去执行网络加载步骤
    return load().then(({ default: component }) => {
      // 代码加载成功，获取到了代码导出的值，调用 setState 通知高阶组件重新渲染子组件
      return {
        default: createElement(component, props)
      };
    });
  }, loading);
}

export function getElementAsync<Props>(
  load: () => Promise<{
    default: ComponentClass<Props> | SFC<Props>;
  }>,
  loading?: ReactNode,
  props?: Props
) {
  return createElement(getComponentAsync(load, loading, props));
}

export default getComponentAsync;
