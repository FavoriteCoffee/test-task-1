import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      testArray: [{name:'a'},
        {name: 'b'}, {name: 'c'}],
      arr: '',
      tempBuyerName:'',
      buyers: [{name:'f'},
        {name: 's'}, {name: 't'}],
      tempProduct: {
        name: '',
        cost: ''
      },
      products: [],
    }
  },
  mutations: {
    addBuyer(state) {
      state.buyers.push({name: state.tempBuyerName})
    },
    delBuyer(state, ind){
      state.buyers.splice(ind, 1)
    },
    addProduct(state) {
      state.products.push({name: state.tempProduct.name,
        cost: state.tempProduct.cost,
        buyer: null,
        eaters: []})
      console.log(state.products)
    },
    delProduct(state, ind){
      state.products.splice(ind, 1)
    },
    chooseBuyer(state, ind,  name){
      state.products[ind].buyer = name
    },
    chooseEaters(state, ind, names){
      state.products[ind].eaters = names
    },
  }
})

export default store;



