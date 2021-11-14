import React, {useState, useEffect, Fragment} from 'react';

import Table from './Table';
import Form from './Form';
import axios from 'axios';
import './home.scss'
import App from './App';
import data from "./data.json";
import data2 from "./data2.json";
import ListForm from './ListForm';

function ToDoTotal(){    
    const [ toDoList, setToDoList ] = useState(data);
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

    const handleClick = (e) => {
        e.preventDefault()
        handleToggle(e.currentTarget.id)
    }
    

    return (
        <div id={todo.id} key={todo.id + todo.task} name="todo" value={todo.id} onClick={handleClick } className={todo.complete ? "todo strike" : "todo"}>
            {todo.task}
        </div>
    );
  };
  
  const ToDoList = ({toDoList, handleToggle, handleFilter}) => {
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
}
export default ToDoTotal