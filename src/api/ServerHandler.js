
import $url from '@/api/config.js';

export default class ServerHandler {

    constructor(){
        this.socket = new WebSocket($url);
        this.stepServerData = null;
    }

    getSocket() {
        return this.socket;
    }

    sendFirst(session_id, is_training, ex_id) {
        this.is_training = is_training;

        this.sendData = new Map([
            ['session_id', session_id],
            ['is_training', is_training],
            ['ex_id', ex_id]
        ]);
    }

    sendElse(session_id, hardwareComponent, hardZoomScale) {

        this.sendData = new Map([
            ['session_id', session_id],
            ['id', hardwareComponent.id],
            ['draggble', hardwareComponent.draggable],
            ['rotatable', hardwareComponent.rotatable],
            ['currentValue',hardwareComponent.currentValue],
            ['left', hardwareComponent.left / hardZoomScale],
            ['top', hardwareComponent.top / hardZoomScale]
        ]);
    }

    parseServerData(data) {
        return JSON.parse(data)
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

    findNextActionById(arrayNextActions, hwId){
        arrayNextActions.forEach(action => {
            if (parseInt(action['next_id']) == parseInt(hwId))
                return action;
        });
        return null;
    }
    
}
      

      // PROMISES: https://stackoverflow.com/questions/42304996/javascript-using-promises-on-websocket
      //https://stackoverflow.com/questions/67376026/vue-js-updating-html-inside-websocket-onmessage-event
      