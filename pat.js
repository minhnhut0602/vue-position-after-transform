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
      var child, j, k, len, len1, ref, ref1;
      if (this.valign === "bottom") {
        ref = this.$children;
        for (j = 0, len = ref.length; j < len; j++) {
          child = ref[j];
          if (child.isPatc) {
            child.$set("style.bottom", "0");
          }
        }
      }
      if (this.halign === "right") {
        ref1 = this.$children;
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          child = ref1[k];
          if (child.isPatc) {
            child.$set("style.right", "0");
          }
        }
      }
      return this.$nextTick((function(_this) {
        return function() {
          var childPosition, children, container, i, l, left, len2, len3, len4, len5, len6, len7, len8, len9, m, n, o, p, position, processChild, q, r, ref2, results, results1, results2, results3, s, space, totalWidth, width, widthCorrection;
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
          ref2 = _this.$children;
          for (l = 0, len2 = ref2.length; l < len2; l++) {
            child = ref2[l];
            processChild(child);
          }
          if (children.length === 1 && _this.halign === "justify") {
            _this.halign = "center";
          }
          if (_this.valign === "top") {
            for (m = 0, len3 = children.length; m < len3; m++) {
              child = children[m];
              child.set("top", container.top - child.dim.top + 'px');
            }
          } else if (_this.valign === "center") {
            position = (container.bottom - container.top) / 2 + container.top;
            for (n = 0, len4 = children.length; n < len4; n++) {
              child = children[n];
              childPosition = (child.dim.bottom - child.dim.top) / 2 + child.dim.top;
              child.set("top", position - childPosition + 'px');
            }
          } else {
            for (o = 0, len5 = children.length; o < len5; o++) {
              child = children[o];
              child.set("bottom", child.dim.bottom - container.bottom + 'px');
            }
          }
          width = 0;
          if (_this.halign === "right") {
            results = [];
            for (p = 0, len6 = children.length; p < len6; p++) {
              child = children[p];
              child.set("right", child.dim.right - container.right + width + 'px');
              results.push(width += child.dim.width);
            }
            return results;
          } else if (_this.halign === "center") {
            position = (container.right - container.left) / 2 + container.left;
            results1 = [];
            for (q = 0, len7 = children.length; q < len7; q++) {
              child = children[q];
              childPosition = (child.dim.right - child.dim.left) / 2 + child.dim.left;
              widthCorrection = (totalWidth - child.dim.width) / 2;
              child.set("left", position - childPosition + width - widthCorrection + 'px');
              results1.push(width += child.dim.width);
            }
            return results1;
          } else if (_this.halign === "justify") {
            space = (container.width - totalWidth) / (children.length - 1);
            results2 = [];
            for (i = r = 0, len8 = children.length; r < len8; i = ++r) {
              child = children[i];
              left = container.left - child.dim.left + width;
              if (i > 0) {
                left += space;
              }
              child.set("left", left + 'px');
              results2.push(width += child.dim.width);
            }
            return results2;
          } else {
            results3 = [];
            for (s = 0, len9 = children.length; s < len9; s++) {
              child = children[s];
              child.set("left", container.left - child.dim.left + width + 'px');
              results3.push(width += child.dim.width);
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
