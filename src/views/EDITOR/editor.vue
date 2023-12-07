<template>
    <!-- Редактор аппаратуры: название + добавление блоков-->
    <apparatEditor :key="editor" :serverHandler="this.serverHandler" />
    <!-- ==> blockEditor -->
    <!-- ==> routeEditor -->

    <!-- Редактор блока -->
    <!-- <blockEditor /> -->
    <!-- ==> photoEditor -->

    <!-- Загрузка + обрезка фотографии -->
    <!-- <photoEditor /> -->
    <!-- Возвращает: сохраняет на клиенте новую фотографию -->
    <!-- ==> buttonEditor -->

    <!-- Добавление элементов -->
    <!-- <elementEditor /> -->

    <!-- ==> cableEditor -->

    <!-- Добавление кабелей -->
    <!-- <cableEditor /> -->
    <!-- ==> apparatEditor -->

    <!-- <constructor/> -->
    <!--  -->
</template>

<style>
@import url("./editor.css");
</style>

<!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> -->

<script>

// import photoEditor from "./photoEditor";
// import constructor from "./constructor";
import ServerHandler from "../../api/newServerHandler";
import apparatEditor from "./apparatEditor";



export default {
    data() {
        return {
            serverHandler: null
        };
    },
    components: {
        apparatEditor,
        // photoEditor,
        // constructor
    },
    created() {
        // console.log(this.$session.exists());
        if (!this.$session.exists()) {
            this.$session.start();
            // this.sessionId = this.$session.id();
        }

        this.serverHandler = new ServerHandler(this.$session.id());
        this.serverHandler.connect();
    }
};
</script>
