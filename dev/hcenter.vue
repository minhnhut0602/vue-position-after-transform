<template lang="jade">
.container
  a(href="https://github.com/vue-comps/vue-position-after-transform/blob/master/dev/hcenter.vue") source
  p width: 200px; height: 100px; padding: 10px, halign="center"
  pat(halign="center" style="width: 200px;height: 100px; padding: 10px")
    patc.rotate90 Test
    patc.rotate90 Testlonglong
    patc.rotate90 Test
  p width: 200px; height: 100px; padding: 10px, halign="center", origin="left"
  pat(halign="center" origin="left" style="width: 200px;height: 100px; padding: 10px")
    patc.rotatepos Test
    patc.rotatepos Testlonglong
    patc.rotatepos Test
  p width: 200px; height: 100px; padding: 10px, halign="center", origin="right"
  pat(halign="center" origin="right" style="width: 200px;height: 100px; padding: 10px")
    patc.rotateneg Test
    patc.rotateneg Testlonglong
    patc.rotateneg Test
  p width: 200px; height: 100px; padding: 10px, halign="center", origin="left"
  pat(halign="center" origin="left" style="width: 200px;height: 100px; padding: 10px")
    patc.rotatepos Testlonglong
    patc.rotatepos Test
    patc.rotatepos Testlonglong
  p width: 200px; height: 100px; padding: 10px, halign="center", origin="left"
  pat(halign="center" origin="left" style="width: 200px;height: 100px; padding: 10px")
    patc.rotatepos Test
    patc.rotatepos Testlong
    patc.rotatepos Testlonglong
  p width: 200px; height: 100px; padding: 10px, halign="center", valign="center"
  pat(halign="center" valign="center" style="width: 200px;height: 100px; padding: 10px")
    patc.rotateneg Testlonglong
    patc.rotateneg Testlong
    patc.rotateneg Test
  p width: 200px; height: 100px; padding: 10px, halign="center", valign="center"
  pat(halign="center" valign="center" style="width: 200px;height: 100px; padding: 10px")
    patc.rotateneg Testlonglong
    patc.rotateneg Test
    patc.rotateneg Test
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
.rotate90
  transform rotate(-90deg)
.rotateneg
  transform rotate(-45deg)
.rotatepos
  transform rotate(45deg)
  //transform-origin top left
.container > a
  position absolute
  line-height 300px
  text-align center
  left 0
  bottom 0
  top 0
  right 0

</style>
