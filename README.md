# Handler

## install

```
npm install --save bc-handler babel-polyfill
```

> Note: `babel-polyfill` is required on all `github.com/DrawboardLtd/bc-...` modules

## Example with Redux

```javascript
// ./store.js
import { createStore } from "redux"
import { handler }     from "bc-handler"

export const reducer = handler({
  count: 0
})

export const register = reducer.register
export const store    = createStore(reducer)
export dispatch       = store.dispatch.bind(dispatch)
```

```javascript
// ./handlers/count_inc.js
import {
  dispatch, 
  register,
} from "../store"

export const intent = () =>
  dispatch({ type: "COUNT_INC" })

register("COUNT_INC", $$$ => ({
  ...$$$,
  count: $$$.count + 1
}))
```

```javascript
// ./handlers/count_dec.js
import {
  dispatch, 
  register,
} from "../store"

export const intent = () =>
  dispatch({ type: "COUNT_DEC" })

register("COUNT_DEC", $$$ => ({
  ...$$$,
  count: $$$.count + 1
}))
```

```javascript
// ./handlers/count_lol.js
import { intent as counterInc } from "./count_inc"
import { intent as counterDec } from "./count_dec"

export const intent = () => {
  counterInc()
  counterInc()
  counterDec()
}
```

```javascript
// ./components/counter/index.js
import React, { Component }     from "react"
import { connect }              from "react-redux"
import { intent as counterInc } from "../../handlers/count_inc"
import { intent as counterDec } from "../../handlers/count_dec"
import { intent as counterLol } from "../../handlers/count_lol"

export class Counter extends Component {
  render () {
    return <div>
      <button onClick={ () => counterDec() }>-</button>
      { this.props.count }
      <button onClick={ () => counterInc() }>+</button>
      <button onClick={ () => counterLol() }>++-</button>
    </div>
  }
}

export default connect(
  $$$ => ({ count: $$$.count })
)(Counter)
```
