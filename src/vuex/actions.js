/**
 * Created by 新思 on 2017/3/6.
 */
export default {
  change_navigationTitle (state,data){
    state.navigationTitle = data;
  },
  setNavigationShow ({commit},data) {
    commit("change_navigationShow", data)
  },
  setnowClassify ({commit},data){
    commit("change_nowClassify", data)
  },
  setmessageNumber ({commit},data){
    commit("change_messageNumber", data)
  },
  setproblem ({commit},data){
    commit("change_problem", data)
  },
  setcity ({commit},data){
    commit("change_city", data)
  },
  setpayData ({commit},data) {
    commit("change_payData", data)
  },
  setIngot ({commit},data) {
    commit("change_ingot", data)
  },




}
