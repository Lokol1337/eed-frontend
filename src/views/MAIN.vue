<template>
  <div class="main">
    <div class="mb-4 w-100 p-1" style="background-color: #292c63">
      <div class="col-12 col-md-12 d-flex justify-content-center align-items-center">
        <img src="@/icons/mirea2.png" height="40" />
        <h6 class="m-0" style="color: white">&nbsp;&nbsp;ВУЦ РТУ МИРЭА</h6>
      </div>
    </div>

    <div class="container pt-5" style="background-color: #f4f7fa">
      <div class="row d-dlex justify-content-center">
        <div class="col-12 col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center">
          <ApparatCard
            v-for="apparat in apparats"
            v-on:editNormative="editNormative($event)"
            v-on:changeVisibility="changeVisibility($event)"
            v-on:deleteNormative="deleteNormative($event)"
            :key="apparat.id"
            :isAdmin="isAdmin"
            :name="apparat.name"
            :description="apparat.description"
            :normatives="apparat.normatives"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueSession from "vue-session";
import ApparatCard from "../components/ApparatCard.vue";

Vue.use(VueSession);

export default {
  components: {
    ApparatCard,
  },
  data() {
    return {
      isAdmin: true,
      apparats: [
        {
          id: 1,
          name: "П-302-О",
          description:
            "Аппаратура для уплотнения кабеля дальней связи П-296 и радиорелейных линий двенадцатью телефонными каналами.",
          normatives: [
            {
              id: 11,
              name: "Приведение в первоначальное состояние",
              status: true,
            },
            {
              id: 12,
              name: "Настройка",
              status: true,
            },
            {
              id: 21,
              name: "Настройка на себя",
              status: true,
            },
          ],
        },
      ],
    };
  },
  methods: {
    goToPath(route, norm = 0, is_training = 1) {
      this.$router.push({ path: route, query: { norm: norm, it: is_training } });
    },
    editNormative(normative_id) {
      console.log("editNormative(" + normative_id + ")");
    },
    changeVisibility(normative_id) {
      console.log("changeVisibility(" + normative_id + ")");
    },
    deleteNormative(normative_id) {
      console.log("deleteNormative(" + normative_id + ")");
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.main {
  // background-image: url("../images/background.png");
}
</style>
