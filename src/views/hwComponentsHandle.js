

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
  // allPacks = setNullBackgroundColors(allPacks);
  console.log('uploadHwComponents_Training')
  let next_actions = server_data['next_actions'];
  let now_actions = server_data['array_actions'];
  console.log('uploadHwComponents_Training')
  console.log(next_actions);
  // console.log(now_actions);
if(now_actions){
  
  if(now_actions[0]['name'] != "nan"){
    now_actions.forEach(action =>{
      let packId = findHardwareById(action['apparat_id'], allPacks.blocks);
      let next_pack = allPacks.blocks[packId];
      console.log(next_pack,"next_packnext_packnext_packnext_packnext_pack");
      let hwCmpId = findHardwareComponentById(action['action_id'], next_pack.components);
      console.log(hwCmpId,"hwCmpIdhwCmpIdhwCmpIdhwCmpIdhwCmpIdhwCmpId");
      let nextHwComponent = next_pack.components[hwCmpId];
      allPacks.blocks[packId].components[hwCmpId] = nextHwComponent;
      let imgIndex = findNumberOfCurrentValue(nextHwComponent, action['action_value']);
      console.log(imgIndex,"imgIndeximgIndeximgIndeximgIndeximgIndeximgIndeximgIndex");
      nextHwComponent.imgIndex = imgIndex;
      nextHwComponent.currentValue = action['action_value'];
    });
  }
}
console.log(next_actions,"next_actionsnext_actionsnext_actionsnext_actionsnext_actions");
if(next_actions[0]['name'] != "nan"){
  next_actions.forEach(action => {
    console.log(action,"AAAA");

    let packId = findHardwareById(action['apparat_id'], allPacks.blocks);
    // document.getElementById(action['apparat_id']).style.border = "thick solid #0000FF";
    console.log(packId,"bbbbbb");

    let next_pack = allPacks.blocks[packId];
    
    let hwCmpId = findHardwareComponentById(action['next_id'], next_pack.components);
    
    let nextHwComponent = next_pack.components[hwCmpId];
    console.log(nextHwComponent);
  //   // Подсветить необходимые компоненты
    if (action['draggable']) {
      console.log("NEXT ELEMENT IS DRAGGABLE");
    } 
    else {
      console.log("NEXT ELEMENT IS NOT DRAGGABLE");
    }

    nextHwComponent.backgroundColor = "yellow";
    nextHwComponent.opacity = "80%";


  //   // Обновляем массив allPacks
    allPacks.blocks[packId].components[hwCmpId] = nextHwComponent;
  });
}
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