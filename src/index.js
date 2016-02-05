export function Handler (state) {
  this.$$$ = state || {}
  this.handlers = {}
}

Handler.prototype = {
  add(key, fn) {
    this.handlers[key] = fn
    return fn
  },

  reducer ($$$) {
    return (state, event) => {
      if (state == null) state = this._initialState
      if (null == this.handlers[ event.type ]) return state
      return this.handlers[ event.type ](state, event)
    }
  }
}

export default new Handler()
