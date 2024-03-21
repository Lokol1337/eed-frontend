

export default class ContextHandler {

  context = null;

  constructor(context) {
    this.context = context;
  }

  getAllPacks() {
    return this.context.allPacks;
  }

  setAnnotation(annotation) {
    this.context.annotation = annotation;
  }

  setAllPacks(allPacks) {
    this.context.allPacks = allPacks;
  }

  setStepServerData(stepServerData) {
    this.context.stepServerData = stepServerData;
  }

  setRerenderStatmentSideBar(rerenderStatment) {
    this.context.rerenderStatment = rerenderStatment;
  }

  setRerenderStatment(rerenderStatmentSideBar) {
    this.context.rerenderStatmentSideBar = rerenderStatmentSideBar;
  }

  // Принудительное обновление <template> hardwareCanvas
  rerender() {
    this.context.rerenderStatment++;
    this.context.rerenderStatmentSideBar++;
  }

}

export function findHardwareComponentById(id, hardwareComponents) {
  let index = -1;
  hardwareComponents.forEach((element, i) => {
    // console.log(parseInt(element.id) + " ? " + parseInt(id) + " = " + (parseInt(element.id) == parseInt(id)));

    if (parseInt(element.id) == parseInt(id)) {
      index = i;
      return;
    }
  });
  return index;
}

export function findHardwareById(apparat_id, allPacks_blocks) {
  let index = -1;
  allPacks_blocks.forEach((element, i) => {
    //console.log(parseInt(element.id) + " ? " + parseInt(id) + " = " + (parseInt(element.id) == parseInt(id)));
    if (parseInt(element.id) == parseInt(apparat_id)) {
      index = i;
      return;
    }
  });
  return index;
}

export function findNumberOfCurrentValue(hwComponent, currentValue) {
  let valuesAndPhotos_array = hwComponent.valuesAndPhotos;
  let index = -1;
  console.log(valuesAndPhotos_array);
  valuesAndPhotos_array.forEach((element, i) => {
    //console.log(parseInt(element.id) + " ? " + parseInt(id) + " = " + (parseInt(element.id) == parseInt(id)));
    if (element['value'] == currentValue) {
      index = i;
      return;
    }
  });
  return index;
}

export function setNullBackgroundColors(hardwareComponents) {
  console.log("setNullBackgroundColors()");
  hardwareComponents.forEach(element => {
    element.backgroundColor = "";
    element.opacity = "";
    console.log(element);
  });
  return hardwareComponents;
}

export function setNullImgIndex(allPacks) {
  console.log("setNullImgIndex()");
  allPacks.blocks.forEach(block => {
    block.components.forEach(component => {
      component.imgIndex = 0;
    });
  });
  return allPacks;
}

export function setNullBlocksActualStatus(allPacks) {
  console.log("setNullBlocksLighting()");
  allPacks.blocks.forEach(block => {
    block.actual_status = 0;
  });
  return allPacks;
}

export function setNullBlocksNextStatus(allPacks) {
  console.log("setNullBlocksLighting()");
  allPacks.blocks.forEach(block => {
    block.next_status = 0;
  });
  return allPacks;
}

export function setToRandomValue(allPacks, server_data) {
  console.log('setToRandomValue');
  // console.log(allPacks, server_data);
  let randomVal = server_data['random_values'];
  randomVal.forEach(val => {
    // console.log(allPacks.blocks)
    console.log(val['next_id']);
    console.log(allPacks.blocks[findHardwareById(val['apparat_id'], allPacks.blocks)].components[findHardwareComponentById(val['next_id'], allPacks.blocks[findHardwareById(val['apparat_id'], allPacks.blocks)].components)].imgIndex);
    allPacks.blocks[findHardwareById(val['apparat_id'], allPacks.blocks)].components[findHardwareComponentById(val['next_id'], allPacks.blocks[findHardwareById(val['apparat_id'], allPacks.blocks)].components)].imgIndex = val['current_value'];
    console.log(allPacks.blocks[findHardwareById(val['apparat_id'], allPacks.blocks)].components[findHardwareComponentById(val['next_id'], allPacks.blocks[findHardwareById(val['apparat_id'], allPacks.blocks)].components)].imgIndex);
    console.log('end');

  });
}

export function uploadHwComponents_Training(allPacks, server_data, is_ex) {
  // allPacks = setNullBackgroundColors(allPacks);
  console.log('uploadHwComponents_Training')
  let now_actions = server_data['array_actions'];
  let count_actions = parseInt(server_data['count_action']);
  console.log('count_actions: ' + count_actions > 0)
  // console.log(now_actions);

  if (now_actions && count_actions > 0) { // Проверка на последний шаг
    now_actions.forEach(action => {

      let packId = findHardwareById(action['apparat_id'], allPacks.blocks);
      let next_pack = allPacks.blocks[packId];
      // console.log(next_pack,"next_packnext_packnext_packnext_packnext_pack");
      let hwCmpId = findHardwareComponentById(action['action_id'], next_pack.components);
      // console.log(hwCmpId,"hwCmpIdhwCmpIdhwCmpIdhwCmpIdhwCmpIdhwCmpId");
      let nextHwComponent = next_pack.components[hwCmpId];
      if (action['tag'] === "arrow") {
        nextHwComponent.currentValue = action['action_value']
        // document.getElementById(action['action_id']).children[0].style.transform = "rotate(" + action['action_value'] + "deg)"
        console.log("влад посмотри сюда", document.getElementById(action['action_id']).children[0])
        console.log("влад посмотри сюда", action['action_value'])
      } else {
        allPacks.blocks[packId].components[hwCmpId] = nextHwComponent;
        let imgIndex = findNumberOfCurrentValue(nextHwComponent, action['action_value']);
        // console.log(imgIndex,"imgIndeximgIndeximgIndeximgIndeximgIndeximgIndeximgIndex");
        nextHwComponent.imgIndex = imgIndex;
        nextHwComponent.currentValue = action['action_value'];
      }
      console.log("влад посмотри сюдаAAAAAAAAAAA", document.getElementById(action['action_id']).children[0])
    });
    console.log("aboba");
  }
  console.log(is_ex);
  // console.log(next_actions,"next_actions next_actions next_actions next_actions next_actions");
  let next_actions = server_data['next_actions'];
  let count_next = parseInt(server_data['count_next']);
  allPacks = setNullBlocksNextStatus(allPacks);
  console.log(next_actions);
  if (count_next > 0) {
    console.log("ЭТО ТРЕНИРОВКА?????????????????? = ", server_data);
    next_actions.forEach(action => {
      console.log(action, "AAAA");

      let packId = findHardwareById(action['apparat_id'], allPacks.blocks);

      let next_pack = allPacks.blocks[packId];

      let hwCmpId = findHardwareComponentById(action['next_id'], next_pack.components);

      let nextHwComponent = next_pack.components[hwCmpId];

      if (!is_ex) {
        nextHwComponent.backgroundColor = "yellow";
        nextHwComponent.opacity = 80;
      }

      // console.log(next_pack.components,"aaaaa",hwCmpId);
      // console.log(nextHwComponent);

      // Подсветить необходимые компоненты
      if (action['draggable']) {
        console.log("NEXT ELEMENT IS DRAGGABLE");
      }
      else {
        console.log("NEXT ELEMENT IS NOT DRAGGABLE");
      }

      // Обновляем массив allPacks
      allPacks.blocks[packId].components[hwCmpId] = nextHwComponent;
      if (!is_ex)
        allPacks.blocks[packId].next_status = 1;
    });
  }
  return allPacks;
}

export function findElementFromActions(component_id, actions) {
  actions.forEach(element => {
    if (element['next_id'] == component_id) {
      actions.splice(1, 1);
      return true;
    }
  });
  return false;
}

export function findApparatFromServerData(server_data, apparat_id) {
  server_data['next_actions'].forEach(element => {
    if (element['apparat_id'] == apparat_id)
      return true;
  });
  return false;
}

export function getAnnotation(data) {
  return data['annotation'];
}

export function revertHwCmpCurrentValue(allPacks, revertingHwComponent) {
  let index = this.findHardwareComponentById(revertingHwComponent.id);
  let imgIndex = revertingHwComponent.imgIndex;

  imgIndex -= 1;
  imgIndex %= revertingHwComponent.valuesAndPhotos.length;

  allPacks[index].currentValue = revertingHwComponent.valuesAndPhotos[imgIndex].value;

  return allPacks
}