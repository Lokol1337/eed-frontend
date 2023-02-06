export function findHardwareComponentById(id, hardwareComponents){
    let index = -1;
    hardwareComponents.forEach((element, i) => {
      //console.log(parseInt(element.id) + " ? " + parseInt(id) + " = " + (parseInt(element.id) == parseInt(id)));
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
  valuesAndPhotos_array.forEach((element, i) => {
      //console.log(parseInt(element.id) + " ? " + parseInt(id) + " = " + (parseInt(element.id) == parseInt(id)));
      if (parseInt(element['value']) == currentValue) {
        index = i;
        return;
      }
  });
  return index;
}

export function setNullBackgroundColors(hardwareComponents){
    console.log("setNullBackgroundColors()");
    hardwareComponents.forEach(element => {
      element.backgroundColor = "";
      element.opacity = "";
      console.log(element);
    });
    return hardwareComponents;
}

export function setNullImgIndex(allPacks){
    console.log("setNullImgIndex()");
    allPacks.blocks.forEach(block => {
        block.components.forEach(component => {
            component.imgIndex = 0;
        });
    });
    return allPacks;
}

export function uploadHwComponents_Training(allPacks, server_data) {
  allPacks = setNullBackgroundColors(allPacks);
  
  let next_actions = server_data['next_actions'];
  next_actions.forEach(action => {
    console.log(action);

    let packId = findHardwareById(action['apparat_id'], allPacks.blocks);
    let next_pack = allPacks.blocks[packId];

    let hwCmpId = findHardwareComponentById(action['next_id'], next_pack.components);
    let nextHwComponent = next_pack.components[hwCmpId];

    // Подсветить необходимые компоненты
    if (action['draggable']) {
      console.log("NEXT ELEMENT IS DRAGGABLE");
    } else {
      console.log("NEXT ELEMENT IS NOT DRAGGABLE");
      // console.log("previous_imgIndex: " + nextHwComponent.imgIndex);
      let imgIndex = findNumberOfCurrentValue(nextHwComponent, action['current_value']);
      if (imgIndex == -1)
        console.log("findNumberOfCurrentValue() -> NOT FOUND"); 
      nextHwComponent.imgIndex = imgIndex;
      // console.log("next_imgIndex: " + nextHwComponent.imgIndex);
    }

    nextHwComponent.backgroundColor = "yellow";
    nextHwComponent.opacity = "80%";

    // Обновляем массив allPacks
    allPacks.blocks[packId].components[hwCmpId] = nextHwComponent;
  });
  return allPacks;
}

export function getAnnotation(data) {
  return data['annotation'];
}

export function revertHwCmpCurrentValue(allPacks, revertingHwComponent){
  let index = this.findHardwareComponentById(revertingHwComponent.id);
  let imgIndex = revertingHwComponent.imgIndex;

  imgIndex -= 1;
  imgIndex %= revertingHwComponent.valuesAndPhotos.length;

  allPacks[index].currentValue = revertingHwComponent.valuesAndPhotos[imgIndex].value;

  return allPacks
}