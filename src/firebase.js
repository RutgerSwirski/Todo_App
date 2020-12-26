import firebase from 'firebase/app'

import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESS_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig)
        this.auth = firebase.auth()
        this.db = firebase.firestore()
        this.todosRef = this.db.collection('todos')
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth.signOut()
    }

    async register(email, password) {
        return await this.auth.createUserWithEmailAndPassword(email, password)
    }

    async getCurrentUserEmail() {
        return await this.auth.currentUser.email
    }

    async getCurrentUserID() {
        return await this.auth.currentUser.uid
    }

    async newTodo(user, todo_text ) {
        return await this.todosRef.add({ user, todo_text, completed: false })
    }

    async deleteTodo(id) {
        return await this.todosRef.doc(id).delete()
    }

    async updateTodo(id, boolean) {
        return await this.todosRef.doc(id).update({ completed: boolean })
    }

}

export default new Firebase()