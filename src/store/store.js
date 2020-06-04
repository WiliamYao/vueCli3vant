import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     datalists:[],
     city:'',
     groups:'',
     TvName:'',
     cityErea:''
  },
  mutations: {
      setlists(state,list){
        state.datalists=list;
      },
      setCityName(state,name){
        state.city = name
      },
      setGroupsName(state,names){
          state.groups = names;
      },
      setTvName(state,name){
          state.TvName = name;
      },
      setCityErea(state,name){
        state.cityErea = name;
      }
  },
  actions: {
      setlistsFun(context,list){
          context.commit("setlists",list);

      },
      setCityNameFun(context,name){
        context.commit("setCityName",name);
      },
      setGroupsNameFun(context,names){
          context.commit('setGroupsName',names);
      },
      setTvnameFun(context,name){
        context.commit('setTvName',name);
      },
      setCityEreaFun(context,name){
        context.commit('setCityErea',name);
      }

  }
})
