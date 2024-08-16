import axios from "axios";
import { BASE_URL } from "../constant";
import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
}

const FetchingAxios = () => {
    // to hold our data lets make a useState to hold it.... to make sure we know what type of date this usestate will be in we should make an interface to shape our data
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");

    // lets  create a function to help us fetch our data
    const fetchData = () => {
        axios
            .get(`${BASE_URL}users`)
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                // to make sure we have the error saved after the fetch function is executed
                setError(error.message);
            });
    };

    // lets make a delete function to delete a user from our list
    // we are going to do the process of an Optimistic Update instead of a Pessimistic Update.... Optimisitic Update is delete user in ui  then update the api
    const deleteUser = (user: User) => {
        const originalUsers = [...users];

        // lets update our UI first and pass in the user objects except the one we want to delete with the given id
        // remember that this will update the UI and not the api yet
        // filter works where you pass in the data you want removed and you set it !== to the data we passed into the function and its id
        setUsers(users.filter((u) => u.id !== user.id));
        axios.delete(BASE_URL + "users/" + user.id).catch((error) => {
            console.log(error);
            setError(error.message);
            setUsers(originalUsers);
        });
    };

    const addUser = () => {
        const originalUsers = [...users];

        const newUser = { id: 0, name: "Tony" };
        // this will set the new user to the end of the array
        setUsers([...users, newUser]);
        // or you could do this  which will set the new user to the start of the array
        // setUsers([newUser, ...users]);

        axios
            .post(BASE_URL + "users", newUser)
            .then((response) => setUsers([response.data, ...users]))
            .catch((error) => {
                setError(error.message);
                setUsers(originalUsers);
            });
    };

    // update helper function
    const updateUser = (user: User) => {
        const originalUsers = [...users];
        const updatedUser = {...user, name: user.name + ' is awesome'};
        setUsers(users.map( u => u.id === user.id ? updatedUser : u))
        axios
            .put(BASE_URL + 'users/' + user.id, updatedUser)
            .catch(error => {
                setError(error.message);
                setUsers(originalUsers);
            })
    }


    // lets call our function in our useEffect so we can see updates if there are changes
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1 className="text-center m-3">Axios Review</h1>
            {error && <p className="text-danger text-center">{error}</p>}
            <button
                className="btn btn-outline-primary mb-3"
                onClick={() => addUser()}
            >
                Add User
            </button>
            <ul className="list-group" data-bs-theme="dark">
                {users.map((user) => (
                    <li
                        className="list-group-item d-flex justify-content-between"
                        key={user.id}
                    >
                        {user.name}{" "}
                        <div>

                            <button className="btn btn-outline-warning mx-3" onClick={() => updateUser(user)}>Update</button>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => deleteUser(user)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default FetchingAxios;
