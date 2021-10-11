import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("xNodeData",{
      "prev": state => state.prev,
      "next": state => state.next,
      "baseData": state => state.baseData,
    }),
    ...mapState("cssData",{
      "customCss": state => state.customCss,
      "defaultCss": state => state.defaultCss,
    })
  },
  methods: {
    ...mapActions("xNodeData",[
      "setPrev",
      "setNext",
      "setBaseData"
    ]),
    ...mapActions("cssData",[
      "setCustomCss",
      "setDefaultCss",
    ]),
  }
}