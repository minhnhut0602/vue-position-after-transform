// out: ..
<template lang="jade">
.vc-patc(:style="style")
  slot
</template>

<script lang="coffee">
module.exports =
  data: ->
    style:
      position: "absolute"
      top: null
      bottom: null
      left: null
      right: null
    isPatc: true
  methods:
    resetV: (top) ->
      if top
        @style.top = 0
        @style.bottom = null
      else
        @style.top = null
        @style.bottom = 0
    resetH: (left) ->
      if left
        @style.left = 0
        @style.right = null
      else
        @style.left = null
        @style.right = 0
</script>
