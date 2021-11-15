import { Flex } from "@theme-ui/components";
import React, { useCallback, useState } from "react";
import "./checkbox.scss";
import confetti from "canvas-confetti";
import { FaTrashAlt } from "react-icons/fa";

const CheckBox = ({ label, index, confettiLevel }) => {
  const [checked, setChecked] = useState(false);

  const onClick = useCallback(() => {
    confetti({
      particleCount: confettiLevel * 3,
      spread: confettiLevel * 2,
      origin: {
        x: 0.5,
        y: 0.65,
      },
    });
    setChecked(true);
  }, [confettiLevel]);

  return (
    <Flex>
      <input
        id={`cbx-${label}-${index}`}
        name={`cbx-${label}-${index}`}
        className="hidden"
        type="checkbox"
      />
      <label
        onClick={!checked ? onClick : () => setChecked(false)}
        className="cbx"
        htmlFor={`cbx-${label}-${index}`}
      ></label>
      <label
        onClick={!checked ? onClick : () => setChecked(false)}
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
