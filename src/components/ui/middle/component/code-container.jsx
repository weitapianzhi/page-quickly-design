import storeMixin from "@/mixins/core/storeMixin.js";
export default {
  props: {},
  mixins: [
    storeMixin
  ],
  data() {
    return {
      code: ""
    }
  },
  methods: {
    init() {
      if(this.utils.isEmpty(this.baseData)) return
      const queue = [ this.baseData ]
      const code = this.createCode(queue)
      this.code = code
    },

    /**
     * <template
     *    class=""
     *    style=""
     * >{{value}}</template>
     */
    createCode(list = []) {
      const res = []
      for (let i = 0; i < list.length; i++) {
        let _code = "";
        let childCode = "";
        const _item = list[i];
        const { $attr, $children, $on, ___xObj___ } = _item
        if($children && $children.length > 0) {
          childCode = this.createCode($children).join("\n")
        }
        let _tagName = ___xObj___.tagName ? ___xObj___.tagName : "div"
        let _style = $attr.style ? `style="${$attr.style}"` : ""
        let _innerText = ___xObj___.innerText ? '\n' + ___xObj___.innerText + '\n' : ""
        let _childCode = childCode ? '\n' + childCode + '\n' : ""
        _code = `<${_tagName} class="${$attr.className}" ${_style}>${_innerText}${_childCode}</${_tagName}>`
        res.push(_code)
      }
      return res
    }
  },
  render() {
    this.init()
    const { code } = this
    return (
      <div>
        <textarea style="width:100%;height: 300px">{code}</textarea>
      </div>
    )
  }
}