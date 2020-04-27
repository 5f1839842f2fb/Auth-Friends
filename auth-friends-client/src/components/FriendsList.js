import React, { useState, useEffect } from 'react'
import axios from 'axios';

const FriendsList = props => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [newFriend, setNewFriend] = useState({id: '', name: '', age: '', email: ''})

  useEffect(() => {
    setIsLoading(true)
    axios.get("http://localhost:5000/api/friends", {headers: {Authorization: localStorage.getItem('token')}})
    .then(response => {
      setIsLoading(false)
      console.log(response)
      setFriends(response.data)
    })
  },[])

  const handleSubmit = (event => {
    event.preventDefault();
    axios.post("http://localhost:5000/api/friends", {...newFriend, id: Math.random()}, {headers: {Authorization:localStorage.getItem('token')}})
    .then(response => {
      console.log(response)
      setFriends(response.data)
    })
  })

  return (
    <div>
      {!isLoading 
        ? friends.map(element => {
            return (
              <div key={element.id}>
                <h3>{element.name}, {element.age}</h3>
                <h4>{element.email}</h4>
              </div>
            )
          })
        : <h1>loading</h1>
        } 
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" onChange={event => setNewFriend({...newFriend, name: event.target.value})}/>
          <input placeholder="Age" onChange={event => setNewFriend({...newFriend, age: event.target.value})}/>
          <input placeholder="Email" onChange={event => setNewFriend({...newFriend, email: event.target.value})}/>
          <button>Submit</button>
        </form>
    </div>
  )
}

export default FriendsList