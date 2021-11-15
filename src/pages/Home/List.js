import React, {useState, useEffect, Fragment} from 'react';
import AppTasks from './AppTasks'
import ToDoTotal from './ToDoTotal'
import App from './App'
import listList from './App'
import data3 from './data3'
import ListList from './ListList'


// return (
//     <div className = "ListList">
//         {listList.map(todo => {
//             return (
//                 <List todo={todo} handleToggle={handleToggle} handleFilter={handleFilter}/>
//             )
//         })}
//         <button style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</button>
//     </div>
// );


//const Display = ({newList}) => {
    // var name = newList.list.name
    // return (
    //     <div className = "center1">
    //         {newList.name}
            
    //         <div className = "body1">
    //             Stuff I Got Done 
    //             ////////
    //             {name}
    //         </div>
    //     </div>
    // );
    // return (
    //     <div className = "center1">
    //         {newList.name}
            
    //         <div className = "body1">
    //             Stuff I Got Done 
    //             ////////
    //             {name}
    //         </div>
    //     </div>
    // );
    // var name = newList.list.name

    // newList.map(todo => {
    //     console.log("inside loop")
    //     return (
    //         <div className = "center1">
    //             {todo.name}
                
    //             <div className = "body1">
    //                 Stuff I Got Done 
    //                 ////////
    //                 {todo.name}
    //             </div>
    //         </div>
    //     );    
    // } )
//}


    // return (
    //     <div className = "center1">
    //         {newList.name}
            
    //         <div className = "body1">
    //             Stuff I Got Done 
    //             ////////
    //             {name}
    //         </div>
    //     </div>
    // );


const Display = ({newList}) => {

    var name = newList.list.name
    
    return (
        <div className = "center1">
            {newList.name}
            
            <div className = "body1">
                Stuff I Got Done 
                ////////
                {name}
            </div>
        </div>
    );
};

const List = ({todo, handleToggle}) => {

    const [newAdd, setNewAdd] = useState(false);
    const [newList, setNewList] = useState(todo);
    var oldEvent;
    
    var eternalFlag = 0

    const clicked = (e) => {
        handleClick(e)
        setNewAdd((newAdd) => !newAdd)
        // Display(e.currentTarget, newList)
        // let mapped = newList.map(name => {
        //     return name.complete === true ? { ...name, complete: !name.complete } : { ...name, complete: false};
        //   })
    }

    const handleClick = (e) => {
        //turn all to complete: false
        e.preventDefault()
        handleToggle(e.currentTarget.id)

        //when i click make all tasks uncompleted then toggle
    }

    return (
        <div id={todo.id} list = {todo.list} key={todo.id + todo.name} name="todo" value={todo.id} onClick={clicked} className={todo.complete ? "todo strike green" : "todo dot"}>
            {todo.name}
            {/* <span class="dot"></span> */}
            {/* {newAdd && <TasksList newList={newList}/>} */}
            {newAdd && <Display newList = {newList}/>}
        </div>
    );
};

export default List;