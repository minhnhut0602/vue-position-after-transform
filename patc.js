module.exports = {
  data: function() {
    return {
      style: {
        position: "absolute"
      },
      isPatc: true
    };
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div v-bind:style=style class=vc-patc><slot></slot></div>"
