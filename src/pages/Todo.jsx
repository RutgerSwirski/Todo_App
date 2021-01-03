import React, { useState, useEffect } from 'react'
import AddTodoItem from '../components/AddTodoItem'

import {withRouter} from 'react-router-dom'

import firebase from '../firebase'

import TodoItem from '../components/TodoItem'

import Blob from '../images/blob.svg'

function Todo(props) {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        const userID = firebase.auth.currentUser.uid
        const unsubscribe = firebase.todosRef.onSnapshot((snap) => {
            const data = snap.docs.map((doc => { return {...doc.data(), id: doc.id } }))
            const filteredData = []
            data.map(todo => todo.user === userID && filteredData.push(todo))
            setTodos(filteredData)
        })
        return () => unsubscribe()
    }, [])


    return(
        <div className="bg bg-blue bg-flex-center">
            <img className="blob" src={Blob} alt=""/>
            <div className="todo-container">
                <div className="todo-top">
                    <h1 className="h1">Welcome {firebase.auth.currentUser.email},</h1>
                    <button onClick={ () => onLogout() } className="white-text-button logout-button">Logout</button>
                </div>
                <div className="todo-items-title">
                    <h2 className="h2-black">Here are your todos:</h2>
                </div>
                <div className="todo-items-container">
                    <AddTodoItem  />
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