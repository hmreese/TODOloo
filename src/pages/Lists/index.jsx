import React, {useState} from 'react'

const Lists = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    return (
    <div className="container">
        <h1>{user?.username}'s Lists</h1>
    </div>
    )
}

export default Lists;