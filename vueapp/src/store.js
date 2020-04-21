import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate"; 

Vue.use(Vuex);

const  getDefaultState=()=>{
  return {
      person:{
          id:'',
          firstName:'',
          lastName:'',
          currentRole:'',
          isActive:false,
      }
  }
}

export default new Vuex.Store({
  plugins:[createPersistedState()],
  state: {
    person: {
      id: '',
      firstName: "",
      lastName:'',
      currentRole:"",
      isActive:false,
    },
  },
  mutations: {
    updateId(state, id) {
      state.person.id = id
    },
    updateFirstName(state, firstName) {
      state.person.firstName = firstName
    },
    updateLastName(state, lastName) {
        state.person.lastName = lastName
      },
    updateCurrentRol(state,currentRole){
      state.person.currentRole = currentRole
    },
    updateIsActive(state, isActive){
      state.person.isActive = isActive
    },
    resetState(state){
        Object.assign(state,getDefaultState())
    },

  },
  actions: {
    setPersonId({ commit }, id) {
      commit('updateId', id)
    },
    setPersonFirstName({ commit }, firstName) {
      commit('updateFirstName', firstName)
    },
    setPersonLastName({ commit }, lastName) {
        commit('updateLastName', lastName)
      },
    setCurrentRol({commit}, currentRole){
      commit('updateCurrentRol',currentRole)
    },
    isActive({commit}, active){
      commit('updateIsActive', active)
    },
    resetPersonState({commit}){
      commit('resetState')
    },
  },
})