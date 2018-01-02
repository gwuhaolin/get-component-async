# get-component-async
load component async for react router

## Use
install by:
```bash
npm i -S get-component-async
```
code by:
```jsx harmony
import getComponentAsync from 'get-component-async';

<HashRouter>
    <Route path='/sub' component={getComponentAsync(
      // webpack code split
      () => import('./sub')
    )}
    />
</HashRouter>
```
`./sub` is code is:
```jsx harmony
export default class Sub extends Component {
  render() {
    return <div>sub</div>;
  }
}
```

