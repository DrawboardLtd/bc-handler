export function handler ($$$) {
  let handlers = {}

  function reducer (state = $$$, event) {
    if (handlers[ event.type ] == null) return state
    return handlers[ event.type ](state, event)
  }

  reducer.register = (key, fn) => {
    handlers[key] = fn
    return fn
  }

  return reducer
}
