const fs = require("fs");

let setNew = new Set();
let newObj
let oldObj
let toDelete = ["rotator"]

fs.readFile("../src/views/P302O/P302O.json", (err, data) => {
  if (err) throw err;
  oldObj = JSON.parse(data);

  oldObj.blocks.forEach((block) => {
    block.components.forEach((comp) => {
      delete comp.divisionPrice
      setNew.add(comp.name);
    });
  });
  fs.readFile("../src/views/P302O/P302O_1.json", (err, data) => {
    if (err) throw err;
    let newObj = JSON.parse(data);

    newObj.blocks.forEach((block) => {
      block.components.forEach((comp) => {
        //console.log(comp.name);
        delete comp.divisionPrice
        setNew.delete(comp.name);
      });
    });
    console.log(setNew);
    setNew.forEach((elem)=>{
      if(elem.search("rotator") !== -1)
      {
        setNew.delete(elem)
      }
    })
    console.log(setNew);

    let blockId = 0;
    oldObj.blocks.forEach((block) => {
      let compId = 1;
      block.components.forEach((comp) => {
        comp.id = (blockId+1) * 1000 + compId;
        if(setNew.has(comp.name))
        {
          comp.currentValue = comp.valuesAndPhotos[0].value
          comp.initValue = comp.valuesAndPhotos[0].value
          console.log(`${blockId}`)
          console.log(comp)
          newObj.blocks[blockId].components.push(comp);
        }
        compId++;
      });
      blockId++;
    });
    //console.log(newObj.blocks[0].components)
    fs.writeFile("../src/views/P302O/P302O_2.json",JSON.stringify(newObj),(err)=>{console.log(err)})
  });
});
