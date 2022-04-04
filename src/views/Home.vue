<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>
            Дизайнер оборудования
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-4 d-flex justify-content-center">
          <div class="card" style="width: 18rem;">
            <div class="d-flex justify-content-center">
              <img 
                src="@/assets/icons/components.svg" 
                class="card-img-top"
                style="color: red; width: 75px; height 75px" 
              >
            </div>            
            <div class="card-body">
              <h5 class="card-title">Компоненты</h5>
              <p class="card-text">
                <span>
                  Создание компонентов
                </span> 
              </p>
              <button @click.prevent="toCreateComponentPage" href="#" class="btn btn-primary">Перейти</button>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4 d-flex justify-content-center">
          <div class="card" style="width: 18rem;">
            <div class="d-flex justify-content-center">
              <img 
                src="@/assets/icons/warning.svg" 
                class="card-img-top"
                style="color: red; width: 75px; height 75px" 
              >
            </div>            
            <div class="card-body">
              <h5 class="card-title">Внимание!</h5>
              <p class="card-text">
                <span>
                  Данный стенд является тестовым.
                </span>
                <span>
                  Создан с целью демонстрации возможности создания оборудования и его компонентов.
                </span> 
              </p>
              <span class="badge bg-danger">Не использовать в продакшене!</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4 d-flex justify-content-center">
          <div class="card" style="width: 18rem;">
            <div class="d-flex justify-content-center">
              <img 
                src="@/assets/icons/hardware.svg" 
                class="card-img-top"
                style="color: red; width: 75px; height 75px" 
              >
            </div>            
            <div class="card-body">
              <h5 class="card-title">Оборудование</h5>
              <p class="card-text">
                <span>
                  Создание оборудования
                </span> 
              </p>
              <button @click.prevent="toCreateHardwarePage" class="btn btn-primary">Перейти</button>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4 d-flex justify-content-center mt-3">
          <div class="card" style="width: 18rem;">
            <div class="d-flex justify-content-center">
              <img 
                src="@/assets/icons/hardware.svg" 
                class="card-img-top"
                style="color: red; width: 75px; height 75px" 
              >
            </div>            
            <div class="card-body">
              <h5 class="card-title">Просмотр оборудованиея</h5>
              <p class="card-text">
                <span>
                  Не интерактивный шаблон
                </span> 
              </p>
              <button @click.prevent="toHardwaresViewPage" class="btn btn-primary">Перейти</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <h2>
            При поддержке 
          </h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12">                
          <div style="display: flex; justify-content: space-around;">
            <a href="https://www.mirea.ru/" target="_blank">
              <img src="@/assets/logo-mirea.png"  style="width: 100px; height: 100px">
            </a>
            <a href="https://vuc.mirea.ru/" target="_blank">
              <img src="@/assets/logo-vuc.png"  style="width: 100px; height: 100px">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toCreateComponentPage() {
      this.$router.push('/create-component').catch(() => {});
    },
    toCreateHardwarePage() {
      this.$router.push('/create-hardware').catch(() => {});
    },
    toHardwaresViewPage() {
      this.$router.push('/hardwares-view').catch(() => {});
    }
  }
}
</script>
