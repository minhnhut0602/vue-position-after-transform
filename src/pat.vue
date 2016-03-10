// out: ..
<template lang="jade">
.vc-pat
  .vc-pat-container(v-bind:style="style" v-el:con)
    slot
</template>

<script lang="coffee">
module.exports =

  mixins:[
    require("vue-mixins/onElementResize")
  ]

  props:
    "valign":
      type: String
      default: "top"
    "halign":
      type: String
      default: "left"
    "update":
      type: Boolean
      default: false

  data: ->
    style:
      position:"relative"
      width: "100%"
      height: "100%"

  methods:
    doUpdate: ->
      if @valign == "bottom"
        for child in @$children
          if child.isPatc
            child.$set("style.bottom","0")
      if @halign == "right"
        for child in @$children
          if child.isPatc
            child.$set("style.right","0")
      @$nextTick =>
        return unless @$el
        container = @$els.con.getBoundingClientRect()
        children = []
        totalWidth = 0
        processChild = (child) ->
          if child.isPatc
            dim = child.$el.getBoundingClientRect()
            totalWidth += dim.width
            children.push
              vm: child
              dim: dim
              set: (path, value) ->
                child.$set("style.#{path}", value)
        for child in @$children
          processChild(child)
        if children.length == 1 && @halign == "justify"
          @halign = "center"
        if @valign == "top"
          for child in children
            child.set "top", container.top - child.dim.top+ 'px'
        else if @valign == "center"
          position = (container.bottom - container.top) / 2 + container.top
          for child in children
            childPosition = (child.dim.bottom - child.dim.top) / 2 + child.dim.top
            child.set "top", position - childPosition+ 'px'
        else
          for child in children
            child.set "bottom", child.dim.bottom - container.bottom + 'px'
        width = 0
        if @halign == "right"
          for child in children
            child.set "right", child.dim.right - container.right + width + 'px'
            width += child.dim.width
        else if @halign == "center"
          position = (container.right - container.left) / 2 + container.left
          for child in children
            childPosition = (child.dim.right - child.dim.left) / 2 + child.dim.left
            widthCorrection = (totalWidth - child.dim.width)/2
            child.set "left", position - childPosition + width - widthCorrection + 'px'
            width += child.dim.width
        else if @halign == "justify"
          space = (container.width - totalWidth) / (children.length - 1)
          for child,i in children
            left = container.left - child.dim.left + width
            if i > 0
              left += space
            child.set "left", left + 'px'
            width += child.dim.width
        else
          for child in children
            child.set "left", container.left - child.dim.left + width + 'px'
            width += child.dim.width
  attached: ->
    @doUpdate()
    if @update
      @dispose = @onElementResize @$el, @doUpdate

  detached: ->
    @dispose?()


</script>
