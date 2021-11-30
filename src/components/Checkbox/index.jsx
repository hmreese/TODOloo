import { Flex } from "@theme-ui/components";
import React, { useCallback, useState } from "react";
import "./checkbox.scss";
import confetti from "canvas-confetti";
import { FaTrashAlt } from "react-icons/fa";

const CheckBox = ({ label, index, confettiLevel, status, lists, setLists }) => {
  const [checked, setChecked] = useState(status);

  const completeTask = useCallback(() => {
    confetti({
      particleCount: confettiLevel * 3,
      spread: confettiLevel * 2,
      origin: {
        x: 0.5,
        y: 0.65,
      },
    });
    setChecked(true);
    // try {
    //     const res = await fetch(`http://localhost:5000/${user.username}/lists/${}`, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(body),
    //     });
    //     console.log(res)
    //     if (res.status === 201) {
    //       const lists = await res.json();
    //       setLists(lists)
    //     } 
    //   } catch (e) {
    //     console.log(e)
    //   }
  }, [confettiLevel]);

//   const incompleteTask = async () => {
//     setChecked(false);
//     try {
//         const res = await fetch(`http://localhost:5000/${user.username}/lists`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(body),
//         });
//         console.log(res)
//         if (res.status === 201) {
//           const lists = await res.json();
//           setLists(lists)
//           onRequestClose()
//         } 
//       } catch (e) {
//         console.log(e)
//       }
//   }

  return (
    <Flex>
      <input
        id={`cbx-${label}-${index}`}
        name={`cbx-${label}-${index}`}
        className="hidden"
        type="checkbox"
      />
      <label
        onClick={!checked ? completeTask : () => setChecked(false)}
        className="cbx"
        htmlFor={`cbx-${label}-${index}`}
      ></label>
      <label
        onClick={!checked ? completeTask : () => setChecked(false)}
        className="lbl"
        htmlFor={`cbx-${label}-${index}`}
        data-content={label}
      >
        {label}
      </label>
      <FaTrashAlt className="trash" />
    </Flex>
  );
};

export default CheckBox;
