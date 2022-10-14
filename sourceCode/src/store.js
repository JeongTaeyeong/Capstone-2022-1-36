// 전역 변수, 함수 등을 관리하는 vue 프론트엔드 js 파일
// + 페이지 접근 권한 제어 파일
import Vue from "vue"
import Vuex from "vuex"
// import createPersistedState from "vuex-persistedstate"

// Vuex 선언
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: false,
    access: 0,
      nftname:""
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getAccess(state) {
      return state.access;
    },
      getNft(state){
      return state.nftname;
  }
  },
  mutations: {
    changeToken(state, token) {
      state.token = token
    },
    changeAccess(state, access) {
      state.access = access
    },
      changeNft(state,nftname){
          state.nftname = nftname;
      }
  },
  actions: {

  },
  modules: {

  },
  // plugins: [createPersistedState()],
})

