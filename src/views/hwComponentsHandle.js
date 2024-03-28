

export default class ContextHandler {

  context = null;

  constructor(context) {
    this.context = context;
  }

  getAllPacks() {
    return this.context.allPacks;
  }

  rerenderMenuBlocksStatus(next_actions) {
    this.context.rerenderMenuBlocksStatus(next_actions);
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
    // 

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
    //
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

  valuesAndPhotos_array.forEach((element, i) => {
    //
    if (element['value'] == currentValue) {
      index = i;
      return;
    }
  });
  return index;
}

export function setNullBackgroundColors(hardwareComponents) {

  hardwareComponents.forEach(element => {
    element.backgroundColor = "";
    element.opacity = "";

  });
  return hardwareComponents;
}

export function setNullImgIndex(allPacks) {

  allPacks.blocks.forEach(block => {
    block.components.forEach(component => {
      component.imgIndex = 0;
    });
  });
  return allPacks;
}

export function setNullBlocksActualStatus(allPacks) {

  allPacks.blocks.forEach(block => {
    block.actual_status = 0;
  });
  return allPacks;
}

export function setNullBlocksNextStatus(allPacks) {

  allPacks.blocks.forEach(block => {
    block.next_status = 0;
  });
  return allPacks;
}

export function setToRandomValue(allPacks, server_data) {

  // 
  let randomVal = server_data['random_values'];
  randomVal.forEach(val => {
    // 


    allPacks.blocks[findHardwareById(val['apparat_id'], allPacks.blocks)].components[findHardwareComponentById(val['next_id'], allPacks.blocks[findHardwareById(val['apparat_id'], allPacks.blocks)].components)].imgIndex = val['current_value'];



  });
}

export function uploadHwComponents_Training(allPacks, server_data, is_ex) {
  // allPacks = setNullBackgroundColors(allPacks);
  let now_actions = server_data['array_actions'];
  let count_actions = parseInt(server_data['count_action']);

  // 

  if (now_actions && count_actions > 0) { // Проверка на последний шаг
    now_actions.forEach(action => {

      let packId = findHardwareById(action['apparat_id'], allPacks.blocks);
      let next_pack = allPacks.blocks[packId];
      // 
      let hwCmpId = findHardwareComponentById(action['action_id'], next_pack.components);
      // 
      let nextHwComponent = next_pack.components[hwCmpId];
      if (action['tag'] === "arrow") {
        nextHwComponent.currentValue = action['action_value']
        // document.getElementById(action['action_id']).children[0].style.transform = "rotate(" + action['action_value'] + "deg)"


      } else {
        allPacks.blocks[packId].components[hwCmpId] = nextHwComponent;
        let imgIndex = findNumberOfCurrentValue(nextHwComponent, action['action_value']);
        // 
        nextHwComponent.imgIndex = imgIndex;
        nextHwComponent.currentValue = action['action_value'];
      }

    });

  }
  // 
  let next_actions = server_data['next_actions'];
  let count_next = parseInt(server_data['count_next']);

  if (count_next > 0) {
    allPacks = changeBlocksStatus(allPacks, next_actions, !is_ex);
  } else
    allPacks = setNullBlocksNextStatus(allPacks);

  return allPacks;
}

export function changeBlocksStatus(allPacks, next_actions, isTraining) {

  allPacks = setNullBlocksNextStatus(allPacks);

  next_actions.forEach(action => {

    let packId = findHardwareById(action['apparat_id'], allPacks.blocks);

    let next_pack = allPacks.blocks[packId];

    let hwCmpId = findHardwareComponentById(action['next_id'], next_pack.components);

    let nextHwComponent = next_pack.components[hwCmpId];

    if (isTraining) {
      nextHwComponent.backgroundColor = "yellow";
      nextHwComponent.opacity = 80;
    }

    // 
    // 

    // Обновляем массив allPacks
    allPacks.blocks[packId].components[hwCmpId] = nextHwComponent;
    if (isTraining)
      allPacks.blocks[packId].next_status = 1;
  });

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