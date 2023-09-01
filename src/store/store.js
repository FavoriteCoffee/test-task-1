import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      tempBuyerName:'',
      buyers: []
    }
  },
  mutations: {
    addBuyer(state, newName) {
      state.buyers.push({name: newName})
    },
    delBuyer(state, ind){
      state.buyers.splice(ind, 1)
    }
  }
})

export default store;



