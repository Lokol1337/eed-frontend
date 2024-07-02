<template>
  <div class="card w-100">
    <!-- <img class="card-img-top" alt="Card image cap" /> -->
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">
        {{ description }}
      </p>
      <center>
        <div class="w-100">
          <p class="text-primary bg-black w-100 m-0">Треннировка</p>
          <ul class="w-100 p-1">
            <li
              class="d-flex justify-content-between p-0 me-2 my-1 w-100"
              v-for="normative in normatives"
              :key="normative.id"
            >
              <button
                class="btn btn-primary w-100 my-0 me-2"
                @click.prevent="goToPath('/p-302-o', normative.id)"
              >
                {{ normative.name }}
              </button>
              <button class="btn btn-secondary px-2 py-0 m-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </center>

      <!-- <center>
            <div class="dropdown d-none">
                <button class="btn btn-outline dropdown-toggle w-100" type="button" id="dropdownMenuButton1" 
                style="background-color: #292c63; color: #f4f7fa;" data-bs-toggle="dropdown" aria-expanded="false">
                Экзамен
                </button>
                <ul class="dropdown-menu w-100 h-100" aria-labelledby="dropdownMenuButton1">

                <li>
                    <button class="btn btn-secondary w-100 h-100" 
                    @click.prevent="goToPath('/p-302-o',11, 0)">Приведение в первоначальное состояние</button>
                </li>
                <li><button class="btn btn-secondary w-100 h-100"  
                    @click.prevent="goToPath('/p-302-o',12, 0)">Настройка</button></li>
                <li>
                    <button class="btn btn-secondary w-100 h-100"  
                    @click.prevent="goToPath('/p-302-o',21, 0)">Настройка на себя</button>
                </li>
                
                </ul>
            </div>
            </center> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    normatives: {
      type: Object,
    },
  },
  methods: {
    goToPath(route, norm = 0, is_training = 1) {
      this.$router.push({ path: route, query: { norm: norm, it: is_training } });
    },
  },
};
</script>
