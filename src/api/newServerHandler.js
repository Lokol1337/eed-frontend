
import $url from '@/api/config.js';

// export const this.socket = new WebSocket($url);

export default class ServerHandler {

    serverData = null;
    session_id = null;

    constructor(session_id) {
        this.session_id = session_id;
        this.socket = new WebSocket($url);
    }

    isExist() {
        return this.session_id != null;
    }

    getSocket() {
        return this.socket;
    }

    // async sendDataToServer(sendData) {
    //     // PROMISES: https://stackoverflow.com/questions/42304996/javascript-using-promises-on-websocket
    //     return new Promise(function (resolve, reject) {

    //         this.socket.onopen = function () {
    //             // console.log("ONOPEN!");
    //             this.socket.send(JSON.stringify(Array.from(sendData.entries())));
    //             resolve(this);
    //         };

    //         this.socket.onerror = function (error) {
    //             // alert(`[error] ${error.message}`);
    //             reject(error);
    //         };
    //     });
    // }

    async connect() {
        // const v = this;


        let sendingData = this.getFirstData();
        this.socket.onopen = () => {
            // alert("Соединение установлено.");
            this.socket.send(JSON.stringify(Array.from(sendingData.entries())));
        };

        // this.socket.onclose = function (event) {
        // if (event.wasClean) {
        //     alert('Соединение закрыто чисто');
        // } else {
        //     alert('Обрыв соединения'); // например, "убит" процесс сервера
        // }
        // alert('Код: ' + event.code + ' причина: ' + event.reason);
        // };

        let promise = new Promise((resolve) => {
            this.socket.onmessage = function (event) {
                // alert("Получены данные " + event.data);
                resolve(event.data);
            };
        });

        await promise;

        // alert("ВЫШЕЛ ИЗ ФУНКЦИИ!");
    }


    async sendData(sendingData) {

        const v = this;

        this.socket.onopen = () => {
            // alert("Соединение установлено.");
            this.socket.send(JSON.stringify(Array.from(sendingData.entries())));
            console.log(JSON.stringify(Array.from(sendingData.entries())))
        };

        var serverData = null;
        let promise = new Promise(function (resolve) {
            v.socket.onmessage = function (event) {
                // alert("onmessage(): " + event.data);
                resolve(event.data);
            };

            // this.socket.onerror = function (error) {
            //     alert("Ошибка jnghfd: " + error.message);
            //     reject(error.message);
            // };
        });
        promise.then(function (data) {
            serverData = v.parseServerData(data);
        });

        return serverData;
    }

    getFirstData() {
        return new Map([
            ['session_hash', this.session_id],
            ['opperation', "connect"],
        ]);
    }

    getCreateApparatData(apparat_name, apparat_description) {
        return new Map([
            ['session_hash', this.session_id],
            ['apparat_name', apparat_name],
            ['apparat_description', apparat_description],
            ['operation', "addApparat"]
        ]);
    }

    getCreateBlockData(apparat_id, block_name, src) {
        return new Map([
            ['session_hash', this.session_id],
            ['apparat_id', apparat_id],
            ['block_name', block_name],
            ['src', src],
            ['operation', "addBlock"]
        ]);
    }


    parseServerData(data) {
        return JSON.parse(data);
    }

}





// PROMISES: https://stackoverflow.com/questions/42304996/javascript-using-promises-on-websocket
//https://stackoverflow.com/questions/67376026/vue-js-updating-html-inside-websocket-onmessage-event
