import { Flex } from '@theme-ui/components';
import React, { useEffect } from 'react'
import './modal.scss'

const Modal = ({ onRequestClose, type }) => {
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

    const taskOptions = {
        title: 'New Task',
        label1: 'Task Title',
        label2: 'Task Description',
        label3: 'Priority Level'
    }

    let options = listOptions;
    if (type === 'task') options = taskOptions;

	return (
		<div className="modal__backdrop">
			<div className="modal__container">
				<h3 className="modal__title">{options.title}</h3>
                <label htmlFor="input1">{options.label1}</label>
                <input type="text" id="input1" name="input1"/>
                {options.label2 && 
                <>
                    <label htmlFor="input2">{options.label2}</label>
                    <input type="text" id="input2" name="input2"/>
                </>}
                {options.label3 && 
                <>
                    <label htmlFor="select1">{options.label3}</label>
                    <select name="select1" id="select1">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </>}
                <Flex sx={{justifyContent: 'space-between', marginTop: '25px'}}>
                    <button type="button" onClick={onRequestClose}>
                        Close
                    </button>
                    <button type="button" onClick={onRequestClose}>
                        Add
                    </button>
                </Flex>
			</div>
		</div>
	);
};

export default Modal;