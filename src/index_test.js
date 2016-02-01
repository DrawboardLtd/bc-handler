import { Handler } from "./index"
import { equal } from "assert"

const DEPOSIT  = "DEPOSIT"
const WITHDRAW = "WITHDRAW"

describe("Handler", () => {
  describe("balance", () => {
    var hdl = new Handler()

    hdl.initialState(0)

    hdl.add(WITHDRAW, (state, { amount }) => {
      return state - amount
    })

    hdl.add(DEPOSIT, (state, { amount }) => {
      return state + amount
    })

    describe("reducer", () => {
      it("first event", () => {
        const expect = 50
        const output = hdl.reducer(null, { type:DEPOSIT, amount:expect })
        equal(expect, output)
      })

      it("deposit", () => {
        const expect = 100
        const output = hdl.reducer(50, { type:DEPOSIT, amount:50 })
        equal(expect, output)
      })

      it("withdraw", () => {
        const expect = 50
        const output = hdl.reducer(100, { type:WITHDRAW, amount:50 })
        equal(expect, output)
      })
    })
  })
})
