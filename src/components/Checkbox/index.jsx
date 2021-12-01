import { Flex } from "@theme-ui/components";
import React, { useCallback, useState } from "react";
import "./checkbox.scss";
import confetti from "canvas-confetti";
import { FaTrashAlt } from "react-icons/fa";

const CheckBox = ({ label, index, confettiLevel, status, lists, setLists, listName, user, taskNum, friend }) => {
  const [checked, setChecked] = useState(status);

  const completeTask = useCallback( async () => {
    confetti({
      particleCount: confettiLevel * 6,
      spread: confettiLevel * 4,
      origin: {
        x: 0.5,
        y: 0.65,
      },
    });
    setChecked(true);
    try {
        const res = await fetch(`https://todoloo307server.herokuapp.com/${user.username}/lists/${listName}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({task_num: taskNum, completed: true}),
        });
        console.log(res)
        if (res.status === 201) {
          const lists = await res.json();
          setLists(lists)
        } 
      } catch (e) {
        console.log(e)
      }
  }, [confettiLevel, listName, setLists, taskNum, user.username]);

  const incompleteTask = async () => {
    setChecked(false);
    try {
      const res = await fetch(`https://todoloo307server.herokuapp.com/${user.username}/lists/${listName}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({task_num: taskNum, completed: false}),
      });
      console.log(res)
      if (res.status === 201) {
        const lists = await res.json();
        setLists(lists)
      } 
    } catch (e) {
      console.log(e)
    }
  }

  const deleteTask = async () => {
    try {
      const res = await fetch(`https://todoloo307server.herokuapp.com/${user.username}/lists/${listName}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({task_num: taskNum}),
      });
      console.log(res)
      if (res.status === 200) {
        const lists = await res.json();
        setLists(lists)
      } 
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Flex>
      <input
        id={`cbx-${label}-${index}`}
        name={`cbx-${label}-${index}`}
        className="hidden"
        type="checkbox"
        defaultChecked={checked}
        disabled={friend}
      />
      <label
        onClick={!friend ? !checked ? completeTask : incompleteTask : null}
        className="cbx"
        htmlFor={`cbx-${label}-${index}`}
      ></label>
      <label
        onClick={!friend ? !checked ? completeTask : incompleteTask : null}
        className="lbl"
        htmlFor={`cbx-${label}-${index}`}
        data-content={label}
      >
        {label}
      </label>
      {!friend && <FaTrashAlt onClick={deleteTask} className="trash" />}
    </Flex>
  );
};

export default CheckBox;
