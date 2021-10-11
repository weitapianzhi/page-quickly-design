export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  render(h) {
    const { info } = this
    const _props = {
      "class": {},
      props: {},
      attrs: {},
      domProps: {}
    }
    if(info.innerText && info.innerText !== "") {
      _props.domProps.innerHTML = info.innerText
    }
    return h(info.tagName, _props)
  }
}