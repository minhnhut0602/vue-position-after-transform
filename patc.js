module.exports = {
  data: function() {
    return {
      style: {
        position: "absolute",
        top: null,
        bottom: null,
        left: null,
        right: null
      },
      isPatc: true
    };
  },
  methods: {
    resetV: function(top) {
      if (top) {
        this.style.top = 0;
        return this.style.bottom = null;
      } else {
        this.style.top = null;
        return this.style.bottom = 0;
      }
    },
    resetH: function(left) {
      if (left) {
        this.style.left = 0;
        return this.style.right = null;
      } else {
        this.style.left = null;
        return this.style.right = 0;
      }
    }
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div :style=style class=vc-patc><slot></slot></div>"
