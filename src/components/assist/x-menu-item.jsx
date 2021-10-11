export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  render(h) {
    const { list } = this
    function iconType(item) {
      if (item.iconType !== '') {
        return (
          <a-icon type={item.iconType} />
        )
      } else if (item.iconClassName !== '') {
        return (
          <i class={item.iconClassName} />
        )
      }
    }

    function createXMenu(list) {
      return list.map((item)=> {
        if (item.children.length === 0) {
          return (
            <a-menu-item disabled={item.disabled === '是'} key={item.key}>
              {
                iconType(item)
              }
              {item.title}
            </a-menu-item>
          )
        } else if (item.children.length > 0) {
          return (<a-sub-menu key={item.key}>
            <span slot="title" class="submenu-title-wrapper">
              {
                iconType(item)
              }
              {item.title}
            </span>
            {
              createXMenu(item.children)
            }
          </a-sub-menu>)
        }
      })
    }
    return (
      <a-menu mode="horizontal">
        {
          createXMenu(list)
        }
      </a-menu>
    )
  }
}