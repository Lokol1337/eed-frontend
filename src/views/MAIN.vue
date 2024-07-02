<template>
  <div class="main">

    <div class="mb-4 w-100 p-1" style="background-color: #292c63;">
        <div class="col-12 col-md-12 d-flex justify-content-center align-items-center">
          <img src="./mirea2.png" height="40">
          <h6 class="m-0" style="color: white">&nbsp;&nbsp;ВУЦ РТУ МИРЭА</h6>
        </div>
    </div>

    <div class="container pt-5" style="background-color: #f4f7fa;">

      <div class="row d-dlex justify-content-center">

        <div class="col-12 col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center">
          <ApparatCard v-for="apparat in apparats" :key="apparat.id"
            :name="apparat.name"
            :description="apparat.description"
            :normatives="apparat.normatives"
          />
        </div>


        <!-- <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">П-327-2</h5>
              <p class="card-text">
                Комплекс аппаратуры тонального телеграфирования П-327 используется для организации 
                сетей открытой и закрытой телеграфной связи обеспечивающий документированный обмен
                информацией между пунктами управления различных звеньев управления.
              </p>
              <button class="btn btn-outline" style="background-color: #292c63; color: #f4f7fa;" 
                @click.prevent="goToPath('/p-327-2')">Начать</button>
            </div>
          </div>
        </div> -->

        <!-- <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">П-330-6</h5>
              <p class="card-text">
                Аппаратура для образования шести каналов тональной частоты по радиорелейным, тропосферным и кабельным (П-296, П-268) линиям связи.
              </p>
              <button class="btn btn-outline" style="background-color: #292c63; color: #f4f7fa;"
                @click.prevent="goToPath('/p-330-6')">Начать</button>
            </div>
          </div>
        </div> -->
        
      </div>
      
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueSession from "vue-session";
import ApparatCard from "./ApparatCard.vue";

Vue.use(VueSession);

export default {
  components: {
    ApparatCard,
  },
  data() {
    return {
      apparats: [
        {
          id: 1,
          name: "П-302-О",
          description: "Аппаратура для уплотнения кабеля дальней связи П-296 и радиорелейных линий двенадцатью телефонными каналами.",
          normatives: [
            {
                id: 11,
                name: "Приведение в первоначальное состояние",
            }, 
            {
                id: 12,
                name: "Настройка",
            }, 
            {
                id: 21,
                name: "Настройка на себя",
            }, 
          ]
        },
      ],
    };
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.main {
  // background-image: url("../images/background.png");

}
</style>