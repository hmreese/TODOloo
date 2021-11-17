import React, { useState } from 'react';
import data3 from "./data3.json"
import './home.scss'

const ListForm = ({ addList }) => {

    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }
    const [ toDoList2, setToDoList2 ] = useState(data3);

    const handleSubmit = (e) => {
        e.preventDefault();
        addList(userInput);
        setUserInput("");
    }
    
    return (
        <form className = 'bottomleft' onSubmit={handleSubmit}>
            <input value={userInput} type="text" onChange={handleChange} placeholder="Enter list..."/>
            <button>Submit</button>
        </form>
    );
};

export default ListForm;