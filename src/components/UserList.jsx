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
      <h2 className='text-2xl text-center'>Lista de usuarios de JSON Placeholder</h2>

      <table className='border-collapse border border-slate-400 w-full text-sm'>
        <thead className='bg-slate-50'>
          <tr>
            <th className='border border-slate-300 text-slate-900 text-center uppercase font-semibold p-4'>Full Name</th>
            <th className='border border-slate-300 text-slate-900 text-center uppercase font-semibold p-4'>Latitude</th>
            <th className='border border-slate-300 text-slate-900 text-center uppercase font-semibold p-4'>Longitude</th>
          </tr>
        </thead>
        <tbody>
        {
          users.map(user => (
            <tr key={user.id}>
              <td className='border border-slate-300 p-3 text-slate-500'>{user.name}</td>
              <td className='border border-slate-300 p-3 text-slate-500'>{user.address.geo.lat}</td>
              <td className='border border-slate-300 p-3 text-slate-500'>{user.address.geo.lng}</td>
            </tr>
          ))
        }
        </tbody>
      </table>

    </>
  );
}
