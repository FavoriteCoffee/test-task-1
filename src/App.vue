<!--Основной компонент -->
<template>
  <div class="conteiner-fuild" style="max-width: 700px; margin: 0 auto;">

    <div class="text-h3" style="margin: 10px">Делим счет</div>
    <v-divider :thickness="6"></v-divider>

    <router-view></router-view>

    <div class="text-center">
      <v-pagination  @click="newPage()"
                     v-model="page"
                     :length="3"
                     rounded="circle"
      ></v-pagination>

    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        page: 1,
      }
    },
    methods: {
      //Переключение компонентов
      newPage(){
        if(this.page === 1){
          this.$router.push('/one')
        }
        else if(this.page === 2){
          this.$router.push('/two')
        }
        else if(this.page === 3){
          this.$router.push('/three')
        }
        if(this.page === 3){
          this.$store.commit('fillInDebtMatrix')
        }
      }
    },
    components:{
  }
  }
</script>

