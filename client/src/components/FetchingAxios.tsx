import axios from "axios"
import { BASE_URL } from "../constant"
import { useEffect, useState } from "react";

interface User {
    id: number,
    name: string
}

const FetchingAxios = () => {

    // to hold our data lets make a useState to hold it.... to make sure we know what type of date this usestate will be in we should make an interface to shape our data
    const [users, setUsers] = useState<User[]> ([])

    // lets  create a function to help us fetch our data
    const fetchData = () => {
        axios
            .get(`${BASE_URL}users`)
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error)
            })
            
    }

    // lets call our function in our useEffect so we can see updates if there are changes
    useEffect(() => {
      
        fetchData();
     
    }, [])
    

  return (
    <>
        <h1 className="text-center m-3">Axios Review</h1>
        <ul className="list-group" data-bs-theme="dark">
            {users.map((user) => <li className="list-group-item" key={user.id}>{user.name}</li>)}
        </ul>
    </>
  )
}

export default FetchingAxios