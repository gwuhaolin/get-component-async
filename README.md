# get-component-async

load component async for react router

## Use

install by:

```bash
npm i -S get-component-async
```

#### For react router

```jsx harmony
import getComponentAsync from "get-component-async";

<HashRouter>
  <Route
    path="/sub"
    component={getComponentAsync(
      // webpack code split
      () => import("./sub")
    )}
  />
</HashRouter>;
```

`./sub` is code is:

```jsx harmony
export default class Sub extends Component {
  render() {
    return <div>sub</div>;
  }
}
```

#### For big component

```jsx harmony
import { getElementAsync } from "get-component-async";

<div>
  ...others
  {getElementAsync(() => import("./bigComponent"))}
</div>;
```

#### Show loading before loaded

```jsx harmony
import { getElementAsync } from "get-component-async";

<div>
  ...others
  {getElementAsync(() => import("./bigComponent"), <Loading />)}
</div>;
```

#### Set default loading before loaded

```jsx harmony
import { setDefaultLoading } from "get-component-async";

setDefaultLoading(<Loading />);
```
