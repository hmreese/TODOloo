import React, { useEffect, useState } from "react";
import "./Lists.scss";
import List from "../../components/List";
import Modal from "../../components/Modal";
import { Box, Flex, Slider, Text } from "@theme-ui/components";
import { useLists } from "../../utils/hooks";

const Lists = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [confettiLevel, setConfettiLevel] = useState(25);
  const [lists, setLists] = useState([]);

  const getLists = async () => {
    try {
      const res = await fetch(`http://localhost:5000/${user.username}/lists`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(res)
      if (res.status === 200) {
        const lists = await res.json();
        console.log(lists)
        return setLists(lists);
      } 
    } catch (e) {
      console.log(e)
      return 
    }
  }

  useEffect(() => {
    getLists()
  }, [])

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <div style={{ height: "110vh" }} className="container">
      {isModalOpen && <Modal type="list" onRequestClose={toggleModal} lists={lists} setLists={setLists}/>}
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingX: "4rem",
        }}
      >
        <h1>{user.username}'s Lists</h1>
        <Box sx={{ width: "40vw" }}>
          <Text>Confetti level</Text>
          <Slider
            sx={{ color: "#815bcc", background: "#682ede" }}
            onChange={(e) => setConfettiLevel(e.target.value)}
            defaultValue={25}
          />
        </Box>
        <button onClick={toggleModal}>New List</button>
      </Flex>
      <Flex
        sx={{
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
        }}
        className="wrapper"
      >
        {console.log(lists)}
        {lists?.map((list, i) => (
          <List
            key={list.name + i}
            height={(list.length + 1) * 30}
            list={list}
            confettiLevel={confettiLevel}
            lists={lists} setLists={setLists}
          />
        ))}
      </Flex>
    </div>
  );
};

export default Lists;
