import { handler } from "./index"
import { deepEqual } from "assert"

const INC = "INC"
const DEC = "DEC"

const inc = { type:INC }
const dec = { type:DEC }

describe("handler", () => {
  var reducer  = handler({ count:0 })
  var register = reducer.register

  register(INC, $$$ => ({
    ...$$$,
    count: $$$.count + 1
  }))

  register(DEC, $$$ => ({
    ...$$$,
    count: $$$.count - 1
  }))

  const test = ([ desc, init, event, out ]) => {
    it(desc, () => {
      deepEqual(
        reducer(init, event),
        out
      )
    })
  }

  var tests = [
    [ "no initial state", undefined, inc, { count:1 } ],
    [ "count 5 inc", { count:5 }, inc, { count:6 } ],
    [ "count 5 dec", { count:5 }, dec, { count:4 } ],
  ]

  for (let t of tests) test(t)
})

