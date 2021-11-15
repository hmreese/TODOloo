import React from 'react';
import List from './List';

const ListList = ({listList, handleToggle, handleFilter}) => {
    console.log("listList+"  +listList)
    return (
        <div className = "ListList">
            <h1 style={{color: "turqoise", textDecoration: "underline"}}>Your Friends</h1>
            {listList.map(todo => {
                return (
                    <List todo={todo} handleToggle={handleToggle} newList ={listList}/>
                )
            })}
            {/* <button style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</button> */}
        </div>
    );
};

export default ListList;