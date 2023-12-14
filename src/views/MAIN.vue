<template>
  <div class="main">

    <div class="mb-4 w-100 p-1" style="background-color: #292c63;">
        <div class="col-12 col-md-12 d-flex justify-content-center align-items-center">
          <img src="./mirea2.png" height="40">
          <h6 class="m-0" style="color: white">&nbsp;&nbsp;ВУЦ РТУ МИРЭА</h6>
        </div>
        <!--<div class="col-12 col-md-4 d-flex justify-content-center">
          <img src="./mirea1.png" height="40">
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-center">
          <img src="./mirea3.png" height="40">
        </div>-->
    </div>

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
                  <button class="btn btn-outline dropdown-toggle w-100" type="button" id="dropdownMenuButton1" 
                  style="background-color: #292c63; color: #f4f7fa;" data-bs-toggle="dropdown" aria-expanded="false">
                    Треннировка
                  </button>
                  <ul class="dropdown-menu w-100 h-100" aria-labelledby="dropdownMenuButton1">
                    <li>
                      <button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',11)">Настройка аппаратуры</button>
                    </li>
                    <li>
                      <button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',21)">Норматив по фильму</button>
                    </li>
                    <!-- <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',11)">Шаг 1.1</button></li> -->
                    <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',12)">Шаг 1.2</button></li>
                    <!-- <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',13)">Шаг 1.3</button></li>
                    <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',14)">Шаг 1.4 </button></li>
                    <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',15)">Шаг 1.5 </button></li>
                    <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',16)">Шаг 1.6</button></li>
                    <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',18)">Шаг 1.8 </button></li>
                    <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',19)">Шаг 1.9 </button></li> -->
                  </ul>
                </div>
              </center>
              <center>
                <div class="dropdown ">
                  <button class="btn btn-outline dropdown-toggle w-100" type="button" id="dropdownMenuButton1" 
                  style="background-color: #292c63; color: #f4f7fa;" data-bs-toggle="dropdown" aria-expanded="false">
                    Экзамен
                  </button>
                  <ul class="dropdown-menu w-100 h-100" aria-labelledby="dropdownMenuButton1">
                    
                    <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o', 11, 0)">Настройка аппаратуры</button></li>
                    <!-- <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',11, 0)">Шаг 1.1</button></li> -->
                    <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',12, 0)">Шаг 1.2</button></li>
                    <!-- <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',13, 0)">Шаг 1.3</button></li>
                    <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',14, 0)">Шаг 1.4 </button></li>
                    <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',15, 0)">Шаг 1.5 </button></li>
                    <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',16, 0)">Шаг 1.6</button></li>
                    <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',18, 0)">Шаг 1.8 </button></li>
                    <li><button class="btn btn-outline w-100 h-100"  style="background-color: #292c63; color: #f4f7fa;"
                      @click.prevent="goToPath('/p-302-o',19, 0)">Шаг 1.9 </button></li> -->
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
              <button class="btn btn-outline" style="background-color: #292c63; color: #f4f7fa;" 
                @click.prevent="goToPath('/p-327-2')">Начать</button>
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
              <button class="btn btn-outline" style="background-color: #292c63; color: #f4f7fa;"
                @click.prevent="goToPath('/p-330-6')">Начать</button>
            </div>
          </div>
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
    goToPath(route,norm = 0, is_training = 1) {
      this.$router.push({path: route, query: { norm: norm , it: is_training}});
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