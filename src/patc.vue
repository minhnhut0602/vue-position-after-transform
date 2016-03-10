// out: ..
<template lang="jade">
.vc-patc(v-bind:style="style")
  slot
</template>

<script lang="coffee">
module.exports =
  data: ->
    style:
      position: "absolute"
    isPatc: true
</script>
