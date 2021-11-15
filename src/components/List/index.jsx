import React, { useState } from "react";
import CheckBox from "../Checkbox";
import { motion } from "framer-motion";
import { Flex, Grid, Heading, Text } from "@theme-ui/components";
import Modal from "../Modal";
import { AiOutlineCaretDown, AiFillCaretUp } from "react-icons/ai";

const slideVerticalAnimation = {
  open: {
    rotateX: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      mass: 0.8,
      type: "spring",
    },
    display: "block",
  },
  close: {
    rotateX: -15,
    y: -320,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const slideHorizontalAnimation = {
  left: {
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  right: {
    x: -250,
    transition: {
      duration: 0.3,
    },
  },
};

const List = ({ height, list, confettiLevel }) => {
  const [isOpen, toggleDropdown] = useState(false);
  const [isModalOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <div>
      {isModalOpen && <Modal type="task" onRequestClose={toggleModal} />}
      <Flex
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "50vw",
          minWidth: "360px",
          borderRadius: "5px",
          boxShadow: "4px 4px 5px 0px rgba(0,0,0,0.4)",
          border: "1px solid rgba(0,0,0,0.2)",
          paddingY: 3,
          paddingX: 4,
          marginTop: 4,
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        <button onClick={toggleModal}>+</button>
        <Text
          sx={{
            marginRight: "auto",
            marginLeft: "1.5rem",
            fontSize: "1.5rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => toggleDropdown((isOpen) => !isOpen)}
        >
          {list.title}{" "}
        </Text>
        {!isOpen ? (
          <AiOutlineCaretDown
            className="icon"
            onClick={() => toggleDropdown((isOpen) => !isOpen)}
          />
        ) : (
          <AiFillCaretUp
            className="icon"
            onClick={() => toggleDropdown((isOpen) => !isOpen)}
          />
        )}
      </Flex>
      <motion.div
        className="dropdown-container"
        initial="close"
        animate={isOpen ? "open" : "close"}
        variants={slideVerticalAnimation}
      >
        <motion.div
          className="dropdown"
          initial="left"
          animate={"left"}
          variants={slideHorizontalAnimation}
        >
          <motion.div className="menu menu-categories">
            <ul className="item-list">
              {list.items.map((item, index) => (
                <li key={index} className="item">
                  <CheckBox
                    confettiLevel={confettiLevel}
                    label={item}
                    index={index}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default List;
