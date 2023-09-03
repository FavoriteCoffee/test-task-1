import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      testArray: [{name:'a'},
        {name: 'b'}, {name: 'c'}],

      tempBuyerName:'',

      buyers: [{name:'f'},
        {name: 's'}, {name: 't'}],

      tempProduct: {
        name: '',
        cost: ''
      },
      products: [],
      buyersMap: new Map(),
      debtMatrix: [],
      // paymentMatrix: [[null, 60, 300, 160],
      //                 [100, null, 50, 250],
      //                 [90, 200, null, 30],
      //                 [70, 150, 40, null]]
      paymentMatrix: [],
      result: []
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


    fillBuyersMap(state){
      for (let i = 0; i < state.buyers.length; i++){
        state.buyersMap.set(i, state.buyers[i])
      }
    },fillInPaymentMatrix(state){

      for (let i = 0; i < state.buyersMap.size; i++){
        state.paymentMatrix[i] = []
        for(let j = 0; j < state.buyersMap.size; j++){
          state.paymentMatrix[i][j] = null
        }
      }

      for(let i = 0; i < state.products.length; i++){
        for (let j = 0; j < state.products[i].eaters.length; j++){
          state.paymentMatrix[state.products[i].eaters[j]][state.products[i].buyer] +=
            state.products[i].cost / state.products[i].eaters.length
        }
      }
      console.log('paymentMatrix:', state.paymentMatrix)
    },
    fillInDebtMatrix(state, payload){
      this.commit("fillBuyersMap", payload)
      this.commit("fillInPaymentMatrix", payload)

      for (let i = 0; i < state.paymentMatrix.length; i++){
        state.debtMatrix[i] = []
        for(let j = 0; j < state.paymentMatrix.length; j++){
          state.debtMatrix[i][j] = null
        }
      }

      for(let i = 0; i < state.debtMatrix.length; i++){
        for (let j = i; j < state.debtMatrix.length; j++){
          if(i !== j){
            state.debtMatrix[j][i] = state.paymentMatrix[j][i] - state.paymentMatrix[i][j]
          }
        }
      }

      for(let i = 0; i < state.debtMatrix.length; i++){
        for (let j = i; j < state.debtMatrix.length; j++){
          if(state.debtMatrix[j][i] < 0){
            state.debtMatrix[i][j] = -state.debtMatrix[j][i]
            state.debtMatrix[j][i] = null
          }
        }
      }
      console.log('DebtMatrix:', state.debtMatrix)

      this.commit("calculateResult", payload)
    },
    calculateResult(state) {
      state.result = []
      for (let i = 0; i < state.debtMatrix.length; i++) {
        for (let j = 0; j < state.debtMatrix.length; j++)
          if (state.debtMatrix[i][j]) {
            state.result.push(String(state.buyersMap.get(i).name + " должен(а) " + state.buyersMap.get(j).name + ' ' + state.debtMatrix[i][j]))
          }
      }
      console.log( state.result)
    },

    getBuyerName(state, ind){
      return state.buyersMap.get(ind)
    }
  },
  getters: {
    getNumberOfBuyers(state){
      return state.buyers.length
    }
  }
})

export default store;



