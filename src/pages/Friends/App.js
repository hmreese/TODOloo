import { Box, Flex } from '@theme-ui/components';
import React, { useState, useEffect } from 'react';
import Friend from './Friend';

function App() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
 const [currentFriend, setCurrentFriend] = useState(null);
 const [friends, setFriends] = useState([]);

 const getFriends = async () => {
  try {
    const res = await fetch(`https://todoloo307server.herokuapp.com/${user.username}/friends`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res)
    if (res.status === 200) {
      const friends = await res.json();
      console.log(friends)
      setCurrentFriend(friends[2])
      return setFriends(friends);
    } 
  } catch (e) {
    console.log(e)
    return 
  }
}

 useEffect(() => {
    getFriends();
 }, [])

  return (
    <Flex className="App">
      <div className="AppCSS">
        <h2 className="friends-title">Friends</h2>
        {friends?.map((friend) => (
          friend?.[0]?.name && 
          <Box onClick={() => setCurrentFriend(friend)} className="friend">
            {friend?.[0]?.name}
          </Box>
        ))}
      </div>
      <Friend setFriends={setFriends} friend={currentFriend} />
    </Flex>
  );
}

export default App;
