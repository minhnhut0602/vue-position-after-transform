// out: ..
<template lang="jade">
.vc-pat
  .vc-pat-container(:style="style" v-el:con :class="containerClass")
    slot
</template>

<script lang="coffee">
pos = top:"top",center:"center",bottom:"bottom",justify:"justify",left:"left",right:"right"
valigns = [pos.top,pos.center,pos.bottom]
haligns = [pos.left,pos.center,pos.justify,pos.right]
origins = [pos.left,pos.center,pos.right]

module.exports =

  mixins:[
    require("vue-mixins/onElementResize")
  ]

  props:
    "valign":
      type: String
      default: pos.top
    "halign":
      type: String
      default: pos.left
    "update":
      type: Boolean
      default: false
    "childwidth":
      type: String
      default: "mean"
    "origin":
      type: String
      default: pos.center
    "rotatedParent":
      type: Boolean
      default: false
    "containerClass":
      default: ""

  data: ->
    style:
      position:"relative"
      width: "100%"
      height: "100%"

  methods:
    resetChildren: ->
      lastChild = null
      for child in @$children
        if child.isPatc
          child.resetV(@valign != pos.bottom)
          child.resetH(@halign != pos.right)
          lastChild = child
      if lastChild? and @halign == pos.justify
        child.resetH(false)
    doUpdate: ->
      @resetChildren()
      containerElement = @$els.con
      container = {width: containerElement.offsetWidth, height: containerElement.offsetHeight}
      if @rotatedParent
        @style.width = container.width+'px'
        @style.height = container.height+'px'
        @style.visibility = "hidden"
        document.body.appendChild containerElement
      @$nextTick =>
        unless @$el
          document.body.removeChild containerElement if @rotatedParent
          return
        containerRect = containerElement.getBoundingClientRect()
        getRelativeDim = (dim) ->
          top: containerRect.top - dim.top
          bottom: dim.bottom - containerRect.bottom
          left: containerRect.left - dim.left
          right: dim.right - containerRect.right
          width: dim.width
          height: dim.height
        children = []
        totalWidth = 0
        processChild = (child) ->
          if child.isPatc
            dim = child.$el.getBoundingClientRect()
            totalWidth += dim.width
            children.push
              vm: child
              dim: getRelativeDim(dim)
              set: (path, value) ->
                child.$set("style.#{path}", value)
        for child in @$children
          processChild(child)
        if children.length > 0
          ## vertical align
          @valign = pos.top if valigns.indexOf(@valign) == -1
          if @valign == pos.center
            for child in children
              child.set pos.top,  child.dim.top + (container.height - child.dim.height) / 2 + 'px'
          else
            for child in children
              child.set @valign, child.dim[@valign] + 'px'


          ## horizontal align
          if haligns.indexOf(@halign) == -1
            @halign = pos.left
          else
            if children.length == 1 && @halign == pos.justify
              @halign = pos.center
          if origins.indexOf(@origin) == -1
            @origin == pos.center
          offset = 0
          space = 0
          if @halign == pos.justify
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
              return parseInt(@childwidth)
          getRelativePosition = (child, origin=@origin) =>
            if origin == pos.left
              return 0
            else if origin == pos.right
              return getWidth(child) - child.dim.width
            else
              return (getWidth(child) - child.dim.width)/2
          getTail = (child,origin=@origin) =>
            if origin == pos.left
              return getRelativePosition(child, pos.right)
            else if origin == pos.right
              return getRelativePosition(child, pos.left)
            else
              return getRelativePosition(child, origin)
          if totalWidth > container.width
            totalWidth = container.width
          meanWidth = totalWidth / children.length
          if @halign == pos.center
            position = (container.width - totalWidth )/2 - (getRelativePosition(children[0])-getTail(children[children.length-1]))/2
            for child,i in children
              child.set pos.left, position + child.dim.left + getOffset(child) + getRelativePosition(child) + 'px'
          else if @halign == pos.justify
            for child,i in children
              if i == 0
                child.set pos.left, child.dim.left + getOffset(child) + 'px'
                if @origin == pos.right
                  offset -= getRelativePosition(child, pos.center)
                else if @origin == pos.left or @origin == pos.center
                  offset += getRelativePosition(children[children.length-1], pos.center)
              else if i == children.length-1
                child.set pos.right, child.dim.right + 'px'
              else
                child.set pos.left, child.dim.left + getOffset(child)+ getRelativePosition(child) + 'px'
          else
            for child in children
              child.set @halign, child.dim[@halign] + getOffset(child) + 'px'
        if @rotatedParent
          @$el.appendChild containerElement
          @style.width = "100%"
          @style.height = "100%"
          @style.visibility = null
  attached: ->
    @doUpdate()
    if @update
      @dispose = @onElementResize @$el, @doUpdate

  detached: ->
    @dispose?()

</script>
