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
    "childwidth":
      type: String
      default: "mean"
    "origin":
      type: String
      default: "center"

  data: ->
    style:
      position:"relative"
      width: "100%"
      height: "100%"

  methods:
    doUpdate: ->
      lastChild = null
      for child in @$children
        if child.isPatc
          if @valign == "bottom"
            child.$set("style.bottom","0")
            child.$set("style.top",null)
          else
            child.$set("style.top","0")
            child.$set("style.bottom",null)
          if @halign == "right"
            child.$set("style.right","0")
            child.$set("style.left",null)
          else
            child.$set("style.left","0")
            child.$set("style.right",null)
          lastChild = child
      if @halign == "justify"
        lastChild.$set("style.right","0")
        lastChild.$set("style.left",null)
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
        ## vertical align

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

        ## horizontal align
        if children.length == 1 && @halign == "justify"
          @halign = "center"
        meanWidth = totalWidth / children.length
        offset = 0
        space = 0
        if @halign == "justify"
          space = (container.width - totalWidth) / (children.length - 1)
        getOffset = (child) =>
          tmp = offset
          offset += getWidth(child)
          offset += space
          return tmp
        getWidth = (child) =>
          if @childwidth == "mean"
            return meanWidth
          else if @childwidth == "actual"
            return child.dim.width
          else
            return @childwidth
        getRelativePosition = (child) =>
          if @origin == "left"
            return 0
          else if @origin == "right"
            return getWidth(child) - child.dim.width
          else
            return (getWidth(child) - child.dim.width)/2
        if @halign == "right"
          for child in children
            child.set "right", child.dim.right - container.right + getOffset(child) + 'px'
        else if @halign == "center"
          position = container.left + container.width / 2 - totalWidth / 2
          for child,i in children
            child.set "left", position - child.dim.left + getOffset(child) + getRelativePosition(child) + 'px'
        else if @halign == "justify"
          for child,i in children
            if i == 0
              child.set "left", container.left - child.dim.left + getOffset(child) + 'px'
            else if i == children.length-1
              child.set "right", child.dim.right - container.right + 'px'
            else
              child.set "left", container.left - child.dim.left + getOffset(child)+ getRelativePosition(child) + 'px'
        else
          for child in children
            child.set "left", container.left - child.dim.left + getOffset(child) + 'px'
  attached: ->
    @doUpdate()
    if @update
      @dispose = @onElementResize @$el, @doUpdate

  detached: ->
    @dispose?()


</script>
