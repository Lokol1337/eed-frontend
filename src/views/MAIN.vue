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
        <div
          class="col-12 col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center"
          v-if="data != null"
        >
          <EquipmentCard
            v-for="equipment in data.equipments"
            @goToNormative="(arg) => goToNormative(...arg)"
            v-on:editNormative="editNormative($event)"
            v-on:changeVisibility="changeVisibility($event)"
            v-on:deleteNormative="deleteNormative($event)"
            :key="equipment.id"
            :isAdmin="data.isAdmin"
            :name="equipment.name"
            :name_eng="equipment.name_eng"
            :description="equipment.description"
            :normatives="equipment.normatives"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueSession from "vue-session";
import EquipmentCard from "../components/EquipmentCard.vue";
import ServerHandler from "@/handlers/ServerHandler.js";

Vue.use(VueSession);

export default {
  components: {
    EquipmentCard,
  },
  data() {
    return {
      data: null,
      last_data: {
        isAdmin: true,
        equipments: [
          {
            id: 1,
            name: "П-302-О",
            name_eng: "P-302-O",
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
      },
    };
  },
  methods: {
    goToPath(route, norm = 0, is_training = 1) {
      this.$router.push({ path: route, query: { norm: norm, it: is_training } });
    },
    goToNormative(equipment_name_eng, normative_id, isTranning) {
      // console.log("goToNormative()", equipment_name_eng, normative_id, isTranning);
      this.goToPath("/" + equipment_name_eng, normative_id, isTranning);
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
    async sendRequest() {
      this.serverHandler = new ServerHandler(this.$session.id());
      this.serverHandler.getListEquipmentsNormatives(this);

      let maxCount = 10;
      let currentCount = 0;
      while (this.data == null && currentCount < maxCount) {
        console.log("Жду...");
        currentCount += 1;
        setTimeout(500);
      }
      console.log("sendRequest() дождался");
    },
    setEquipment(new_data) {
      console.log("data: ", new_data);
      this.data = new_data;
    },
  },
  async created() {
    console.log("created()");
    await this.sendRequest();
  },
};
</script>

<style lang="scss" scoped>
.main {
  // background-image: url("../images/background.png");
}
</style>
