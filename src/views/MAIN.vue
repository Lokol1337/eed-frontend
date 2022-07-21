<template>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col-6 d-flex justify-content-center">
          <div class="card" style="width: 18rem">
            <!-- <img class="card-img-top" alt="Card image cap" /> -->
            <div class="card-body">
              <h5 class="card-title">П-302-О</h5>
              <p class="card-text">
                Аппаратура для уплотнения кабеля дальней связи П-296 и
                радиорелейных линий двенадцатью телефонными каналами.
              </p>
              <button class="btn btn-primary" @click.prevent="goToPath('/p-302-o')">Начать</button>
            </div>
          </div>
        </div>
        <div class="col-6 d-flex justify-content-center">
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
        <div class="col-4 d-flex justify-content-center">
          <img src="./mirea1.png" width="150" height="150">
        </div>
        <div class="col-4 d-flex justify-content-center">
          <img src="./mirea2.png" width="150" height="150">
        </div>
        <div class="col-4 d-flex justify-content-center">
          <img src="./mirea3.png" width="150" height="150">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToPath(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  // background-image: url("../images/background.png");

}
</style>