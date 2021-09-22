import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("storageData",{
      "prev": state => state.prev,
      "next": state => state.next,
      "baseData": state => state.baseData 
    })
  },
  methods: {
    ...mapActions("storageData",[
      "setPrev",
      "setNext",
      "setBaseData"
    ]),
  }
}