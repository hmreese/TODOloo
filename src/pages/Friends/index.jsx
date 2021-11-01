import React, {useState} from 'react'

const Friends = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    return (
    <div className="container">
        <h1>{user?.username}'s Friends</h1>
    </div>
    )
}

export default Friends;