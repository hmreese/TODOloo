import React, {useState} from 'react';

function Form(props) {
  const tasks = []
  const [person, setPerson] = useState(
     {
        name: '',
        job: '',
     }
  );

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "job")
      setPerson(
         {name: person['name'], job: value}
      );
    else
       setPerson(
         {name: value, job: person['job']}
       );
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({name: '', job: '', id: ''});
    tasks.push(person)
    console.log(tasks)
    
  }



  return (
    <div>
      {/* <div>
        {tasks}
      </div> */}
      <form>
        <label htmlFor="Task">Task</label>
        <input
          type="text"
          name="task"
          id="name"
          value={person.name}
          onChange={handleChange} />
        <label htmlFor="Description">Description</label>
        <input
          type="text"
          name="job"
          id="job"
          value={person.job}
          onChange={handleChange} />
          <input type="button" className = "btn" value="Add Task" onClick={submitForm} />
          
      </form>
    </div>
);


}




export default Form;