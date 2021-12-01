import React, { useState } from "react";
import CheckBox from "../Checkbox";
import { motion } from "framer-motion";
import { Box, Flex, Text } from "@theme-ui/components";
import Modal from "../Modal";
import { AiOutlineCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

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

const List = ({ height, list, confettiLevel, lists, setLists, user, friend }) => {
  const [isOpen, toggleDropdown] = useState(false);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  const deleteList = async () => {
    try {
      const res = await fetch(`https://todoloo307server.herokuapp.com/${user.username}/lists`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({listname: list.name}),
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
    <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      {isModalOpen && <Modal type="task" onRequestClose={toggleModal} listName={list.name} lists={lists} setLists={setLists} />}
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
        {!friend && <button onClick={toggleModal}>+</button>}
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
          {list.name}{" "}
        </Text>
        <Flex>
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
          {!friend && <Box sx={{marginLeft: '20px', marginRight: '-10px'}}>
            {isHovering && <FaTrashAlt onClick={deleteList} className="trash" />}
          </Box>}
        </Flex>
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
              {list.tasks.map((item, index) => (
                <li key={index} className="item">
                  <CheckBox
                    friend={friend || null}
                    user={user}
                    taskNum={index}
                    listName={list.name}
                    confettiLevel={confettiLevel}
                    label={item.title}
                    index={index}
                    status={item.completed}
                    lists={lists}
                    setLists={setLists}
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
