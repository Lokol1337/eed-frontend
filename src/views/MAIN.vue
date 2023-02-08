<template>
  <div class="main">
    <div class="container pt-5" style="background-color: #f4f7fa;">
      <div class="row d-dlex justify-content-center">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
          <div class="card" style="width: 18rem">
            <!-- <img class="card-img-top" alt="Card image cap" /> -->
            <div class="card-body">
              <h5 class="card-title">П-302-О</h5>
              <p class="card-text">
                Аппаратура для уплотнения кабеля дальней связи П-296 и
                радиорелейных линий двенадцатью телефонными каналами.
              </p>
              <center>
                <div class="dropdown ">
                  <button class="btn btn-primary dropdown-toggle w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Прохождение норматива
                  </button>
                  <ul class="dropdown-menu w-100 h-100" aria-labelledby="dropdownMenuButton1">
                    
                    <li><button class="btn btn-primary w-100 h-100" @click.prevent="goToPath('/p-302-o',11)">Норматив 1.1</button></li>
                    <li><button class="btn btn-primary w-100 h-100" @click.prevent="goToPath('/p-302-o',12)">Норматив 1.2</button></li>
                    <li><button class="btn btn-primary w-100 h-100" @click.prevent="goToPath('/p-302-o',13)">Норматив 1.3</button></li>
                    <li><button class="btn btn-primary w-100 h-100" @click.prevent="goToPath('/p-302-o',14)">Норматив 1.4 </button></li>
                    <li><button class="btn btn-primary w-100 h-100" @click.prevent="goToPath('/p-302-o',16)">Норматив 1.6</button></li>
                    <li><button class="btn btn-primary w-100 h-100" @click.prevent="goToPath('/p-302-o',18)">Норматив 1.8 </button></li>
                    <li><button class="btn btn-primary w-100 h-100" @click.prevent="goToPath('/p-302-o',19)">Норматив 1.9 </button></li>
                  </ul>
                </div>
              </center>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
          <div class="card" style="width: 18rem">
            <!-- <img class="card-img-top" alt="Card image cap" /> -->
            <div class="card-body">
              <h5 class="card-title">П-327-2</h5>
              <p class="card-text">
                Комплекс аппаратуры тонального телеграфирования П-327 используется для организации 
                сетей открытой и закрытой телеграфной связи обеспечивающий документированный обмен
                информацией между пунктами управления различных звеньев управления.
              </p>
              <button class="btn btn-primary" @click.prevent="goToPath('/p-327-2')">Начать</button>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
          <div class="card" style="width: 18rem">
            <!-- <img class="card-img-top" alt="Card image cap" /> -->
            <div class="card-body">
              <h5 class="card-title">П-330-6</h5>
              <p class="card-text">
                Аппаратура для образования шести каналов тональной частоты по радиорелейным, тропосферным и кабельным (П-296, П-268) линиям связи.
              </p>
              <button class="btn btn-primary" @click.prevent="goToPath('/p-330-6')">Начать</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 col-md-4 d-flex justify-content-center">
          <img src="./mirea1.png" width="150" height="150">
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-center">
          <img src="./mirea2.png" width="150" height="150">
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-center">
          <img src="./mirea3.png" width="150" height="150">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueSession from "vue-session";
Vue.use(VueSession);
export default {

  
  methods: {
    goToPath(route,norm = 0) {
      this.$router.push({path: route, query: { norm: norm }});
    },
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