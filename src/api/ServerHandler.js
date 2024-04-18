
import $url from '@/api/config.js';
// import contextApparatHandler from '../views/hwComponentsHandle';
import * as hwCmpHandler from '../views/hwComponentsHandle';

export default class ServerHandler {

    serverData = null;
    session_id = null;
    stepServerData = null;
    is_training = null;
    socket = null;

    contextApparatHandler = null;
    contextCanvasHandler = null;

    next_actions = null;

    constructor(session_id, contextApparatHandler, is_training, exercise_id, normative_id) {

        this.session_id = session_id;
        this.socket = new WebSocket($url);
        this.stepServerData = null;
        this.is_training = is_training;

        let initData = this.getInitData(exercise_id, String(normative_id));
        this.socket.onopen = () => {
            this.sendData(initData);

        };

        this.defineInitOnMessage(contextApparatHandler);

        this.socket.onerror = function (error) {
            alert("Ошибка соединения: " + error.message);
        };

        // this.socket.onclose = (event) => {
        //     alert("Соединение разорвано! Код: " + event.code + " Причина: " + event.reason);
        // }

    }

    defineInitOnMessage(contextApparatHandler) {
        this.contextApparatHandler = contextApparatHandler;

        this.socket.onmessage = (event) => {

            try {
                let server_data = this.parseServerData(event.data);
                if (this.checkData(server_data)) {

                    this.next_actions = server_data['next_actions'];

                    if (this.is_training) {
                        let new_stepServerData = server_data;
                        this.contextApparatHandler.setStepServerData(new_stepServerData);
                    }
                    // else {

                    // }

                    let new_annotation = hwCmpHandler.getAnnotation(server_data);
                    this.contextApparatHandler.setAnnotation(new_annotation);

                    let new_allPacks = hwCmpHandler.uploadHwComponents_Training(this.contextApparatHandler.getAllPacks(), server_data, !this.is_training);
                    this.contextApparatHandler.setAllPacks(new_allPacks);

                    if (server_data['is_random_step'])
                        hwCmpHandler.setToRandomValue(this.contextApparatHandler.getAllPacks(), server_data);

                    this.contextApparatHandler.rerender();

                }
                // else {

                // }

            }
            catch (error) {
                console.log(error);
            }
        };
    }

    defineActionStepOnMessage(contextCanvasHandler, hardwareComponent) {
        this.contextCanvasHandler = contextCanvasHandler;

        this.socket.onmessage = (event) => {

            console.log("onmessage -> setServerAnswerStatus()");
            this.contextCanvasHandler.setServerAnswerStatus(true);

            try {

                let server_data = this.parseServerData(event.data);
                if (server_data) {

                    if (this.is_training) {
                        if (server_data['block_end']) {
                            this.contextCanvasHandler.$emit('completeApparat', server_data['block_end_id']);
                        }
                        if (!server_data['finish']) {
                            if (server_data['status']) {
                                if (server_data['status'] == "correct" && server_data['validation'] == false) {
                                    this.contextCanvasHandler.changeYellow(hardwareComponent);
                                    this.next_actions = this.next_actions.filter((action) => action.next_id != hardwareComponent.id);
                                    this.contextApparatHandler.rerenderMenuBlocksStatus(this.next_actions);

                                }
                                if (server_data['status'] == "correct" && server_data['validation'] == true) {
                                    this.contextCanvasHandler.changeYellow(hardwareComponent);
                                    this.contextCanvasHandler.$emit('ann', server_data['annotation']);
                                    this.next_actions = server_data['next_actions'];
                                    this.contextCanvasHandler.$emit('step', server_data);
                                    this.contextCanvasHandler.$emit('allP', server_data);
                                }
                            }
                            else {
                                if (server_data['validation'] == true) {
                                    this.contextCanvasHandler.changeYellow(hardwareComponent);
                                    this.contextCanvasHandler.$emit('ann', server_data['annotation']);
                                    this.contextCanvasHandler.$emit('step', server_data);
                                    this.contextCanvasHandler.$emit('allP', server_data);
                                }
                            }
                        }
                        else {

                            if (server_data['array_actions'][0] != "nan") {
                                this.contextCanvasHandler.changeYellow(hardwareComponent);
                                this.contextCanvasHandler.$emit('ann', server_data['annotation']);
                                this.contextCanvasHandler.$emit('step', server_data);
                                this.contextCanvasHandler.$emit('allP', server_data);
                                this.contextCanvasHandler.$emit('completeExercise');
                            }
                        }

                    }
                }

            } catch (error) {
                console.log(error);
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

    checkData() {

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
