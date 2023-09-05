<template>
  <div class="text-h4" style="margin: 10px">Введите названия и цены продуктов</div>

  <hr><br>

<!--  Цикл вывода карточек с информацией о продукте-->
  <div v-for="(product, ind) in this.$store.state.products" :key="ind">
    <v-card
      class="mx-auto"
      max-width="650"
      variant="outlined"
      style="margin-bottom: 10px;">

      <v-card-actions style="float: right; border-bottom: #777; max-width: 200px;">
          <v-btn variant="outlined" @click="this.$store.commit('delProduct', ind)">X</v-btn>
          <v-btn variant="outlined" @click="change(ind)">править</v-btn>
      </v-card-actions>

      <v-card-item style="float: left; max-width: 500px; margin: 0;">
<!--        Название и цена продукта-->
        <h3 style="float: top; margin-right: 100px;">{{ product.name }} - {{ product.cost }}</h3>

<!--        Блок выбора покупателя и тех кто ел-->
        <div style="float: bottom">
          <div style="float: left; margin-right: 15px;">
            <p>кто платил?</p>

            <v-radio-group v-for="(buyer, ind) in this.$store.state.buyers" :key="ind" v-model="product.buyer">
              <v-radio  :label="buyer.name" :value="ind" style="margin-bottom: 19px"></v-radio>
            </v-radio-group>

          </div>

          <div style="float: right">
            <p>кто ел?</p>
            <div v-for="(buyer, ind) in this.$store.state.buyers" :key="ind">
              <v-checkbox  style="margin: 0; padding: 0;" :label="buyer.name" :value="ind" v-model="product.eaters"></v-checkbox>
            </div>
          </div>
        </div>
      </v-card-item>
    </v-card>
  </div>


<!--  Блок добалвления нового продукта-->
  <v-text-field label="Введите название товара" @blur="this.$store.state.tempProduct.name = $event.target.value"
                v-model="this.tempProductName">
  </v-text-field>

  <v-text-field label="Введите стоимость товара"
                v-model="tempProductCost" v-on:keyup="setTempProductCost"/>

  <v-btn @click="add" style="width: 100%;" >+</v-btn>

  {{ this.$store.state.products }}
  {{ tempProductEaters }}
</template>


<script>


export default {
  name: "ProductsAndPrices",
  data: () => ({
    model: null,

    tempProductCost: null,
    tempProductName: '',
    tempProductBuyer: null,
    tempProductEaters: [],
  }),
  methods: {
    setTempProductCost(v) {
      const val = v.target.value.replace(/[^0-9.-]/g, "");
      this.tempProductCost = val;
      this.$store.state.tempProduct.cost = val;
    },
    add(){
      if(this.tempProductName && this.tempProductCost) {
        this.$store.commit('addProduct', Array.from(this.tempProductEaters), this.tempProductBuyer )
        this.tempProductCost = ''
        this.tempProductName = ''
        this.tempProductBuyer = null
        this.tempProductEaters = []
      }
    },
    change(ind){
      this.tempProductCost = this.$store.state.products[ind].cost
      this.tempProductName = this.$store.state.products[ind].name
      this.tempProductBuyer = this.$store.state.products[ind].buyer
      this.tempProductEaters = Array.from(this.$store.state.products[ind].eaters)
      this.i = ind
      this.$store.commit('delProduct', ind)
    }
  }
}


</script>

<style scoped>

</style>
