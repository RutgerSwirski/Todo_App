import React from 'react'
import firebase from '../firebase'

function TodoItem(props) {
    return(
        <div className="todo-item-container">
            <label className="checkbox-container" onClick={ () => handleUpdate() }>
                <input type="checkbox" checked={ props.todo.completed } />
                <span className="checkmark"></span>
            </label>
            <p className="todo-item-text">{ props.todo.todo_text } </p>
            <button onClick={() => handleDelete()} className="close-button"></button>
        </div>
    )

    async function handleDelete() {
        try {
            await firebase.deleteTodo(props.todo.id)
        } catch(err) {
            alert(err.message)
        }
    } 

    async function handleUpdate() {
        try {
            await firebase.updateTodo(props.todo.id, !props.todo.completed)
        } catch(err) {
            alert(err.message)
        }
    }
}

export default TodoItem