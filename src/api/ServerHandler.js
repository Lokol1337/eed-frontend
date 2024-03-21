
import $url from '@/api/config.js';
// import contextCanvasHandler from '../views/hwComponentsHandle';
import * as hwCmpHandler from '../views/hwComponentsHandle';

export default class ServerHandler {

    serverData = null;
    session_id = null;
    stepServerData = null;
    is_training = null;
    socket = null;

    contextCanvasHandler = null;
    contextComponentHandler = null;

    constructor(session_id, contextCanvasHandler, is_training, exercise_id, normative_id) {

        this.session_id = session_id;
        this.socket = new WebSocket($url);
        this.stepServerData = null;
        this.is_training = is_training;

        let initData = this.getInitData(exercise_id, String(normative_id));
        this.socket.onopen = () => {
            this.sendData(initData);

        };

        this.defineInitOnMessage(contextCanvasHandler);

        this.socket.onerror = function (error) {
            alert("Ошибка соединения: " + error.message);
        };

        // this.socket.onclose = (event) => {
        //     alert("Соединение разорвано! Код: " + event.code + " Причина: " + event.reason);
        // }

    }

    defineInitOnMessage(contextCanvasHandler) {
        this.contextCanvasHandler = contextCanvasHandler;

        this.socket.onmessage = (event) => {
            try {
                let server_data = this.parseServerData(event.data);
                if (this.checkData(server_data)) {
                    console.log("ДАННЫЕ С СЕРВЕРА ПОЛУЧЕНЫ!");

                    if (this.is_training) {
                        console.log("ТРЕНИРОВКА");

                        let new_stepServerData = server_data;
                        this.contextCanvasHandler.setStepServerData(new_stepServerData);
                    }
                    else {
                        console.log("NOT ТРЕНИРОВКА");
                    }

                    let new_annotation = hwCmpHandler.getAnnotation(server_data);
                    this.contextCanvasHandler.setAnnotation(new_annotation);

                    let new_allPacks = hwCmpHandler.uploadHwComponents_Training(this.contextCanvasHandler.getAllPacks(), server_data, !this.is_training);
                    this.contextCanvasHandler.setAllPacks(new_allPacks);

                    if (server_data['is_random_step'])
                        hwCmpHandler.setToRandomValue(this.contextCanvasHandler.getAllPacks(), server_data);

                    this.contextCanvasHandler.rerender();

                } else {
                    console.log("НЕВЕРНАЯ СТРУКТУРА ДАННЫХ СЕРВЕРА!");
                }

            }
            catch (event) {
                console.log("CATCH: " + event);
            }

        };
    }

    defineActionStepOnMessage(contextComponentHandler, hardwareComponent) {
        this.contextComponentHandler = contextComponentHandler;

        this.socket.onmessage = (event) => {
            try {
                let server_data = this.parseServerData(event.data);
                if (server_data) {
                    console.log("ДАННЫЕ С СЕРВЕРА ПОЛУЧЕНЫ!");

                    if (this.is_training) {
                        if (server_data['block_end']) {
                            this.contextComponentHandler.$emit('completeApparat', server_data['block_end_id']);
                        }
                        if (server_data['fail']) {
                            console.log("FAIL!");
                        }
                        else if (!server_data['finish']) {
                            if (server_data['status']) {
                                if (server_data['status'] == "correct" && server_data['validation'] == false) {
                                    this.contextComponentHandler.changeYellow(hardwareComponent);
                                    this.contextCanvasHandler.rerender()

                                }
                                if (server_data['status'] == "correct" && server_data['validation'] == true) {
                                    this.contextComponentHandler.changeYellow(hardwareComponent);
                                    this.contextComponentHandler.$emit('ann', server_data['annotation']);
                                    this.contextComponentHandler.$emit('step', server_data);
                                    this.contextComponentHandler.$emit('allP', server_data);
                                }
                            }
                            else {
                                if (server_data['validation'] == true) {
                                    this.contextComponentHandler.changeYellow(hardwareComponent);
                                    this.contextComponentHandler.$emit('ann', server_data['annotation']);
                                    this.contextComponentHandler.$emit('step', server_data);
                                    this.contextComponentHandler.$emit('allP', server_data);
                                }
                            }
                        }
                        else if (server_data['finish'] && server_data['array_actions'][0] != "nan") {
                            console.log("EXERCISE FINISHED!");

                            this.contextComponentHandler.changeYellow(hardwareComponent);
                            this.contextComponentHandler.$emit('ann', server_data['annotation']);
                            this.contextComponentHandler.$emit('step', server_data);
                            this.contextComponentHandler.$emit('allP', server_data);
                            this.contextComponentHandler.$emit('completeExercise', true);
                        }

                        else {
                            alert("УРАА!");
                        }
                    }
                    else {
                        console.log("НЕ ТРЕННИРОВКА");
                    }
                }
                else {
                    console.log("НЕВЕРНАЯ СТРУКТУРА ДАННЫХ СЕРВЕРА!");
                }

            } catch (event) {
                console.log(event);
            }
        };
    }

    sendData(data) {
        this.socket.send(JSON.stringify(Array.from(data.entries())));
    }



    getSocket() {
        return this.socket;
    }

    getOpenData() {
        return new Map([
            ['session_hash', this.session_id],
            ['opperation', "connect"],
        ]);
    }

    getInitData(exercise_id, normative_id) {
        return new Map([
            ['session_id', this.session_id],
            ['is_training', this.is_training],
            ['ex_id', exercise_id],
            ['norm', normative_id]
        ]);
    }

    getElseData(hardwareComponent, hardZoomScale) {
        return new Map([
            ['session_id', this.session_id],
            ['id', hardwareComponent.id],
            ['draggble', hardwareComponent.draggable],
            ['rotatable', hardwareComponent.rotatable],
            ['currentValue', hardwareComponent.currentValue],
            ['left', hardwareComponent.left / hardZoomScale],
            ['top', hardwareComponent.top / hardZoomScale]
        ]);
    }

    // sendElse(session_id, hardwareComponent, hardZoomScale) {

    //     this.sendData = new Map([
    //         ['session_id', session_id],
    //         ['id', hardwareComponent.id],
    //         ['draggble', hardwareComponent.draggable],
    //         ['rotatable', hardwareComponent.rotatable],
    //         ['currentValue', hardwareComponent.currentValue],
    //         ['left', hardwareComponent.left / hardZoomScale],
    //         ['top', hardwareComponent.top / hardZoomScale]
    //     ]);
    // }

    parseServerData(data) {
        return JSON.parse(data);
    }

    checkData(data) {

        console.log(data);

        // для теста:
        return true;

        /*if (!(data['validation'] && data['has_action'] && data['annotation'] 
        && data['count_action'] && data['array_actions'] && data['finish']))
            return false;
 
        // Проверка на возвращение сервером верной структуры данных
        if (this.is_training) {
            if (!(data['count_next'] && data['next_actions']))
                return false;
        } else {
            if (!(data['failed'] && data['next_actions']))
                return false;
        }
 
        return true;*/
    }

    changeStepServerData(newstepServerData) {
        console.log("--- CHANGING StepServerData");
        this.stepServerData = newstepServerData;
    }

    findNextActionById(arrayNextActions, hwId) {
        arrayNextActions.forEach(action => {
            if (parseInt(action['next_id']) == parseInt(hwId))
                return action;
        });
        return null;
    }

}


// PROMISES: https://stackoverflow.com/questions/42304996/javascript-using-promises-on-websocket
//https://stackoverflow.com/questions/67376026/vue-js-updating-html-inside-websocket-onmessage-event
