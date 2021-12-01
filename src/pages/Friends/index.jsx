import React, {useState, useEffect, Fragment} from 'react';

import Table from './Table';
import Form from './Form';
import axios from 'axios';
import './home.scss'
import App from './App';
import data from "./data.json";
import data2 from "./data2.json";
import data3 from "./data3.json";
import Circle from "./Circle.js";

import ListForm from './ListForm';

// copy = [...copy, { 
//   id: toDoList.length + 1, task: userInput, complete: false }];

function MyApp() {

  const FirstHash = new Map([[1,  data2]]);
  
  const ToDoForm = ({ addTask }) => {

    const [ userInput, setUserInput ] = useState('');
    
    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(userInput);
        setUserInput("");
    }

    const handleSubmitList = (e) => {
      e.preventDefault();
      addTask(userInput);
      setUserInput("");
  }
    return (
        <form onSubmit={handleSubmit}>
            <input class = "rightText" value={userInput} type="text" onChange={handleChange} placeholder="Enter task..."/>
            <button className = "btn2">Submit</button>
        </form>
    );
  };
  const ToDo = ({todo, handleToggle}) => {
    console.log("RUNIT")
    const handleClick = (e) => {
        e.preventDefault()
        handleToggle(e.currentTarget.id)
        console.log("handleClick")
    }
    

    return (
        <div id={todo.id} key={todo.id + todo.task} name="todo" value={todo.id} onClick={handleClick } className={todo.complete ? "todo strike" : "todo"}>
            {todo.task}

        </div>
    );
  };
  
  const ToDoList = ({toDoList, handleToggle, handleFilter}) => {
    console.log("here "+ Object.values(toDoList))
    return (
        <div className = "">
            {/* this is how you make the list */}
            {toDoList.map(todo => {
                return (
                    <ToDo todo={todo} handleToggle={handleToggle} handleFilter={handleFilter}/>
                )
            })}
            <button className = "btn" style={{margin: '10px'}} onClick={handleFilter}>Clear Completed</button>
        </div>
    );
  };


  
  const [ toDoList, setToDoList ] = useState(data3);
  
  const [toDoList2] = [];

  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
    });
    setToDoList(mapped);
  }

  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      return !task.complete;
    });
    setToDoList(filtered);
  }

  const addTask = (userInput ) => {
    let copy = [...toDoList];
    copy = [...copy, { 
      id: toDoList.length + 1, task: userInput, complete: false }];
      console.log(toDoList)
      setToDoList(copy);
  }



  //////////
  const headingStyle = {
    color : 'red', backgroundColor: 'black'
  }
  
  const [list2,setList2] = useState(["Saab", "Volvo", "BMW"]);
  const [list1, setList1] = useState(false)

  const [characters, setCharacters] = useState([]);

  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
      return i !== index
    });
    deleteid(characters[index])
    setCharacters(updated);

  }
  

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setCharacters(result);
    });
  }, [] );

  async function makePostCall(person){
    try {
       const response = await axios.post('https://todoloo307server.herokuapp.com//users', person);
       return response.data;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

  async function fetchAll(){
    try {
       const response = await axios.get('https://todoloo307server.herokuapp.com//users');
       return response.data.users_list;
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error);
       return false;
    }
 }

  async function deleteid(person){
    try {

      const response = await axios.delete('https://todoloo307server.herokuapp.com//users/'.concat(person._id));
      return response.data;
    }
    catch (error){
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

 function updateList(person) {
  makePostCall(person).then( result => {
  if (result)
     setCharacters([...characters, result] );
  });
}




const attempt = (props) => {
  return <Fragment>"some content"</Fragment>;
}

const foo = async function (input) {
  console.log("madeit")
} 


const NewList = () => {

  return (
  <div className= "YESSIR" style={{margin:"20px"}}>
    HELLO
    <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
    <ToDoForm addTask={addTask}/>

  
  </div>
  )
};

const NewListButton = () => {
  // const { mainStore } = useStore(); commented out for the running snippet
  return (
    <div className= "YESSIR" style={{margin:"20px"}}>
      <NewList NewList={NewList}/>

    </div>
  )
};




const [showAdd, setShowAdd] = useState(false);
const [newAdd, setNewAdd] = useState(false);
const buttonname = "hello";
console.log("HOWMANYTIMES")
  return (
    <div className='rowC'>
      {/* <div class="flex-container">
        <div>1</div>
        <div>4</div>
      </div> */}
        

        <App />
        {/* <Circle/> */}
        {/* <button className = "bottomright"

          onClick={() => setNewAdd((newAdd) => !newAdd)}
          icon="pi pi-plus"
        >
          NewListButton
        </button> */}

        {/* {newAdd && <NewListButton />} */}
    </div>
  );
}


export default MyApp;