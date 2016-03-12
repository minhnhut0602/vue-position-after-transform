<template lang="jade">
doctype html
.container
  a(href="https://github.com/vue-comps/vue-position-after-transform/blob/master/dev/rotatedParent.vue") source
  p width: 100px; height: 50px; padding: 10px
  pat.rotateParent(rotated-parent style="width: 100px;height: 50px; padding: 10px")
    patc.rotate Test
  p width: 100px; height: 50px; padding: 10px, halign="center"
  pat.rotateParent(rotated-parent halign="center" style="width: 100px;height: 50px; padding: 10px")
    patc.rotate Test
</template>

<script lang="coffee">
module.exports =
  components:
    "pat": require "../pat.js"
    "patc": require "../patc.js"
</script>

<style lang="stylus">
.vc-pat
  border 1px solid black
.vc-patc
  border 1px dashed black
.vc-pat-container
  border 1px dotted black
.rotate
  transform rotate(-45deg)
.rotateParent
  transform-origin top left
  transform rotate(-10deg)
  // -6.28
  // -1.97
  //transform-origin top left
.container > a
  position absolute
  line-height 350px
  text-align center
  left 0
  bottom 0
  top 0
  right 0

</style>
