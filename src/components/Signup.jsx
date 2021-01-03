import React, { useState } from 'react'

import { withRouter } from 'react-router-dom'

import Blob from '../images/blob.svg'

import firebase from '../firebase'

function SignUp(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
        <div className="access-container">
            <h1 className="h1 text-center">Sign Up</h1>
            <img className="blob" src={Blob} alt=""/>
            <div className="access-form-container">
                <div className="access-form">
                    <input onChange={(e) => { setEmail(e.target.value) }} type="text" className="text-input" name="" id="" placeholder="Enter your email..."/>
                    <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="text-input" name="" id="" placeholder="Enter a password..."/>
                    <div className="button-container">
                        <button className="blue-button" onClick={ () => { onRegister() } }>Submit</button>
                    </div>
                </div>
            </div>
            <span className="access-switch">
                <p>Already have an account?</p><button onClick={() => props.setPage('login')} className="white-text-button">Login</button>
            </span>
        </div>
    )


    async function onRegister() {
        try {
            await firebase.register(email, password)
            props.history.push('/todo')
        }
        catch(err) {
            alert(err.message)
        }
    }
}


export default withRouter(SignUp) 
