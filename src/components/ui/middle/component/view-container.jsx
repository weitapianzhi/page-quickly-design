import storeMixin from "@/mixins/core/storeMixin.js";
export default {
  methods: {
    handleClick(event) {
      this.$emit("handleClick", event)
    }
  },
  mixins: [
    storeMixin
  ],
  render(h) {
    const {
      handleClick,
      baseData
    } = this
    function createXElm(list) {
      // if(list.) 
    }
    return (
      <div 
        class="middle-wrap-content"
        onClick={handleClick}
        onDblclick={ (event) => { 
          this.$emit("handleDBLclick", event) 
        }}
        onDragenter={
          (e) => {
            e.preventDefault();
          }
        }
        onDragover={
          (e) => {
            e.preventDefault();
          }
        }
        onDrop={ (event) => { this.$emit("dropDown", event) } }
      >
        {
          createXElm()
        }
      </div>
    )
  },
  name: "view-container"
}