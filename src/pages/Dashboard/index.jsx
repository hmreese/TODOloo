import React, {useState} from 'react'

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    return (
    <div className="container">
        <h1>{user?.username}'s Dashboard</h1>
    </div>
    )
}

export default Dashboard;