import { Flex } from '@theme-ui/components';
import React, { useEffect, useState } from 'react'
import './modal.scss'

const Modal = ({ onRequestClose, type, listName, lists, setLists, setFriends }) => {
    const [user] = useState(JSON.parse(localStorage.getItem("user")));
	// Use useEffect to add an event listener to the document
	useEffect(() => {
		function onKeyDown(event) {
			if (event.keyCode === 27) {
				// Close the modal when the Escape key is pressed
				onRequestClose();
			}
		}

		// Prevent scolling
		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", onKeyDown);

		// Clear things up when unmounting this component
		return () => {
			document.body.style.overflow = "visible";
			document.removeEventListener("keydown", onKeyDown);
		};
	});

    const listOptions = {
        title: 'New List',
        label1: 'List Title',
        label2: '',
        label3: ''
    }

    const friendOptions = {
        title: 'Add Friend',
        label1: 'Friend Username',
        label2: '',
        label3: ''
    }

    const taskOptions = {
        title: 'New Task',
        label1: 'Task Title',
        label2: 'Task Description',
        label3: 'Priority Level'
    }

    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');

    let options = listOptions;
    if (type === 'task') options = taskOptions;
    if (type === 'friend') options = friendOptions;

    const submitList = async (body) => {
        try {
            const res = await fetch(`https://todoloo307server.herokuapp.com//${user.username}/lists`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            });
            console.log(res)
            if (res.status === 201) {
              const lists = await res.json();
              setLists(lists)
              onRequestClose()
            } 
          } catch (e) {
            console.log(e)
          }
    }

    const submitTask = async (body) => {
        try {
            const res = await fetch(`https://todoloo307server.herokuapp.com//${user.username}/lists/${listName}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            });
            console.log(res)
            if (res.status === 201) {
              const newLists = await res.json();
              setLists(newLists)
              onRequestClose()
            } 
          } catch (e) {
            console.log(e)
          }
    }

    const addFriend = async (body) => {
        try {
            const res = await fetch(`https://todoloo307server.herokuapp.com/${user.username}/friends`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            });
            console.log(res)
            if (res.status === 200) {
              const lists = await res.json();
              console.log(lists)
              setFriends(lists)
              onRequestClose()
            } 
          } catch (e) {
            console.log(e)
          }
    }

    const onSubmit = () => {
        if (type === "friend") return addFriend({friend_username: option1})
        let body = {
            listname: option1
        }
        if (type !== "task") return submitList(body);
        body = {
            task_num: 0,
            title: option1,
            date: new Date(Date.now()).toISOString(),
            description: option2,
            priority: option3,
            completed: false
        }
        return submitTask(body)
    }

	return (
		<div className="modal__backdrop">
			<div className="modal__container">
				<h3 className="modal__title">{options.title}</h3>
                <label htmlFor="input1">{options.label1}</label>
                <input onChange={(e) => setOption1(e.target.value)} value={option1} type="text" id="input1" name="input1"/>
                {options.label2 && 
                <>
                    <label htmlFor="input2">{options.label2}</label>
                    <input onChange={(e) => setOption2(e.target.value)} value={option2} type="text" id="input2" name="input2"/>
                </>}
                {options.label3 && 
                <>
                    <label htmlFor="select1">{options.label3}</label>
                    <select onChange={(e) => setOption3(e.target.value)} value={option3} name="select1" id="select1">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </>}
                <Flex sx={{justifyContent: 'space-between', marginTop: '25px'}}>
                    <button type="button" onClick={onRequestClose}>
                        Close
                    </button>
                    <button type="button" onClick={onSubmit}>
                        Add
                    </button>
                </Flex>
			</div>
		</div>
	);
};

export default Modal;