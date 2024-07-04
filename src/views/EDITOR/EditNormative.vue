<template>
  <div class="p-330-6">
    <div class="container-fluid pt-4">
      <div class="row px-0">
        <div class="col-1 p-0">
          <div :key="rerenderStatmentSideBar">
            <sideBarMenu
              :key="actualPack.name"
              :allPacks="allPacks"
              @selectPackParent="selectPackHandler"
            />
          </div>
        </div>
        <div class="col-11 row justify-content-around p-0">
          <div class="col-4 align-content-center">
            <nav aria-label="breadcrumb hidden ">
              <ol class="breadcrumb m-0 p-0">
                <li class="breadcrumb-item">
                  <a href="/eed-frontend/#/main" class="svgHome">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 59 576 512"
                      class="uk-icon-up2 uk-svg"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M496 512H368a16 16 0 0 1-16-16V368a16 16 0 0 0-16-16h-96a16 16 0 0 0-16 16v128a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V311c1.78-1.21 3.85-1.89 5.47-3.35L288 115l218.74 192.9c1.54 1.38 3.56 2 5.26 3.2V496a16 16 0 0 1-16 16z"
                        class="fa-secondary"
                      ></path>
                      <path
                        d="M527.92 283.88L298.6 81.61a16 16 0 0 0-21.17 0L48.11 283.89a16 16 0 0 1-22.59-1.21L4.1 258.89a16 16 0 0 1 1.21-22.59l256-226a39.85 39.85 0 0 1 53.45 0L416 99.67V48a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v136.43l58.69 51.83a16 16 0 0 1 1.22 22.59l-21.4 23.82a16 16 0 0 1-22.59 1.21z"
                        class="fa-primary"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li class="breadcrumb-item">П-302-0</li>
                <li class="breadcrumb-item">
                  {{ actualPack.name }}
                </li>
              </ol>
            </nav>
          </div>

          <!-- <div class="col-4 d-flex justify-content-center align-items-center">
                <p class="m-0"><strong>
                {{ (10 > min) ? ('0' + min) : min }}:{{ (10 > sec) ? ('0' + sec) : sec }}
              </strong></p>
              </div> -->

          <div class="col-4 d-flex justify-content-end">
            <button
              :class="'btn btn-success w-auto me-0 ' + this.linkForNextStage()"
              @click.prevent="goToPath('/edit', getNextExercisePathId(), is_tr, min, sec)"
            >
              Перейти к следующему шагу {{ exersizeName }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid py-5">
      <div class="row mb-3 justify-content-center">
        <div class="col-1"></div>
        <div class="col-11 d-inline-flex mt-3 mb-1 justify-content-center">
          <div
            :class="'spinner-border me-3 ' + this.waitingServer()"
            role="status"
            style="width: 1.5rem; height: 1.5rem"
          >
            <span class="sr-only"></span>
          </div>
          <p id="p-annotation" class="text-center text-break m-0">
            {{ this.is_tr == 1 ? this.annotation : "" }}
          </p>
        </div>
        <!-- <div class="col-3 d-flex align-items-center justify-content-center">
          </div> -->
      </div>
      <div class="row">
        <div class="col-auto col-sm-auto col-md-auto col-lg-auto col-xl-auto p-0">
          <div style="width: 85px"></div>
        </div>
        <div
          id="canvasBlock"
          class="col-9 col-sm-9 col-md-10 col-lg-11 col-xl-11 p-0"
          style="width: auto"
        >
          <div
            id="mainBlock"
            class="hardware-view-page__canvas-wrp"
            :key="rerenderStatment"
            :style="{ zoom: `${zoom}%` }"
          >
            <hardwareCanvas
              v-for="pack in allPacks.blocks"
              :key="pack.name"
              :id="'block' + pack.id"
              v-show="pack.name === actualPack.name"
              style="z-index: 2 !important"
              :hardwareComponents="pack.components"
              :bgImage="pack.background"
              :backgroundSettings="pack.backgroundSettings"
              :sessionId="sessionId"
              :serverHandler="serverHandler"
              :stepServerData="stepServerData"
              :zoom="zoom"
              :editStatus="true"
              @ann="(i) => (annotation = i)"
              @step="(i) => (stepServerData = i)"
              @allP="(i) => rerenderAllPacks(i)"
              v-on:addStepEvent= "addSubStep"
              @completeApparat="(i) => changeBlockYellow(i)"
              @showDiscription="(arg) => showDiscription(arg)"
              @hideDiscription="(arg) => hideDiscription(arg)"
              @endStage="() => endStage()"
              @endNormative="() => endNormative()"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      id="div-notification-block"
      :class="'row notification_block' + (this.discriptionActive ? ' active' : ' d-none')"
      :style="{ top: this.discriptionActive ? '10px' : '-100px', position: 'absolute' }"
    >
      <div
        class="p-1 text-primary"
        style="position: absolute; right: 5px; width: auto; bottom: 5px"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-info-circle-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"
          />
        </svg>
        <!-- <span class="fw-bold ms-1">ПОЯСНЕНИЕ!</span> -->
      </div>

      <div class="p-0" style="text-align: justify">
        {{ this.discription }}
      </div>
    </div>

    <div :class="'congratulation_modal' + (this.congratulationActive ? ' show' : '')">
      <div class="modal_body">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <h1 class="m-0" style="font-size: 10rem">
            <strong>
              {{ 10 > min ? "0" + min : min }}:{{ 10 > sec ? "0" + sec : sec }}
            </strong>
          </h1>
        </div>
        <button class="restart btn" @click.prevent="goToPath('/main')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-box-arrow-up-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
            />
            <path
              fill-rule="evenodd"
              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
            />
          </svg>
        </button>

        <div class="col-12 d-flex justify-content-around h-auto g-0">
          <div class="col-4"></div>
          <button
            :class="'btn col-4 me-0 '"
            @click.prevent="
              goToPath('/P-302-O', String($route.query.norm[0]) + '1', is_tr, 0, 0)
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-arrow-repeat"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"
              />
              <path
                fill-rule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
              />
            </svg>
          </button>
          <button
            :class="'btn col-4 me-0 d-flex justify-content-end'"
            @click.prevent="
              goToPath('/P-302-O', String($route.query.norm[0]) + '1', is_tr, 0, 0)
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.congratulation_modal {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.3);
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
}
.congratulation_modal.show {
  visibility: unset;
  z-index: 1000;
}
.modal_body {
  width: 40%;
  height: 40%;
  background-color: white;
  padding: 2rem;
  border-radius: 15px;
  position: relative;
}
.modal_body .restart {
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
}
.notification_block {
  position: fixed;
  z-index: 1000;
  left: calc(50% - 85px - 100px - 50px);
  width: 600px;
  display: none;
  padding: 1rem;
  background-color: white;
  border-radius: 15px;
  text-align: left;
  top: 10px;
}
.notification_block.active {
  display: block;
}
</style>
<script>
import APPARATJSON from "../P302O/P302O.json";
import hardwareCanvas from "../P302O/hardwareCanvas.vue";
import sideBarMenu from "../P302O/sideBarMenu.vue";
import ServerHandler from "@/api/ServerHandler.js";
import ContextHandler, * as hwCmpHandler from "@/handlers/hwComponentsHandle.js";
// import axios from 'axios';
// import get from 'axios';

export default {
  data() {
    return {
      actualPack: null,
      allPacks: null,
      contextHandler: new ContextHandler(this),
      packForShow: null,
      width: window.innerWidth,
      imgWidth: 0,
      imgId: 1,
      zoom: 80,
      firstZoom: 0,
      exersizeName: "",
      actualId: 1001,
      messageWaitingServer: "Ожидание ответа сервера...",
      annotation: "",
      rerenderStatment: 0,
      serverHandler: null,
      sessionId: null,
      stepServerData: null,
      trainingStatus: true,
      exersiseId: 0,
      rerenderStatmentSideBar: 0,
      exerciseComplete: false,
      sec: 0,
      min: 0,
      timer: null,
      is_tr: this.$route.query.it,
      deg: 0,
      discription: null,
      discriptionActive: false,
      congratulationActive: false,
      stepData: { 
        "operation": "setInitNormConfig", 
        "equipment_id": 1,
        "array_actions": []
      }
        
    };
  },

  created() {
    window.addEventListener("resize", this.updateWidth);

    this.annotation = this.messageWaitingServer;

    this.allPacks = APPARATJSON;
    this.actualPack = APPARATJSON.blocks[0];

    this.allPacks = hwCmpHandler.setNullImgIndex(this.allPacks);
    this.allPacks = hwCmpHandler.setNullBlocksActualStatus(this.allPacks);
    this.allPacks = hwCmpHandler.setNullBlockComponentsYellow(this.allPacks);
    this.allPacks.blocks[
      hwCmpHandler.findHardwareById(this.actualPack.id, this.allPacks.blocks)
    ].actual_status = 1;

    this.$session.start();
    this.$session.set("session_id", Date.now().toString(32));
    this.sessionId = this.$session.get("session_id");

    if (this.$route.query.sec && this.$route.query.min) {
      this.sec = this.$route.query.sec;
      this.min = this.$route.query.min;
    }
  },

  mounted() {
    this.updateZoom();
    this.startTimer();

    let is_traning;
    if (this.$route.query.it == 0) is_traning = false;
    else is_traning = true;

    this.serverHandler = new ServerHandler(
      this.$session.get("session_id"),
      this.contextHandler,
      is_traning,
      this.exersiseId,
      this.$route.query.norm
    );
  },
  destroyed() {
    this.stopTimer();
  },
  components: {
    sideBarMenu,
    hardwareCanvas,
  },
  computed: {},
  watch: {
    sec(time) {
      if (time === 0) {
        //this.stopTimer();
      }
    },
  },
  methods: {
    showDiscription(text) {
      this.discription = text;
      this.discriptionActive = false;
    },
    hideDiscription() {
      this.discriptionActive = false;
    },
    showCongratulationModal() {
      this.congratulationActive = true;
    },
    hideCongratulationModal() {
      this.congratulationActive = false;
    },
    endStage() {
      this.stopTimer();
      this.hideDiscription();
      this.completeStage = true;
    },
    endNormative() {
      this.stopTimer();
      this.hideDiscription();
      this.showCongratulationModal();
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.sec++;
        if (this.sec % 60 == 0 && this.sec != 0) {
          this.min++;
          this.sec = 0;
        }
      }, 1000);
    },
    stopTimer() {
      clearTimeout(this.timer);
    },
    goToPath(route, normative_id = 0, is_training = 1, min = 0, sec = 0) {
      if (normative_id == 0) this.$router.push({ path: route });

      this.$router.push({
        path: route,
        query: { norm: normative_id, it: is_training, min: min, sec: sec },
      });
      window.location.reload();
    },
    changeBlockYellow(apparat_id) {
      let packId = hwCmpHandler.findHardwareById(apparat_id, this.allPacks.blocks);
      this.allPacks.blocks[packId].next_status = 0;
      this.rerenderStatmentSideBar++;
    },
    getNextExercisePathId() {
      return parseInt(this.$route.query.norm) + 1;
    },
    waitingServer() {
      if (this.annotation === this.messageWaitingServer) return "";
      return "d-none";
    },
    rerenderAllPacks(i) {
      this.allPacks = hwCmpHandler.uploadHwComponents_Training(this.allPacks, i);
      this.rerenderStatment++;
      this.rerenderStatmentSideBar++;
    },
    rerenderMenuBlocksStatus(next_actions) {
      this.allPacks = hwCmpHandler.changeBlocksStatus(
        this.allPacks,
        next_actions,
        this.is_tr
      );
      this.rerenderStatment++;
      this.rerenderStatmentSideBar++;
    },
    updateZoom() {
      this.imgId = this.actualPack.id;

      this.imgWidth = this.actualPack.backgroundSettings.width;

      if (this.width > this.imgWidth) {
        this.zoom =
          Math.floor(((this.width - 100 - this.imgWidth) / this.imgWidth) * 100) + 100;
      } else if (this.width < this.imgWidth) {
        this.zoom =
          Math.ceil(((this.width - 100 - this.imgWidth) / this.imgWidth) * 100) + 100;
      }

      document.getElementById("mainBlock").style.zoom = this.zoom + "%";
    },
    updateWidth() {
      const $html = document.documentElement;
      const width = $html.clientWidth;

      this.width = width;
      this.updateZoom();
    },
    selectPackHandler(pack) {
      this.actualPack = pack;
      this.packForShow = pack.name;
      this.allPacks = hwCmpHandler.setNullBlocksActualStatus(this.allPacks);
      this.allPacks.blocks[
        hwCmpHandler.findHardwareById(pack.id, this.allPacks.blocks)
      ].actual_status = 1;
      this.rerenderStatmentSideBar++;

      this.updateZoom();
    },
    linkForNextStage() {
      if (this.completeStage) {
        this.endStage();
        return "";
      }
      return "d-none";
    },
    exportJSON() {
      const jsonFile = new Blob([JSON.stringify(this.actualPack)]);
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(jsonFile);
      downloadLink.download = "demo.json";
      downloadLink.click();
    },
    async parseJsonFile(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsText(file);
      });
    },
    importJSON(event) {
      const file = event.target.files[0];

      this.parseJsonFile(file)
        .then((res) => {
          this.allPacks.blocks;

          for (let i = 0; i < this.allPacks.blocks.length; i++) {
            if (this.allPacks.blocks[i].name === res.name) {
              this.allPacks.blocks[i].components = res.components;
            }
          }

          // TODO: добавит ререндер хардвер канваса
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addSubStep(element){
      this.stepData['array_actions'].push( 
      {
        'action_id': element['id'],
        'action_value': element['currentValue'],
      })
      console.log(this.stepData)
    }
  },
};
</script>

<style lang="scss" scoped>
.svgHome {
  fill: black;
}

.svgHome:hover {
  fill: darkgrey;
}

.menu-btn {
  cursor: pointer;
  rotate: 180deg;
  display: block;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
}

.menu-btn span,
.menu-btn span::before,
.menu-btn span::after {
  position: absolute;
  top: 50%;
  margin-top: -1px;
  left: 50%;
  margin-left: -10px;
  width: 20px;
  height: 2px;
  background-color: #222;
}

.menu-btn span::before,
.menu-btn span::after {
  content: "";
  display: block;
  transition: 0.2s;
}

.menu-btn span::before {
  transform: translateY(-5px);
}

.menu-btn span::after {
  transform: translateY(5px);
}

.menu-btn_active span:before {
  transform: rotate(35deg);
  width: 10px;
  transform-origin: left bottom;
}

.menu-btn_active span:after {
  transform: rotate(-35deg);
  width: 10px;
  transform-origin: left top;
}
</style>
