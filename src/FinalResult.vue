<template>
  <div class="text-h4" style="margin: 10px">В итоге</div>

  <hr><br>

  <v-card
    class="mx-auto"
    max-width="650"
    variant="outlined"
    style="margin-bottom: 10px;">
    <v-card-item>
      <div v-if="this.$store.getters.checkPaymentForProducts">
        <div v-if="this.$store.state.result.length > 0">
          <h3 v-for="debt in this.$store.state.result" :key="debt">
            {{ debt }}
          </h3>
        </div>

        <h3 v-else>Никто никому ничего не должен</h3>
      </div>

      <h3 v-else>Укажите кто платил за каждый продукт на предыдущей странице</h3>
    </v-card-item>



  </v-card>

</template>

<script>
export default {
  name: "FinalResult"
}
</script>

<style scoped>

</style>
