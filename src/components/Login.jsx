import React, { useState, useContext } from 'react'

import firebase from '../firebase'

import { withRouter } from 'react-router-dom'

import Blob from '../images/blob.svg'
import { AuthContext } from '../Auth'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { currentUser } = useContext(AuthContext)

    if(currentUser) props.history.push('/todo')

    return(
        <div className="access-container">
            <h1 className="h1 text-center">Login</h1>
            <img className="blob" src={Blob} alt=""/>
            <div className="access-form-container">
                <div className="access-form">
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="text-input" name="" id="" placeholder="Email..."/>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="text-input" name="" id="" placeholder="Password..."/>
                    <button className="blue-button" onClick={() => handleLogin()}>Submit</button>
                </div>
            </div>
            <span className="access-switch">
                <p>Don't have an account?</p><button onClick={() => props.setPage('signup')} className="white-text-button">Get Started</button>
            </span>
        </div>
    )

    async function handleLogin() {
        try {
            await firebase.login(email, password)
            props.history.push('/todo')
        } catch(err) {
            alert(err.message)
        }
    }
}

export default withRouter(Login)
