import React, { useState, useEffect } from 'react'
import AddTodoItem from '../components/AddTodoItem'

import {withRouter} from 'react-router-dom'

import firebase from '../firebase'

import TodoItem from '../components/TodoItem'

import Blob from '../images/blob.svg'

function Todo(props) {
    const [userEmail, setUserEmail] = useState('')
    const [todos, setTodos] = useState([])
    const [userID, setUserID] = useState('')

    useEffect(() => {
        firebase.getCurrentUserEmail()
        .then((email) => setUserEmail(email))

        firebase.getCurrentUserID()
        .then((id) => { setUserID(id) })

        const unsubscribe = firebase.todosRef.onSnapshot((snap) => {
            const data = snap.docs.map((doc => { return {...doc.data(), id: doc.id } }))
            const filteredData = []
            data.map(todo => todo.user === userID && filteredData.push(todo))
            setTodos(filteredData)
        })
        return () => unsubscribe()
    }, [userID])


    return(
        <div className="bg bg-blue bg-flex-center">
            <img className="blob" src={Blob} alt=""/>
            <div className="todo-container">
                <div className="todo-top">
                    <h1 className="h1">Welcome {userEmail},</h1>
                    <button onClick={ () => onLogout() } className="white-text-button logout-button">Logout</button>
                </div>
                <div className="todo-items-title">
                    <h2 className="h2-black">Here are your todos:</h2>
                </div>
                <div className="todo-items-container">
                    <AddTodoItem userID={userID} />
                    { todos.map((todo) => (
                        <TodoItem todo={todo} />
                    )) }
                </div>
            </div>
        </div>
    )

    async function onLogout() {
        try {
            await firebase.logout()
            props.history.push('/')
        } catch(err) {
            alert(err.message)
        }
    }
}

export default withRouter(Todo)