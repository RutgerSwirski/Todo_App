import React, { useState } from 'react'

import Login from '../components/Login'
import Signup from '../components/Signup'

function Landing() {
    const [page, setPage] = useState('login');
    
    return (
        <div className="bg bg-blue bg-flex">
            { page === 'login' ? <Login setPage={setPage} /> : <Signup setPage={setPage} /> }
        </div>
    )
}

export default Landing 

