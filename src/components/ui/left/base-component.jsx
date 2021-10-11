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
    if(info.description) {
      _props.domProps.innerHTML = info.description
    }
    return h(info.tagName, _props)
  }
}