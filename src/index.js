export function Handler (state) {
  this._initialState = state || {}
  this.handlers   = {}
}

Handler.prototype = {
  initialState (state) {
    this._initialState = state
  },

  add(key, fn) {
    this.handlers[key] = fn
    return fn
  },

  reducer (state, event) {
    if (state == null) state = this._initialState
    if (null == this.handlers[ event.type ]) return state
    if (null != this.invariants[ event.type ]) this.invariants[ event.type ](event)

    return this.handlers[ event.type ](state, event)
  }
}

export default new Handler()
