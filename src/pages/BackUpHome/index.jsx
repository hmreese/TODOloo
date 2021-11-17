import React, {useState, useEffect} from 'react';

import Table from './Table';
import Form from './Form';
import axios from 'axios';
import './home.scss'



function MyApp() {
  const headingStyle = {
    color : 'red', backgroundColor: 'black'
  }
  
  const [share, setShare] = useState('Successfully Shared!')
  const [list2,setList2] = useState(["Saab", "Volvo", "BMW"]);
  const [homepage, setHomepage] = useState(false)
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
       const response = await axios.post('http://localhost:5000/users', person);
       return response.data;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5000/users');
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

      const response = await axios.delete('http://localhost:5000/users/'.concat(person._id));
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


function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}


TodoList()
  return (
    
    
    <div className="custom">
      {homepage && <o1>{share}</o1>}
      {homepage && <button 
      className = "x"
      type="submit"
      onClick={()=> (setHomepage(false))}>
        <p>x</p>
      </button>   
      }
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
      <button 
        className="btn" 
        onClick={()=> !(setHomepage(true))}
        >
      Share List
      </button>   
      
    </div>


    
  )
}


export default MyApp;