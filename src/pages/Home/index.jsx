import React from "react";
import "./home.css";

function Home({ user, setUser }) {
  return (
    <div className="container">
      <div className="feature-grid-container grid grid--columns">
        <div className="feature-grid-text">
          <h2 className="fs-700 uppercase text-compressed">
            Are you ready for <span className="text-primary">TODOLOO?</span>
            <br />
            BECOME ADDICTED TO BEING PRODUCTIVE.
          </h2>
          <p>
            TODOLOO maximizes your production by using{" "}
            <strong>game changing</strong> dopamine hits and competition with
            your "friends"
          </p>
        </div>
        <div className="grid feature-grid">
          <a href="/login">Login</a>
          <a href="/login">List it</a>
          <a href="/login">TODOLOOOOOO</a>
          <a href="/login">Sign Up</a>
          <a href="/login">plz join</a>
          <a href="/login" aria-label="Dex liquidity oracle">
            GET ORGANIZED NOW!!!!!!!!!
          </a>
          <a href="/login" aria-label="Liquidity difference force multiplier">
            u know u wanna
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
