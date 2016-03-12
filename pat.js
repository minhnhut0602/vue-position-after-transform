var haligns, origins, pos, valigns;

pos = {
  top: "top",
  center: "center",
  bottom: "bottom",
  justify: "justify",
  left: "left",
  right: "right"
};

valigns = [pos.top, pos.center, pos.bottom];

haligns = [pos.left, pos.center, pos.justify, pos.right];

origins = [pos.left, pos.center, pos.right];

module.exports = {
  mixins: [require("vue-mixins/onElementResize")],
  props: {
    "valign": {
      type: String,
      "default": pos.top
    },
    "halign": {
      type: String,
      "default": pos.left
    },
    "update": {
      type: Boolean,
      "default": false
    },
    "childwidth": {
      type: String,
      "default": "mean"
    },
    "origin": {
      type: String,
      "default": pos.center
    },
    "rotatedParent": {
      type: Boolean,
      "default": false
    },
    "containerClass": {
      "default": ""
    }
  },
  data: function() {
    return {
      style: {
        position: "relative",
        width: "100%",
        height: "100%"
      }
    };
  },
  methods: {
    resetChildren: function() {
      var child, j, lastChild, len, ref;
      lastChild = null;
      ref = this.$children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        if (child.isPatc) {
          child.resetV(this.valign !== pos.bottom);
          child.resetH(this.halign !== pos.right);
          lastChild = child;
        }
      }
      if ((lastChild != null) && this.halign === pos.justify) {
        return child.resetH(false);
      }
    },
    doUpdate: function() {
      var container, containerElement;
      this.resetChildren();
      containerElement = this.$els.con;
      container = {
        width: containerElement.offsetWidth,
        height: containerElement.offsetHeight
      };
      if (this.rotatedParent) {
        this.style.width = container.width + 'px';
        this.style.height = container.height + 'px';
        this.style.visibility = "hidden";
        document.body.appendChild(containerElement);
      }
      return this.$nextTick((function(_this) {
        return function() {
          var child, children, containerRect, getOffset, getRelativeDim, getRelativePosition, getTail, getWidth, i, j, k, l, len, len1, len2, len3, len4, len5, m, meanWidth, n, o, offset, position, processChild, ref, space, totalWidth;
          if (!_this.$el) {
            if (_this.rotatedParent) {
              document.body.removeChild(containerElement);
            }
            return;
          }
          containerRect = containerElement.getBoundingClientRect();
          getRelativeDim = function(dim) {
            return {
              top: containerRect.top - dim.top,
              bottom: dim.bottom - containerRect.bottom,
              left: containerRect.left - dim.left,
              right: dim.right - containerRect.right,
              width: dim.width,
              height: dim.height
            };
          };
          children = [];
          totalWidth = 0;
          processChild = function(child) {
            var dim;
            if (child.isPatc) {
              dim = child.$el.getBoundingClientRect();
              totalWidth += dim.width;
              return children.push({
                vm: child,
                dim: getRelativeDim(dim),
                set: function(path, value) {
                  return child.$set("style." + path, value);
                }
              });
            }
          };
          ref = _this.$children;
          for (j = 0, len = ref.length; j < len; j++) {
            child = ref[j];
            processChild(child);
          }
          if (children.length > 0) {
            if (valigns.indexOf(_this.valign) === -1) {
              _this.valign = pos.top;
            }
            if (_this.valign === pos.center) {
              for (k = 0, len1 = children.length; k < len1; k++) {
                child = children[k];
                child.set(pos.top, child.dim.top + (container.height - child.dim.height) / 2 + 'px');
              }
            } else {
              for (l = 0, len2 = children.length; l < len2; l++) {
                child = children[l];
                child.set(_this.valign, child.dim[_this.valign] + 'px');
              }
            }
            if (haligns.indexOf(_this.halign) === -1) {
              _this.halign = pos.left;
            } else {
              if (children.length === 1 && _this.halign === pos.justify) {
                _this.halign = pos.center;
              }
            }
            if (origins.indexOf(_this.origin) === -1) {
              _this.origin === pos.center;
            }
            offset = 0;
            space = 0;
            if (_this.halign === pos.justify) {
              space = (container.width - totalWidth) / (children.length - 1);
            }
            getOffset = function(child) {
              var tmp;
              tmp = offset;
              offset += getWidth(child);
              offset += space;
              return tmp;
            };
            getWidth = function(child) {
              if (_this.childwidth === "mean") {
                return meanWidth;
              } else if (_this.childwidth === "actual") {
                return child.dim.width;
              } else {
                return parseInt(_this.childwidth);
              }
            };
            getRelativePosition = function(child, origin) {
              if (origin == null) {
                origin = _this.origin;
              }
              if (origin === pos.left) {
                return 0;
              } else if (origin === pos.right) {
                return getWidth(child) - child.dim.width;
              } else {
                return (getWidth(child) - child.dim.width) / 2;
              }
            };
            getTail = function(child, origin) {
              if (origin == null) {
                origin = _this.origin;
              }
              if (origin === pos.left) {
                return getRelativePosition(child, pos.right);
              } else if (origin === pos.right) {
                return getRelativePosition(child, pos.left);
              } else {
                return getRelativePosition(child, origin);
              }
            };
            if (totalWidth > container.width) {
              totalWidth = container.width;
            }
            meanWidth = totalWidth / children.length;
            if (_this.halign === pos.center) {
              position = (container.width - totalWidth) / 2 - (getRelativePosition(children[0]) - getTail(children[children.length - 1])) / 2;
              for (i = m = 0, len3 = children.length; m < len3; i = ++m) {
                child = children[i];
                child.set(pos.left, position + child.dim.left + getOffset(child) + getRelativePosition(child) + 'px');
              }
            } else if (_this.halign === pos.justify) {
              for (i = n = 0, len4 = children.length; n < len4; i = ++n) {
                child = children[i];
                if (i === 0) {
                  child.set(pos.left, child.dim.left + getOffset(child) + 'px');
                  if (_this.origin === pos.right) {
                    offset -= getRelativePosition(child, pos.center);
                  } else if (_this.origin === pos.left || _this.origin === pos.center) {
                    offset += getRelativePosition(children[children.length - 1], pos.center);
                  }
                } else if (i === children.length - 1) {
                  child.set(pos.right, child.dim.right + 'px');
                } else {
                  child.set(pos.left, child.dim.left + getOffset(child) + getRelativePosition(child) + 'px');
                }
              }
            } else {
              for (o = 0, len5 = children.length; o < len5; o++) {
                child = children[o];
                child.set(_this.halign, child.dim[_this.halign] + getOffset(child) + 'px');
              }
            }
          }
          if (_this.rotatedParent) {
            _this.$el.appendChild(containerElement);
            _this.style.width = "100%";
            _this.style.height = "100%";
            return _this.style.visibility = null;
          }
        };
      })(this));
    }
  },
  attached: function() {
    this.doUpdate();
    if (this.update) {
      return this.dispose = this.onElementResize(this.$el, this.doUpdate);
    }
  },
  detached: function() {
    return typeof this.dispose === "function" ? this.dispose() : void 0;
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=vc-pat><div :style=style v-el:con=v-el:con :class=containerClass class=vc-pat-container><slot></slot></div></div>"
