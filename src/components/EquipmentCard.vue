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
              class="d-flex justify-content-between p-0 me-2 my-2 w-100"
              v-for="normative in normatives"
              :key="normative.id"
            >
              <button
                class="btn btn-primary w-100 my-0 me-2"
                @click="goToNormative(normative.id, 1)"
              >
                {{ normative.name }}
              </button>

              <div v-if="isAdmin" class="d-flex justify-content-between">
                <button
                  class="btn btn-secondary px-2 py-0 m-0 me-1 h-100"
                  @click="editNormative(normative.id)"
                >
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
                <button
                  class="btn btn-secondary px-2 py-0 m-0 me-1 h-100"
                  @click="changeVisibility(normative.id)"
                >
                  <svg
                    v-if="normative.status"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path
                      d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-eye-slash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"
                    />
                    <path
                      d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"
                    />
                  </svg>
                </button>
                <button
                  class="btn btn-danger py-0 px-2 m-0 h-100"
                  @click="confirmRemouvingNormative(normative.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
                    />
                  </svg>
                </button>
              </div>
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
                    @click.prevent="goToPath('/P-302-O',11, 0)">Приведение в первоначальное состояние</button>
                </li>
                <li><button class="btn btn-secondary w-100 h-100"  
                    @click.prevent="goToPath('/P-302-O',12, 0)">Настройка</button></li>
                <li>
                    <button class="btn btn-secondary w-100 h-100"  
                    @click.prevent="goToPath('/P-302-O',21, 0)">Настройка на себя</button>
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
    isAdmin: {
      type: Boolean,
    },
    name: {
      type: String,
    },
    name_eng: {
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
    confirmRemouvingNormative(normative_id) {
      let flag = confirm(
        "Вы уверены, что хотите удалить этот норматив? Внимание! В случае подтверждения норматив будет удалён навсегда!"
      );
      if (flag) this.deleteNormative(normative_id);
    },
    goToNormative(normative_id, isTranning) {
      this.$emit("goToNormative", [this.name_eng, normative_id, isTranning]);
    },
    editNormative(normative_id) {
      this.$emit("editNormative", normative_id);
    },
    changeVisibility(normative_id) {
      this.$emit("changeVisibility", normative_id);
    },
    deleteNormative(normative_id) {
      this.$emit("deleteNormative", normative_id);
    },
  },
};
</script>
