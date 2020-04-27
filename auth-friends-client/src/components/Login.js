import React, { useState } from 'react'
import axios from 'axios'

import spinner from '../thonkspin.gif'

const Login = props => {
  const [login, setLogin] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    setIsLoading(true)

    axios.post("http://localhost:5000/api/login", login)
    .then(response => {
      setIsLoading(false)
      console.log(response)
      localStorage.setItem('token', response.data.payload)
      props.setLoggedIn(true)
    })
    .catch(error => {
      setIsLoading(false)
      console.log(error)
    })
  }

  return (
    <div>
      {!isLoading 
      ? <form onSubmit={handleSubmit}>
          <input placeholder="Username" onChange={event => setLogin({...login, username: event.target.value})}/>
          <input placeholder="Password" onChange={event => setLogin({...login, password: event.target.value})}/>
          <button>Submit</button>
        </form>
      : <img src={spinner}/>}
    </div>
  )
}

export default Login