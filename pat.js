module.exports = {
  mixins: [require("vue-mixins/onElementResize")],
  props: {
    "valign": {
      type: String,
      "default": "top"
    },
    "halign": {
      type: String,
      "default": "left"
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
      "default": "center"
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
    doUpdate: function() {
      var child, j, lastChild, len, ref;
      lastChild = null;
      ref = this.$children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        if (child.isPatc) {
          if (this.valign === "bottom") {
            child.$set("style.bottom", "0");
            child.$set("style.top", null);
          } else {
            child.$set("style.top", "0");
            child.$set("style.bottom", null);
          }
          if (this.halign === "right") {
            child.$set("style.right", "0");
            child.$set("style.left", null);
          } else {
            child.$set("style.left", "0");
            child.$set("style.right", null);
          }
          lastChild = child;
        }
      }
      if ((lastChild != null) && this.halign === "justify") {
        lastChild.$set("style.right", "0");
        lastChild.$set("style.left", null);
      }
      return this.$nextTick((function(_this) {
        return function() {
          var childPosition, children, container, getOffset, getRelativePosition, getWidth, i, k, l, len1, len2, len3, len4, len5, len6, len7, len8, m, meanWidth, n, o, offset, p, position, processChild, q, r, ref1, results, results1, results2, results3, space, totalWidth;
          if (!_this.$el) {
            return;
          }
          container = _this.$els.con.getBoundingClientRect();
          children = [];
          totalWidth = 0;
          processChild = function(child) {
            var dim;
            if (child.isPatc) {
              dim = child.$el.getBoundingClientRect();
              totalWidth += dim.width;
              return children.push({
                vm: child,
                dim: dim,
                set: function(path, value) {
                  return child.$set("style." + path, value);
                }
              });
            }
          };
          ref1 = _this.$children;
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            child = ref1[k];
            processChild(child);
          }
          if (_this.valign === "top") {
            for (l = 0, len2 = children.length; l < len2; l++) {
              child = children[l];
              child.set("top", container.top - child.dim.top + 'px');
            }
          } else if (_this.valign === "center") {
            position = (container.bottom - container.top) / 2 + container.top;
            for (m = 0, len3 = children.length; m < len3; m++) {
              child = children[m];
              childPosition = (child.dim.bottom - child.dim.top) / 2 + child.dim.top;
              child.set("top", position - childPosition + 'px');
            }
          } else {
            for (n = 0, len4 = children.length; n < len4; n++) {
              child = children[n];
              child.set("bottom", child.dim.bottom - container.bottom + 'px');
            }
          }
          if (children.length === 1 && _this.halign === "justify") {
            _this.halign = "center";
          }
          if (totalWidth > container.width) {
            totalWidth = container.width;
          }
          meanWidth = totalWidth / children.length;
          offset = 0;
          space = 0;
          if (_this.halign === "justify") {
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
            if (origin === "left") {
              return 0;
            } else if (origin === "right") {
              return getWidth(child) - child.dim.width;
            } else {
              return (getWidth(child) - child.dim.width) / 2;
            }
          };
          if (_this.halign === "right") {
            results = [];
            for (o = 0, len5 = children.length; o < len5; o++) {
              child = children[o];
              results.push(child.set("right", child.dim.right - container.right + getOffset(child) + 'px'));
            }
            return results;
          } else if (_this.halign === "center") {
            position = container.left + container.width / 2 - totalWidth / 2 + getRelativePosition(children[children.length - 1], "center");
            results1 = [];
            for (i = p = 0, len6 = children.length; p < len6; i = ++p) {
              child = children[i];
              if (i === 0) {
                child.set("left", position - child.dim.left + getOffset(child) + 'px');
                if (_this.origin === "right") {
                  results1.push(offset -= getRelativePosition(child, "right"));
                } else {
                  results1.push(void 0);
                }
              } else {
                results1.push(child.set("left", position - child.dim.left + getOffset(child) + getRelativePosition(child) + 'px'));
              }
            }
            return results1;
          } else if (_this.halign === "justify") {
            results2 = [];
            for (i = q = 0, len7 = children.length; q < len7; i = ++q) {
              child = children[i];
              if (i === 0) {
                child.set("left", container.left - child.dim.left + getOffset(child) + 'px');
                if (_this.origin === "right") {
                  results2.push(offset -= getRelativePosition(child, "center"));
                } else if (_this.origin === "left") {
                  results2.push(offset += getRelativePosition(children[children.length - 1], "center"));
                } else {
                  results2.push(void 0);
                }
              } else if (i === children.length - 1) {
                results2.push(child.set("right", child.dim.right - container.right + 'px'));
              } else {
                results2.push(child.set("left", container.left - child.dim.left + getOffset(child) + getRelativePosition(child) + 'px'));
              }
            }
            return results2;
          } else {
            results3 = [];
            for (r = 0, len8 = children.length; r < len8; r++) {
              child = children[r];
              results3.push(child.set("left", container.left - child.dim.left + getOffset(child) + 'px'));
            }
            return results3;
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
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=vc-pat><div v-bind:style=style v-el:con=v-el:con class=vc-pat-container><slot></slot></div></div>"
