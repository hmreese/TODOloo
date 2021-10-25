import { Flex } from 'theme-ui'
import React, { useState } from 'react'
import * as FAicons from 'react-icons/fa'
import { useUser } from "../utils/hooks"
import { Redirect } from 'react-router'
import './login.scss'
import { theme } from '../theme'
import { ThemeProvider } from '@theme-ui/core'

const Login = () => {

  // UI animation handling states
  const [focusedUser, setFocusedUser] = useState(false)
  const [focusedPass, setFocusedPass] = useState(false)
  const [focusedValidatePass, setFocusedValidatePass] = useState(false)

  // states keeping track of user entered data
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordValidate, setPasswordValidate] = useState('')

  const validation = (e) => {
    e.preventDefault();
    setPasswordValidate(e.target.value);
    if (e.target.value !== password) {
      setErrorMsg('Passwords do not match')
    } else {
      setErrorMsg('')
    }
  }

  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setFocusedUser(false);
    setFocusedValidatePass(false);
    setFocusedPass(false);
    setPassword('');
    setUsername('');
    setPasswordValidate('');
    setClicked(clicked => !clicked);
  }

  // authentication handling
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 201) {
        const userObj = await res.json();
        mutate('http://localhost:5000/api/users', userObj);
      } else {
        setErrorMsg(res.text());
      }
    } catch (e) {
      console.log(e)
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };
    try {
      const res = await fetch('http://localhost:5000/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        const userObj = await res.json();
        mutate('http://localhost:5000/api/auth', userObj);
      } else {
        setErrorMsg('Incorrect username or password. Try again!');
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div id="LoginPage">
      {user && <Redirect to="/"/>}
      <div className="container">
        <Flex className={clicked ? "login-content flip" : "login-content unflip"}>
          <form onSubmit={handleLoginSubmit}>
          {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
            <h2 className="title">Welcome</h2>
              <div className={focusedUser ? "input-div one focus" : "input-div one"}
                sx={{borderBottom: '1px solid', color: 'text'}}
                >
                <div className="i">
                  <FAicons.FaUser className="fas fa-user" sx={{color: 'text'}}></FAicons.FaUser>
                </div>
                <div className="input-container"> 
                    <h5>Username</h5>
                    <label htmlFor="username">
                      <input 
                        type="text" 
                        id="username"
                        name="username"
                        className="input" 
                        value={username}
                        onFocus={() => setFocusedUser(true)}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </label>
                </div>
              </div>
              <div className={focusedPass ? "input-div pass focus" : "input-div pass"}
                sx={{borderBottom: '1px solid', color: 'text'}}
                >
                <div className="i"> 
                  <FAicons.FaLock className="fas fa-lock" sx={{color: 'text'}}></FAicons.FaLock>
                </div>
                <div className="input-container">
                    <h5>Password</h5>
                    <label htmlFor="password">
                      <input 
                        type="password" 
                        id="password"
                        name="password"
                        className="input"
                        value={password}
                        onFocus={() => setFocusedPass(true)}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </label>
                </div>
              </div>
              <button 
                type="submit" 
                className="btn" 
              >
                Sign In
              </button>
              <p>New Here?</p>
              <button type="button" onClick={handleClick} className="btn">
                 Sign Up
              </button>
            </form>
        </Flex>
        <Flex className={clicked ? "signup login-content unflip" : "signup login-content flip"}>
          <form onSubmit={handleRegisterSubmit}>
          {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
            <h2 className="title">Welcome</h2>
            <div className={focusedUser ? "input-div one focus" : "input-div one"}
                sx={{borderBottom: '1px solid', color: 'text'}}
                >
                <div className="i">
                  <FAicons.FaUser className="fas fa-user" sx={{color: 'text'}}></FAicons.FaUser>
                </div>
                <div className="input-container"> 
                    <h5>Username</h5>
                    <label htmlFor="username">
                      <input 
                        type="text" 
                        id="username"
                        name="username"
                        className="input" 
                        value={username}
                        onFocus={() => setFocusedUser(true)}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </label>
                </div>
              </div>
              <div className={focusedPass ? "input-div pass focus" : "input-div pass"}>
                <div className="i"> 
                  <FAicons.FaLock className="fas fa-lock" sx={{color: 'text'}}></FAicons.FaLock>
                </div>
                <div className="div">
                    <h5>Password</h5>
                    <label htmlFor="password">
                      <input 
                        type="password"
                        id="password"
                        name="password" 
                        className="input"
                        value={password}
                        onFocus={() => setFocusedPass(true)}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </label>
                </div>
              </div>
              <div className={focusedValidatePass ? "input-div pass focus" : "input-div pass"}>
                <div className="i"> 
                  <FAicons.FaLock className="fas fa-lock" sx={{color: 'text'}}></FAicons.FaLock>
                </div>
                <div className="div">
                    <h5>Confirm Password</h5>
                    <label htmlFor="password">
                      <input 
                        type="password"
                        id="password"
                        name="password" 
                        className="input"
                        value={passwordValidate}
                        onFocus={() => setFocusedValidatePass(true)}
                        onChange={validation}
                      />
                    </label>
                </div>
              </div>
              <button type="submit" className="btn">
                Sign Up
              </button>
              <p>Already a Member?</p>
              <button onClick={handleClick} type="button" className="btn">
                Sign In
              </button>
            </form>
        </Flex>
      </div>
    </div>
  )
}

const LoginForm = () => {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  )
}

export default LoginForm;