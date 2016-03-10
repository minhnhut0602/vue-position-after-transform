env = null
describe "position-after-transform", ->

  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/basic.vue"))
    after ->
      unloadComp(env)

    it "should work", ->
