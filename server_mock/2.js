const fs = require("fs");

fs.readFile("../src/views/P302O/P302O.json", (err, data) => {
  if (err) throw err;
  let obj = JSON.parse(data);

  obj.blocks.forEach((block) => {
    block.components.forEach((comp)=>{
      comp.caption = null;
    });
  });

  fs.writeFile("../src/views/P302O/P302O_1.json",JSON.stringify(obj),(err)=>{console.log(err)})
});
