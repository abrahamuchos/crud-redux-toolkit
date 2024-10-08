/**
 * @typedef {Array<user|null>} users
 */
/**
 * @typedef {Object} user
 * @property {number} id
 * @property {string} name
 * @property {string} username
 * @property {string} email
 * @property {{street: string, suite: string, city: string, zipcode: string, geo: {lat:string, lng: string}}} address
 * @property {string} phone
 * @property {string} website
 * @property {{name: string, catchPhrase: string, bs: string}} company
 */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUsers } from "../redux/usersSlice.js";


export default function UserList() {
  /**
   *
   * @type {users}
   */
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        dispatch(fetchUsers(res.data))

      })
      .catch(e => {
        console.error(e);
      })

  }, [dispatch]);

  return (
    <>
      <h2>Lista de usuarios de JSON Placeholder</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            {user.address.geo.lat}
          </li>
        ))}
      </ul>

    </>
  );
}
