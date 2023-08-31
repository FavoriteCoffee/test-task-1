import { createRouter, createWebHistory } from 'vue-router'
import BuyersNames from "@/BuyersNames.vue";
import ProductsAndPrices from "@/ProductsAndPrices.vue";
import FinalResult from "@/FinalResult.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/one', component: BuyersNames, alias: '/'},
    { path: '/two', component: ProductsAndPrices},
    { path: '/three', component: FinalResult}
  ]
})


