import React from 'react';

function Home({user, setUser}) {

  return (
    <div className="container">
      <h1>Home page works</h1>
      {user && 
      <div>
        <h2>Hello {user.username}!</h2>
      </div>}
    </div>
  )
}


export default Home;