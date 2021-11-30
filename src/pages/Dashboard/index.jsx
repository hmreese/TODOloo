import React, {useState} from 'react'

const Dashboard = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

    return (
    <div className="container">
        <h1>{user?.username}'s Dashboard</h1>
    </div>
    )
}

export default Dashboard;