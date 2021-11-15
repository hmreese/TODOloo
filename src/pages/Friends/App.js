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
 const [display, setDisplay] = useState(false);
 const [newList, setNewList] = useState('');
 const [complete, setComplete] = useState(true);

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
const Display = ({newList, complete}) => {
  console.log("DISPLAY")
    var name = newList.list.name
    console.log("COmplete " + complete)
    if(complete == true){
      return (
          <div className = "center1">
              {newList.name}
              <div className = "body1">
                  <h1>TODO</h1>
                  {name}
              </div>
          </div>
      );
    }
    else {
      return(
        null
      )
      
    }
      
    
}
  const handleToggle = (id, newList) => {
    setDisplay((display) => false)

    console.log("toggle", newList)
    var name = newList.list.name
    console.log("toggleName", name)

    let mapped = listList.map(name => {
      return name.id === Number(id) ? { ...name, complete: !name.complete } : { ...name, complete: false};
    })
    setToDoList(mapped);
    let boolCheck = listList.map(name => {
      if (name.id === Number(id)){ 
        newList.complete = name.complete
      };
    })


    
    setNewList(newList);
    console.log("f/t 1"+ display)

    setDisplay((display) => true)

    console.log("f/t 2"+ display)
    
    console.log("newList.complete "+ newList.complete)

    ////
    if (newList.complete == true){
      console.log("made it"+ display)
      setDisplay((display) => false)
    }


    // Display(newList)
  }


  const addList = (userInput ) => {
    let copy = [...listList];
    copy = [...copy, { id: listList.length + 1, name: userInput, complete: false }];
    setToDoList(copy);
  }
  

  return (
    <div className="App">
      <div className = "AppCSS">
      {display && <Display newList = {newList} complete = {complete}/>}
      <ListList listList={listList} handleToggle={handleToggle}/>
      </div>
    </div>
  );
}

export default App;
