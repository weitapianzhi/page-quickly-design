export default {
  bind(el: any, binding: any) :void{
    el.draggable = true
    el.addEventListener("dragstart", (event: any): boolean => {
      binding.value.dragStartCallback(event)
      return false
    })
    el.addEventListener("drag", (event: any): void => {
      binding.value.dragCallback(event)
    })
    el.addEventListener("dragend", (event: any): void => {
      binding.value.dragendCallback(event)
    })
  },
  ubbind() :void{
    // to do..
  },
}