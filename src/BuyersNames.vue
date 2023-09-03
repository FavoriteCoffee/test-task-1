<template>
  <div class="text-h4" style="margin: 10px">Введите имена покупателей</div>

  <hr><br>


  <div v-for="(buyer, ind) in this.$store.state.buyers" :key="ind">
    <v-card
      class="mx-auto"
      max-width="500"
      variant="outlined"
      style="margin-bottom: 10px;">

      <v-card-item style="float: left">
        <div class="text-h6 mb-1">{{ buyer.name }}</div>
      </v-card-item>
      <v-card-actions style="float: right">
        <v-btn variant="outlined"  @click="this.$store.commit('delBuyer', ind)">
          X
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>

  <v-text-field label="Введите имя" @change="this.$store.state.tempBuyerName = $event.target.value">

  </v-text-field>
  <v-btn @click="this.$store.commit('addBuyer', this.$store.state.tempBuyerName)">+</v-btn>

</template>

<script>

export default {


  methods: {
    change(){
      this.$store.commit('increment', 10)
    },
    add(val){
      this.$store.commit('addBuyer', val)
    }

  }
}
</script>

<style scoped>

</style>
