import React, { useState } from 'react'

import firebase from '../firebase'

function AddTodoItem(props) {
    const [text, setText] = useState('')
    return(
        <div className="add-todo-item-container">
            <input onChange={e => setText(e.target.value)} value={text} type="text" className="text-input" id="todo-text-input" placeholder="What needs to be done?"/>
            <button onClick={ () => handleNewTodo() } className="blue-button">Add</button>
        </div>
    )

    async function handleNewTodo() {
        if(text !== '') {
            try {
                setText('')
                await firebase.newTodo(props.userID, text)
            } catch(err) {
                alert(err.message)
            }
        } else {
            alert('Please enter some text!')
        }
    }
}

export default AddTodoItem
