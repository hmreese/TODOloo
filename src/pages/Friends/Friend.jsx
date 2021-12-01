import React, { useEffect, useState } from "react";
import List from "../../components/List";
import Modal from "../../components/Modal";
import { Box, Flex, Slider, Text } from "@theme-ui/components";

const Friend = ({friend, setFriends}) => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [lists, setLists] = useState(friend?.[0].lists);

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <div style={{ height: "110vh", width: '100%' }} className="">
      {isModalOpen && <Modal type="friend" onRequestClose={toggleModal} setFriends={setFriends} />}
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingX: "4rem",
        }}
      >
        <h1>{friend?.[0].username}'s Lists</h1>
        <button onClick={toggleModal}>Add Friend</button>
      </Flex>
      <Flex
        sx={{
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
        }}
        className="wrapper"
      >
        {friend?.[0]?.lists?.map((list, i) => (
          <List
            friend
            user={friend?.[0]}
            key={list.name + i}
            height={(list.length + 1) * 30}
            list={list}
            lists={lists}
          />
        ))}
      </Flex>
    </div>
  );
};

export default Friend;
