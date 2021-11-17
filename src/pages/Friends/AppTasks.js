import React, { useState } from 'react';
//mock data
import data from "./data.json";
//components
import TasksList from "./TasksList";
import TasksForm from './TasksForm';

function AppTasks() {
  
  const [ toDoList, setToDoList ] = useState(data);

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
    copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false }];
    setToDoList(copy);
  }

  const TasksList = ({tasksList, handleToggle, handleFilter}) => {
    console.log("3 TasksList")
    return (
        <div>
            {tasksList.map(todo => {
                return (
                    <Tasks todo={todo} handleToggle={handleToggle} handleFilter={handleFilter}/>
                )
            })}
            <button style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</button>
        </div>
    );
};

const Tasks = ({todo, handleToggle}) => {

  function clicked(e){
      handleClick(e)
  }

  const handleClick = (e) => {
      e.preventDefault()
      handleToggle(e.currentTarget.id)
  }
  return (
      <div id={todo.id} list = {todo.list} key={todo.id + todo.name} name="todo" value={todo.id} onClick={clicked} className={todo.complete ? "todo strike" : "todo"}>
          {todo.name}
      </div>
  );
};

  return (
    <div className="App">
      <TasksList/>
    </div>
  );
}

export default AppTasks;
