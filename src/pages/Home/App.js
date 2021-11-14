import React, { useState } from 'react';
//mock data
import data from "./data.json";
import data2 from "./data2.json";
import data3 from "./data3.json";

//components
import ListList from "./ListList";
import ListForm from './ListForm';
import Circle from "./Circle.js";

function App() {
  
 const [ listList, setToDoList ] = useState(data2);
 console.log("original list\n" + listList)
//   const FirstHash = new Map([[1,  "Ollie"]]);

// const Display = (newList) => {
//   console.log("DISPLAYU")
//   var name = newList.list.name
//   console.log("name"+ name)
//   return (
//       <div className = "center1">
//           {newList.name}
          
//           <div className = "body1">
//               Stuff I Got Done 
//               ////////
//               {name}
//           </div>
//       </div>
//     );
//   };

  const handleToggle = (id, newList) => {
    console.log("toggle")
    console.log("listlist", listList)
    let ollie = "OLLIE";
    let mapped = listList.map(name => {
      return name.id === Number(id) ? { ...name, complete: !name.complete } : { ...name, complete: false};
    })
    setToDoList(mapped);
    // Display(newList)
  }

  // const handleFilter = () => {
  //   console.log("filtered   ", listList)
  //   let filtered = listList.filter(name => {
  //     return !name.complete;
  //   });
  //   setToDoList(filtered);
  // }

  const addList = (userInput ) => {
    let copy = [...listList];
    console.log("addList\n" + Object.entries(copy))
    copy = [...copy, { id: listList.length + 1, name: userInput, complete: false }];
    setToDoList(copy);
  }
  

  return (
    <div className="AppCSS">
      <div className = "App">
      {/* <Circle/> */}
      <ListList listList={listList} handleToggle={handleToggle}/>
      {/* <ListForm addList={addList}/> */}
      </div>
    </div>
  );
}

export default App;
