import React from 'react';
import List from './List';


const TasksList = ({tasksList, handleToggle, handleFilter}) => {
    console.log("3 TasksList")
    console.log(tasksList)
    return (
        <div>
            {tasksList.map(todo => {
                return (
                    <List todo={todo} handleToggle={handleToggle} handleFilter={handleFilter}/>
                )
            })}
            <button style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</button>
        </div>
    );
};

export default TasksList;