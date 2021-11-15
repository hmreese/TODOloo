import React, { useState } from "react";
import "./Lists.scss";
import List from "../../components/List";
import Modal from "../../components/Modal";
import { Box, Flex, Slider, Text } from "@theme-ui/components";

const Lists = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [confettiLevel, setConfettiLevel] = useState(25);

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  const lists = [
    {
      title: "Test Title",
      items: [
        "test test test test",
        "test test test test",
        "test test test test",
        "test test test test",
        "test test test test",
      ],
    },
    {
      title: "Another Title",
      items: ["TESTTTTTE TESTS", "TESTTTTTE TESTS", "TESTTTTTE TESTS"],
    },
    {
      title: "Star Wars Quotes",
      items: [
        "Do. Or do not. There is no try.",
        "The ability to speak does not make you intelligent.",
        "This is the way.",
      ],
    },
    // {
    //   title: 'test title 2',
    //     items: [
    //       'test2 test test test test',
    //       'test2 test test test test',
    //       'test2 test test test test',
    //       'test2 test test test test',
    //       'test2 test test test test',
    //     ]
    //   },
    //   {
    //       title: ' another title 2',
    //       items: [
    //           'TESTTTTTE TESTS',
    //           'TESTTTTTE TESTS',
    //           'TESTTTTTE TESTS',
    //         ]
    //       },
    // {
    //   title: 'test title 3',
    //     items: [
    //       'test test test test',
    //       'test test test test',
    //       'test test test test',
    //       'test test test test',
    //       'test test test test',
    //     ]
    //   },
    //   {
    //       title: ' another title 3',
    //       items: [
    //           'TESTTTTTE TESTS',
    //           'TESTTTTTE TESTS',
    //           'TESTTTTTE TESTS',
    //         ]
    //       },
    // {
    //   title: 'title',
    //   items: [
    //     'test test test test'
    //   ]
    // },
  ];

  return (
    <div style={{ height: "110vh" }} className="container">
      {isModalOpen && <Modal type="list" onRequestClose={toggleModal} />}
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
        {lists.map((list, i) => (
          <List
            key={list.title + i}
            height={(list.length + 1) * 30}
            list={list}
            confettiLevel={confettiLevel}
          />
        ))}
      </Flex>
    </div>
  );
};

export default Lists;
