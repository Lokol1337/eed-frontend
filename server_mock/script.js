const fs = require("fs");

fs.readFile("../src/views/P302O/P302O.json", (err, data) => {
  if (err) throw err;
  let obj = JSON.parse(data);
  console.log(obj.blocks[0]);
  let set = new Set();
  let idPanel = 1;
  obj.blocks.forEach((block) => {

    let idComp = 0;
    block.id = idPanel;
    block.components.forEach((comp) => {
      
      //console.log(comp.name);
      
      set.add(comp.name);
      comp.id = idPanel * 1000 + idComp;
      if (comp.name.search("jumper") !== -1) {
        comp.initValue = null;
        comp.currentValue = null;
      } else {
        comp.initValue = comp.valuesAndPhotos[0].value;
        comp.currentValue = comp.valuesAndPhotos[0].value;
      }
      idComp++;
    });
    idPanel++;
  });
  console.log(set);
  console.log("Printing");
  obj.blocks.forEach((block) => {
    block.components.forEach((comp) => {
      console.log(
        comp.id +
          " : " +
          comp.name +
          " : " +
          comp.initValue +
          " : " +
          comp.currentValue
      );
    });
  });
  fs.writeFile("../src/views/P302O/P302O_1.json",JSON.stringify(obj),(err)=>{console.log(err)})
});
